import {LienPersonnelService} from '../../../services/LienPersonnelService';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import { Component, OnInit, ViewChild } from '@angular/core';
import {NurseService} from '../../../services/NurseService';
import {LienPersonnel} from '../../../model/LienPersonnel';
import {QueryParam} from '../../../model/page/QueryParam';
import {STColumn, STComponent, STData} from '@delon/abc';
import { _HttpClient, ModalHelper } from '@delon/theme';
import {SFComponent, SFSchema} from '@delon/form';
import {environment} from '@env/environment';
import { User } from '../../../model/User';
import {Nurse} from '../../../model/Nurse';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import { SanyiSort } from '../../../model/page/SanyiSort';

@Component({
  selector: 'app-nurse-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class NurseListComponent implements OnInit {
  currentUser: User;
  url = environment.SERVER_URL + `nurse/findNurse`;
  queryParam: QueryParam<Nurse> = new QueryParam<Nurse>();
  query: QueryParam<LienPersonnel> = new QueryParam<LienPersonnel>();
  searchSchema: SFSchema = {
    properties: {
      lienPersonnelid: {
        type: 'string',
        title: '代号',
        ui: {
          width: 300,
          widget: 'select',
          showSearch: true,
          serverSearch: true,
          allowClear: true,
          asyncData: () => {
            return  this.lienPersonnelService.findLienPersonnels(this.query).pipe(map(n => {
              n.content.map(a => {
                a.label = a.daiHao;
                a.value = a.id;
              });
              return n.content.filter( (lp) => !lp.outTime);
            }));
          },
          onSearch: (text) => {
            this.query.query.daiHao = text;
            return  this.lienPersonnelService.findLienPersonnels(this.query).pipe(map(n => {
              n.content.map(a => {
                a.label = a.daiHao;
                a.value = a.id;
              });
              return n.content;
                 })).toPromise();
          },
          dropdownMatchSelectWidth: false,
        }
      },
      enterTime: {
        type: 'string',
        title: '进驻时间',
        format: 'date',
        ui: {
          width: 300,
          widget: 'date',
        }
      },
      submitTime: {
        type: 'string',
        title: '上报时间',
        format: 'date',
        ui: {
          width: 300,
          widget: 'date',
        }
      }
    }
  };
  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    { title: '编号', type: 'no' },
    { title: '代号', index: 'daiHao', sort: true },
    { title: '房间号', index: 'roomNumName' },
    { title: '性别', index: 'lzSexName'},
    { title: '进驻时间', type : 'date', index: 'enterTime', dateFormat: 'YYYY-MM-DD'},
    { title: '上报人', index: 'submitId' },
    { title: '上报时间', index: 'submitTime', dateFormat: 'YYYY-MM-DD' , type: 'date'},
    { title: '操作区',
      buttons: [{ text: '编辑', type: 'static', click: (item: any) => ( this.Edit(item) )},
        { text: '删除', click: (item: any) => ( this.Deleted(item) ) }]
    }
  ];
  processData = (data: STData[]) => {
    data.map(d => {
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
  constructor(private http: _HttpClient,
              private modal: ModalHelper,
              private nurseService: NurseService,
              private message: NzMessageService,
              private messageService: NzMessageService,
              private modalService: NzModalService,
              private router: Router,
              private lienPersonnelService: LienPersonnelService) {
    this.currentUser = this.nurseService.getCurrentUser();
  }

  ngOnInit() {
    if (this.currentUser.kanhuId) {
      this.queryParam.query.nursePower = this.currentUser.kanhuId;
      this.query.query.kanhuLiLiang = this.currentUser.kanhuId;
    }
    this.query.paging = false;
    // 修改排序方式
    const sanyiSort = new SanyiSort();
    sanyiSort.directionMethod = 'desc';
    sanyiSort.sortName = 'submitTime';
    this.queryParam.sort = sanyiSort;
  }

  add() {
    this.router.navigate(['/nurse/nurseSave']);
  }

  Edit( item: any) {
    this.router.navigate(['/nurse/nurseSave', { id: item.id }]);
  }

  Deleted(item: any) {
    if (this.currentUser.title !== '基地管理员') {
      this.messageService.error('您无法进行删除操作，如有疑问联系管理员！');
    } else {
      this.modalService.confirm({
        nzTitle     : '确定要删除该记录吗？',
        nzContent   : '<b style="color: #ff0000;">删除后将不可恢复！</b>',
        nzOkText    : '确定',
        nzOkType    : 'danger',
        nzOnOk      : () => {
          this.nurseService.deleteNurse(item).subscribe( res => {
            this.messageService.success('删除成功');
            this.st.reload();
          });
        },
        nzCancelText: '取消',
        nzOnCancel  : () => console.log('Cancel')
      });
    }
  }
  load(queryParam) {
    // this.queryParam.query = new Nurse();
    this.queryParam.query.nursePower = this.currentUser.kanhuId;
    this.st.load(queryParam);
  }
  reset($event) {

    // 修改排序方式
    const sanyiSort = new SanyiSort();
    sanyiSort.directionMethod = 'desc';
    sanyiSort.sortName = 'submitTime';
    this.queryParam.sort = sanyiSort;
    this.queryParam.query = new Nurse();
    if (this.currentUser.kanhuId) {
      this.queryParam.query.nursePower = this.currentUser.kanhuId;
    }
    this.st.load($event);
  }
}
