import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {HealthService} from '../../../services/HealthService';
import { Component, OnInit, ViewChild } from '@angular/core';
import {QueryParam} from '../../../model/page/QueryParam';
import { SanyiSort } from '../../../model/page/SanyiSort';
import {STColumn, STComponent, STData} from '@delon/abc';
import { _HttpClient, ModalHelper } from '@delon/theme';
import {environment} from '@env/environment.prod';
import {Health} from '../../../model/Health';
import { User } from '../../../model/User';
import {Router} from '@angular/router';
import { SFSchema } from '@delon/form';
import { map } from 'rxjs/operators';
import { LienPersonnelService } from '../../../services/LienPersonnelService';
import { LienPersonnel } from '../../../model/LienPersonnel';

@Component({
  selector: 'app-jinzhutijian-list',
  templateUrl: './list.component.html',
})
export class JinzhutijianListComponent implements OnInit {
  url = environment.SERVER_URL + `health/findHealth`;
  query: QueryParam<Health> = new QueryParam<Health>();
  currentUser: User;
  searchSchema: SFSchema = {
    properties: {
      lpId: {
        type: 'string',
        title: '代号',
        ui: {
          width: 300,
          widget: 'select',
          showSearch: true,
          serverSearch: true,
          allowClear: true,
          asyncData: () => {
            const querySelect = new QueryParam<LienPersonnel>();
            querySelect.paging = false;
            if (this.currentUser.yihurenyuan) {
              querySelect.query.yihurenyuan = this.currentUser.yihurenyuan;
            }
            //querySelect.query.outStatus = '0'; // 添加没撤离条件
            return  this.lienPersonnelService.findLienPersonnels(querySelect).pipe(map(n => {
              n.content.map(a => {
                a.label = a.daiHao;
                a.value = a.id;
              });
              return n.content;
            }));
          },
          onSearch: (text) => {
            const querySelect1 = new QueryParam<LienPersonnel>();
            querySelect1.paging = false;
            querySelect1.query.daiHao = text;
            return  this.lienPersonnelService.findLienPersonnels(querySelect1).pipe(map(n => {
              n.content.map(a => {
                a.label = a.daiHao;
                a.value = a.id;
              });
              return n.content;
            })).toPromise();
          },
          dropdownMatchSelectWidth: false,
        }
      }
    }
  };
  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    {title: '编号', type : 'no'},
    {title: '代号', index: 'daihao', sort: true},
    {title: '房间号', index: 'roomNumName',sort: true},
    {title: '床位号', index: 'bedName'},
    {title: '性别',  index: 'lzSexName'},
    {title: '体检日期', type : 'date', index: 'tiJianTime', dateFormat: 'YYYY-MM-DD'},
    {title: '医生', index: 'doctor'},
    {title: '进驻日期', type : 'date', index: 'jinzhuriqi', dateFormat: 'YYYY-MM-DD'},
    {title: '操作区',
      buttons: [
        {text: '编辑', click: (item: any) => this.goToEdit(item.id)},
        {text: '删除', click: (item: any) => this.goToDeleted(item)},
        {text: '导出', click: (item: any) => this.exportJinZhu(item)}]
    }
  ];
  constructor(private http: _HttpClient, private modal: ModalHelper, private msgSrv: NzMessageService,
              private modalService: NzModalService, private healthService: HealthService,
              private router: Router, private lienPersonnelService: LienPersonnelService) {
              this.currentUser = this.healthService.getCurrentUser();
  }
  // 通过response返回数据，预先处理业务需求
  processData = (data: STData[]) => {
    data.map( d => {
      switch (d.lzSex) {
        case '1':
          d.lzSexName = '男';
          break;
        case '2':
          d.lzSexName = '女';
          break;
        default:
          d.lzSexName = '';
      }
    });
    return data;
  }
  ngOnInit() {
    // 修改排序方式
    const sanyiSort = new SanyiSort();
    sanyiSort.directionMethod = 'DESC';
    sanyiSort.sortName = 'tiJianTime';
    this.query.sort = sanyiSort;
    this.query.query.status = '1'; // 状态为1 说明是进驻体检
    if (this.currentUser.yihurenyuan) {
      this.query.query.yihurenyuan = this.currentUser.yihurenyuan;
    }
  }
  goToDetail(id: any) {
    this.router.navigate(['/jinzhutijianSave', {id: id}]);
  }
  add() {
    this.router.navigate(['/jinzhutijian/jinzhutijianSave']);
  }

  goToEdit(id: any) {
    this.router.navigate(['/jinzhutijian/jinzhutijianSave', {id: id}]);
  }
  goToDeleted (item: any) {
    this.modalService.confirm({
      nzTitle: '确定要删除代号 ' + item.daihao + ' 进驻体检信息？',
      nzContent: '<b style="color: #ff0000;">删除后将不可恢复！</b>',
      nzOkText: '确定',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.healthService.deleteHealth(item).subscribe((res) => {
          this.msgSrv.success('删除成功');
          this.st.reload();
        });
      },
      nzCancelText: '取消',
      nzOnCancel: () => console.log('Cancel')
    });
  }
  exportJinZhu(item: any): void {
    this.healthService.exportJinZhu(item.id, item.lpId);
  }
  // 重置按钮
  reset($event) {
    this.query.query = new Health();
    // 修改排序方式
    const sanyiSort = new SanyiSort();
    sanyiSort.directionMethod = 'DESC';
    sanyiSort.sortName = 'tiJianTime';
    this.query.sort = sanyiSort;
    this.query.query.status = '1';
    this.query.query.yihurenyuan = this.currentUser.yihurenyuan;
    this.st.load($event);
  }
}

