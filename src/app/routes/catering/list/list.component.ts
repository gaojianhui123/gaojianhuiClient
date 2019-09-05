import {CateringService} from '../../../services/CateringService';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import { Component, OnInit, ViewChild } from '@angular/core';
import {QueryParam} from '../../../model/page/QueryParam';
import { SanyiSort } from '../../../model/page/SanyiSort';
import {STColumn, STComponent, STData} from '@delon/abc';
import { _HttpClient, ModalHelper } from '@delon/theme';
import {Catering} from '../../../model/Catering';
import {environment} from '@env/environment';
import {Router} from '@angular/router';
import { SFSchema } from '@delon/form';

@Component({
  selector: 'app-catering-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class CateringListComponent implements OnInit {
  url = environment.SERVER_URL + `catering/findCatering`;
  queryParam: QueryParam<Catering> = new QueryParam<Catering>();
  searchSchema: SFSchema = {
    properties: {
      cateringMenu: {
        type: 'string',
        title: '菜单类型',
        enum: [
          { label: '全部', value: '' },
          { label: '常规菜单', value: '0' },
          { label: '特殊菜单', value: '1' },
          ],
        default: '',
        ui: {
          widget: 'select',
          dropdownMatchSelectWidth: 'true',
          width: 300,
        },
      },
      riqi: {
        type: 'string',
        title: '录入日期',
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
    { title: ' 菜单类型',  index: 'cateringMenuName', sort: {key: 'cateringMenu'} },
    { title: ' 录入日期',  index: 'riqi' },
    { title: '做餐人', index: 'cookingMan' },
    { title: ' 打包人',  index: 'packingMan' },
    { title: '送餐人', index: 'deliveryMan' },
    {
      title: '操作区',
      buttons: [
        { text: '编辑', type: 'static', click: (item: any) => ( this.Edit(item) )},
        { text: '删除', click: (item: any) => ( this.Deleted(item) )},
      ]
    }
  ];
  processData = (data: STData[]) => {
    data.map( d => {
      switch (d.cateringMenu) {
        case '0' :
          d.cateringMenuName = '常规菜单';
          break;
        case '1':
          d.cateringMenuName = '特殊菜单';
          break;
      }
    });
    return data;
  }

  constructor(private http: _HttpClient, private modal: ModalHelper, private cateringService: CateringService,
              private message: NzMessageService, private messageService: NzMessageService, private router: Router,
              private modalService: NzModalService) { }

  ngOnInit() {
    // 修改排序方式
    const sanyiSort = new SanyiSort();
    sanyiSort.directionMethod = 'DESC';
    sanyiSort.sortName = 'riqi';
    this.queryParam.sort = sanyiSort;
  }

  add() {
    this.router.navigate(['/cateringSave']);
  }
  Edit( item: any) {
    console.log(item);
    this.router.navigate(['/cateringSave', { id: item.id }]);
  }

  Deleted(item: any) {
    this.modalService.confirm({
      nzTitle     : '确定要删除该记录吗？',
      nzContent   : '<b style="color: #ff0000;">删除后将不可恢复！</b>',
      nzOkText    : '确定',
      nzOkType    : 'danger',
      nzOnOk      : () => {
        this.cateringService.deleteCatering(item).subscribe( res => {
          this.messageService.success('删除成功');
          this.st.reload();
        });
      },
      nzCancelText: '取消',
      nzOnCancel  : () => console.log('Cancel')
    });

  }
  reset($event) {
    this.queryParam.query = new Catering();
    // 修改排序方式
    const sanyiSort = new SanyiSort();
    sanyiSort.directionMethod = 'DESC';
    sanyiSort.sortName = 'riqi';
    this.queryParam.sort = sanyiSort;
    this.st.load($event);
  }
}
