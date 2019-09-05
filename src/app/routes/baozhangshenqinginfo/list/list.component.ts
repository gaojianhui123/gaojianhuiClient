import {BaozhangshenqingService} from '../../../services/BaozhangshenqingService';
import {LienPersonnelService} from '../../../services/LienPersonnelService';
import { Baozhangshenqing } from '../../../model/Baozhangshenqing';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import { Component, OnInit, ViewChild } from '@angular/core';
import {QueryParam} from '../../../model/page/QueryParam';
import { SanyiSort } from '../../../model/page/SanyiSort';
import {STColumn, STComponent, STData} from '@delon/abc';
import { _HttpClient, ModalHelper } from '@delon/theme';
import {environment} from '@env/environment.prod';
import { User } from '../../../model/User';
import {Router} from '@angular/router';
import { SFSchema } from '@delon/form';
import { LienPersonnel } from '../../../model/LienPersonnel';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-baozhangshenqinginfo-list',
  templateUrl: './list.component.html',
})
export class BaozhangshenqingListComponent implements OnInit {
  currentUser: User;
  url = environment.SERVER_URL + `baozhangshenqing/findBaozhangshenqing`;
  query: QueryParam<Baozhangshenqing> = new QueryParam<Baozhangshenqing>();
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
    {title: '姓名', index: 'lpName'},
    {title: '性别',  index: 'lzSexName'},
    {title: '年龄', index: 'lzAge'},
    {title: '职级', index: 'lzZhiJiName'},
    {title: '进驻日期', type : 'date', index: 'lpTime',  dateFormat: 'YYYY-MM-DD'},
    {title: '保障申请时间', type : 'date', index: 'tianBaoTime', dateFormat: 'YYYY-MM-DD'},
    { title: '操作区',
      buttons: [{ text: '编辑', click: (item: any) => this.goToEdit(item.id) },
                { text: '删除', click: (item: any) => this.goToDeleted(item) }
      ]
    }
  ];
  constructor(private http: _HttpClient, private modal: ModalHelper, private msgSrv: NzMessageService,
              private modalService: NzModalService, private lienPersonnelService: LienPersonnelService,
              private router: Router, private baozhangshenqingService: BaozhangshenqingService) {
              this.currentUser = this.baozhangshenqingService.getCurrentUser();
  }
  // 通过response返回数据，预先处理业务需求
  processData = (data: STData[]) => {
    // console.log(data);
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
    data.map( d => {
      switch (d.lpZhiji) {
        case '1':
          d.lzZhiJiName = '局级以上';
          break;
        case '2':
          d.lzZhiJiName = '局级';
          break;
        case '3':
          d.lzZhiJiName = '副局级';
          break;
        case '4':
          d.lzZhiJiName = '处级';
          break;
        case '5':
          d.lzZhiJiName = '副处级';
          break;
        case '6':
          d.lzZhiJiName = '科级';
          break;
        case '7':
          d.lzZhiJiName = '副科级';
          break;
        case '8':
          d.lzZhiJiName = '科级以下';
          break;
        default:
          d.lzZhiJiName = '';
      }
    });
    return data;
  }
  ngOnInit() {
    // 修改排序方式
    const sanyiSort = new SanyiSort();
    sanyiSort.directionMethod = 'DESC';
    sanyiSort.sortName = 'daihao';
    this.query.sort = sanyiSort;
    this.query.query.bumen = this.currentUser.bumenId;
  }
  add() {
    this.router.navigate(['/baozhangshenqinginfo/baozhangshenqinginfosave']);
  }

  goToEdit(id: any) {
    this.router.navigate(['/baozhangshenqinginfo/baozhangshenqinginfosave', {id: id}]);
  }
  goToDeleted (item: any) {
    this.modalService.confirm({
      nzTitle: '确定要删除代号 ' + item.daihao + ' 的保障申请？',
      nzContent: '<b style="color: #ff0000;">删除后将不可恢复！</b>',
      nzOkText: '确定',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.baozhangshenqingService.deleteBaozhangshenqing(item).subscribe((res) => {
          this.msgSrv.success('删除成功');
          this.st.reload();
        });
      },
      nzCancelText: '取消',
      nzOnCancel: () => console.log('Cancel')
    });
  }
  load(query) {
    this.query.query.bumen = this.currentUser.bumenId;
    this.st.load(query);
  }
  reset($event) {
    this.query.query = new Baozhangshenqing();
    // 修改排序方式
    const sanyiSort = new SanyiSort();
    sanyiSort.directionMethod = 'DESC';
    sanyiSort.sortName = 'tianBaoTime';
    this.query.sort = sanyiSort;
    this.query.query.bumen = this.currentUser.bumenId;
    this.st.load($event);
  }
}

