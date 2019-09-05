import { LienPersonnelEditComponent } from './edit/lienPersonnel-edit.component';
import { TanhuashenqingService } from '../../../services/TanhuashenqingService';
import { DictionaryService } from '../../../services/DictionaryService';
import {LienPersonnelService} from '../../../services/LienPersonnelService';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import { Component, OnInit, ViewChild } from '@angular/core';
import {LienPersonnel} from '../../../model/LienPersonnel';
import {QueryParam} from '../../../model/page/QueryParam';
import { SanyiSort } from '../../../model/page/SanyiSort';
import {STColumn, STComponent, STData} from '@delon/abc';
import { _HttpClient, ModalHelper } from '@delon/theme';
import {environment} from '@env/environment.prod';
import { SFSchema } from '@delon/form';
import {Router} from '@angular/router';
import { map } from 'rxjs/operators';
import { Dictionary } from '../../../model/Dictionary';

@Component({
  selector: 'app-lienpersonnel-list',
  templateUrl: './list.component.html',
})
export class LienpersonnelListComponent implements OnInit {

  personTotal:string;
  menCount:string;
  womenCount:string;
  wujingTypeCount:string;
  menGongAnTypeCount:string;
  womenGongAnTypeCount:string;
  url = environment.SERVER_URL + `lienPersonnel/findLienPersonnelsByBatis`;
  query: QueryParam<LienPersonnel> = new QueryParam<LienPersonnel>();
  lienPersonnel: LienPersonnel = new LienPersonnel();
  searchSchema: SFSchema = {
    properties: {
      daiHao: {
        type: 'string',
        title: '代号',
        ui: {
          width: 200,
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
                a.value = a.daiHao;
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
                a.value = a.daiHao;
              });
              return n.content;
            })).toPromise();
          },
          dropdownMatchSelectWidth: false,
        }
      },
      cbDepartment: {
        type: 'string',
        title: '部门',
        ui: {
          width: 220,
          widget: 'select',
          showSearch: true,
          serverSearch: true,
          allowClear: true,
          asyncData: () => {
            const querySelect = new QueryParam<Dictionary>();
            querySelect.paging = false;
            querySelect.query.dsId = '4028928b6781689b016782290b030001';
            return  this.dictionaryService.findDictionary(querySelect).pipe(map(n => {
              n.content.map(a => {
                a.label = a.dicName;
                a.value = a.id;
              });
              return n.content;
            }));
          },
          onSearch: (text) => {
            const querySelect1 = new QueryParam<Dictionary>();
            querySelect1.paging = false;
            querySelect1.query.dicName = text;
            querySelect1.query.dsId = '4028928b6781689b016782290b030001';
            return  this.dictionaryService.findDictionary(querySelect1).pipe(map(n => {
              n.content.map(a => {
                a.label = a.dicName;
                a.value = a.id;
              });
              return n.content;
            })).toPromise();
          },
          dropdownMatchSelectWidth: false,
        }
      },
      start: {
        type: 'string',
        format: 'date',
        title: '进驻时间',
        ui: {
          width: 300,
          widget: 'date',
          end: 'end' }
      },
      end: {
        type: 'string',
        format: 'date',
        ui: {
          width: 300,
          widget: 'date',
          end: 'end' }
      },
    }
  };
  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    {title: '编号', type : 'no'},
    {title: '代号', index: 'daiHao', sort: true},
    {title: '房间号', index: 'roomName', sort: true},
    {title: '床位号', index: 'bedName'},
    {title: '姓名', index: 'lzName'},
    {title: '看护力量', index: 'kanhuLiLiangString', sort: true},
    {title: '承办部门', index: 'cbDepartmentString', sort: true},
    {title: '进驻日期', type : 'date', index: 'enterTime', dateFormat: 'YYYY-MM-DD', sort: true},
    {title: '撤离日期', type : 'date', index: 'outTime', dateFormat: 'YYYY-MM-DD', sort: true},
    {
      title: '操作区',
      buttons: [
        {
          text: '查看详情', click: (item: any) =>
            this.goToDetail(item.id)
        },
        {
          text: '编辑', click: (item: any) =>
            this.goToEdit(item.id)
        },
        {
          text: '删除', click: (item: any) =>
            this.goToDeleted(item)
        }
      ]
    }
  ];
  constructor(private http: _HttpClient, private modal: ModalHelper, private msgSrv: NzMessageService,
              private tanhuashenqingService: TanhuashenqingService, private router: Router,
              private modalService: NzModalService, private lienPersonnelService: LienPersonnelService,private dictionaryService :DictionaryService) {}
  // 通过response返回数据，预先处理业务需求
  processData = (data: STData[]) => {
    return data;
  }
  ngOnInit() {
    // 修改排序方式
    const sanyiSort = new SanyiSort();
    sanyiSort.directionMethod = 'desc';
    sanyiSort.sortName = 'enterTime';
    this.query.sort = sanyiSort;

    this.getCount();
  }

  getCount(){
    this.lienPersonnelService.getCountLienPerson().subscribe((res) => {
      this.personTotal=res.content[0].count;
      this.menCount=res.content[1].count;
      this.womenCount=res.content[2].count;
      this.wujingTypeCount=res.content[3].count;
      this.womenGongAnTypeCount=res.content[4].count;
      this.menGongAnTypeCount=res.content[5].count;

    });
  }
  // 查看详情
  goToDetail(id: any) {
    this.router.navigate(['/lienpersonnelDetail', {id: id}]);
  }
  add() {
    // this.router.navigate(['/lienpersonnel/lienpersonnelEdit']);
    this.modal.createStatic(LienPersonnelEditComponent, { record: { id: null } })
      .subscribe(() => this.st.reload());
  }
  // 重置
  reset($event) {
    // 修改排序方式
    const sanyiSort = new SanyiSort();
    sanyiSort.directionMethod = 'desc';
    sanyiSort.sortName = 'enterTime';
    this.query.sort = sanyiSort;
    this.query.query = new LienPersonnel();
    this.st.load($event);
  }
  // 编辑
  goToEdit(id: any) {
    // this.router.navigate(['/lienpersonnel/lienpersonnelEdit', {id: id}]);
    this.modal.createStatic(LienPersonnelEditComponent, { record: { id: id } })
      .subscribe(() => this.st.reload());
  }
  // 去除跟留置人有关的所有谈话人员的谈话权限（门禁权限）
  deleteQuanXian (item: any) {
    // this.tanhuashenqingService.unregisteruserDoorArea(item).subscribe((result) => {
    //   this.tanhuashenqingOld = result;
    // });
    this.modalService.confirm({
      nzTitle: '确定要消除 ' + item.lzName + ' 谈话人员门禁权限吗？',
      nzContent: '<b style="color: #ff0000;">删除后将不可恢复！</b>',
      nzOkText: '确定',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.lienPersonnelService.unregisteruserDoorArea(item).subscribe((res) => {
          this.msgSrv.success('删除成功');
          this.st.reload();
        });
      },
      nzCancelText: '取消',
      nzOnCancel: () => console.log('Cancel')
    });
  }
  goToDeleted (item: any) {
    this.modalService.confirm({
      nzTitle: '确定要删除留置人 ' + item.lzName + ' 吗？',
      nzContent: '<b style="color: #ff0000;">删除后将不可恢复！</b>',
      nzOkText: '确定',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.lienPersonnelService.deleteLienPersonnel(item).subscribe((res) => {
          this.msgSrv.success('删除成功');
          this.st.reload();
        });
      },
      nzCancelText: '取消',
      nzOnCancel: () => console.log('Cancel')
    });
  }
  submit(value: any) {
    this.msgSrv .success(JSON.stringify(value));
  }

  change(value: any) {
    console.log('change', value);
  }
  // 更改排序方式
  changeSort(event: any) {
    if (this.query.sort.directionMethod === 'asc') {
      this.query.sort.directionMethod = 'desc';
    } else {
      this.query.sort.directionMethod = 'asc';
    }
    this.query.sort.sortName = 'daiHao';
  }
}
