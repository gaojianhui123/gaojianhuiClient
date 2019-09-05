import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {HealthService} from '../../../services/HealthService';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SanyiSort } from '../../../model/page/SanyiSort';
import {QueryParam} from '../../../model/page/QueryParam';
import {STColumn, STComponent, STData} from '@delon/abc';
import { _HttpClient, ModalHelper } from '@delon/theme';
import {environment} from '@env/environment.prod';
import {Health} from '../../../model/Health';
import { User } from '../../../model/User';
import {Router} from '@angular/router';
import { SFSchema } from '@delon/form';

@Component({
  selector: 'app-cahngguitijian-list',
  templateUrl: './list.component.html',
})
export class ChangguitijianListComponent implements OnInit {
  url = environment.SERVER_URL + `health/findHealth`;
  query: QueryParam<Health> = new QueryParam<Health>();
  currentUser: User;
  searchSchema: SFSchema = {
    properties: {
      daihao: {
        type: 'string',
        title: '代号'
      }
    }
  };
  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    {title: '序号', type : 'no'},
    {title: '代号', index: 'daihao', sort: true},
    {title: '房间号', index: 'roomNum'},
    {title: '性别',  index: 'lzSexName'},
    {title: '体检日期', type : 'date', index: 'tiJianTime', dateFormat: 'YYYY-MM-DD'},
    {
      title: '操作区',
      buttons: [
        {
          text: '编辑', click: (item: any) =>
            this.goToEdit(item.id)
        },
        {
          text: '删除', click: (item: any) =>
            this.goToDeleted(item)
        },
        {
          text: '生命体征', click: (item: any) =>
            this.exportTiZheng(item)
        },
        // {
        //   text: '长期用药', click: (item: any) =>
        //     this.exportYongYao(item)
        // },
        // {
        //   text: '临时用药', click: (item: any) =>
        //     this.exportLinShiYongYao(item)
        // },
        {
          text: '特殊情况', click: (item: any) =>
            this.exportSpecial(item)
        }
      ]
    }
  ];
  constructor(private http: _HttpClient, private modal: ModalHelper, private msgSrv: NzMessageService,
              private modalService: NzModalService, private healthService: HealthService,
              private router: Router) {
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
    // 初始化 只查看常规体检
    this.query.query.status = '2';
    // 修改排序方式
    const sanyiSort = new SanyiSort();
    sanyiSort.directionMethod = 'DESC';
    sanyiSort.sortName = 'tiJianTime';
    this.query.sort = sanyiSort;
    this.query.query.yihurenyuan = this.currentUser.yihurenyuan;
  }
  add() {
    this.router.navigate(['/changguitijian/changguitijianSave']);
  }

  goToEdit(id: any) {
    this.router.navigate(['/changguitijian/changguitijianSave', {id: id}]);
  }
  goToDeleted (item: any) {
    this.modalService.confirm({
      nzTitle: '确定要删除代号 ' + item.daihao + ' 常规体检信息？',
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
  // 导出常规体检原版文档
  // exportChangGui(item: any) {
  //   this.healthService.exportChangGui(item.id, item.lpId);
  // }

  // 导出常规体检的生命体征
  exportTiZheng(item: any) {
    this.healthService.exportTiZheng(item.lpId);
  }
  // 导出常规体检的特殊情况
  exportSpecial(item: any) {
    this.healthService.exportSpecial(item.lpId);
  }
  // // 导出常规体检的长期用药记录
  // exportYongYao(item: any) {
  //   this.healthService.exportYongYao(item.id, item.lpId, item.healthId);
  // }
  // // 导出常规体检的临时用药记录
  // exportLinShiYongYao(item: any) {
  //   this.healthService.exportLinShiYongYao(item.id, item.lpId, item.healthId);
  // }
  reset($event) {
    this.query.query = new Health();
    // 重置之后只查看常规体检数据（status为2）
    this.query.query.status = '2';
    // 修改排序方式
    const sanyiSort = new SanyiSort();
    sanyiSort.directionMethod = 'DESC';
    sanyiSort.sortName = 'tiJianTime';
    this.query.sort = sanyiSort;
    this.query.query.yihurenyuan = this.currentUser.yihurenyuan;
    this.st.load($event);
  }
}

