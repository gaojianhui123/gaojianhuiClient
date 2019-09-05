import {LienPersonnelService} from '../../../services/LienPersonnelService';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import { Component, OnInit, ViewChild } from '@angular/core';
import {LienPersonnel} from '../../../model/LienPersonnel';
import {QueryParam} from '../../../model/page/QueryParam';
import { SanyiSort } from '../../../model/page/SanyiSort';
import { SanyiPage } from '../../../model/page/SanyiPage';
import {STColumn, STComponent, STData} from '@delon/abc';
import { _HttpClient, ModalHelper } from '@delon/theme';
import {environment} from '@env/environment.prod';
import { User } from '../../../model/User';
import {Router} from '@angular/router';
import { SFSchema } from '@delon/form';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-bnaaninfo-list',
  templateUrl: './list.component.html',
})
export class BananinfoListComponent implements OnInit {
  currentUser: User;
  url = environment.SERVER_URL + `lienPersonnel/findLienPersonnels`;
  query: QueryParam<LienPersonnel> = new QueryParam<LienPersonnel>();
  content: SanyiPage<LienPersonnel> = new SanyiPage<LienPersonnel>();
  liuzhi: LienPersonnel = new LienPersonnel();
  searchSchema: SFSchema = {
    properties: {
      daiHao: {
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
      }
    }
  };
  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    {title: '编号', type : 'no'},
    {title: '代号', index: 'daiHao', sort: true},
    {title: '姓名', index: 'lzName'},
    {title: '性别',  index: 'lzSexName'},
    {title: '年龄', index: 'lzAge'},
    {title: '职级', index: 'lzZhiJiName'},
    {title: '进驻日期', type : 'date', index: 'enterTime',  dateFormat: 'YYYY-MM-DD'},
    {title: '撤离日期', type : 'date', index: 'outTime', dateFormat: 'YYYY-MM-DD'},
    { title: '操作区',
      buttons: [{ text: '查看详情', click: (item: any) => this.goToDetail(item.id) }
      ]
    }
  ];
  constructor(private http: _HttpClient, private modal: ModalHelper, private msgSrv: NzMessageService,
              private modalService: NzModalService, private lienPersonnelService: LienPersonnelService, private router: Router) {
    this.currentUser = this.lienPersonnelService.getCurrentUser();
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
    data.map( d => {
      switch (d.lzZhiJi) {
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
    sanyiSort.sortName = 'enterTime';
    this.query.sort = sanyiSort;
    this.query.query.cbDepartment = this.currentUser.bumenId;
  }
  goToDetail(id: any) {
    this.router.navigate(['/lienpersonnelDetail', {id: id, title: '办案管理'}]);
  }

  load(query) {
    // 修改排序方式
    const sanyiSort = new SanyiSort();
    sanyiSort.directionMethod = 'DESC';
    sanyiSort.sortName = 'enterTime';
    this.query.sort = sanyiSort;
    this.query.query.cbDepartment = this.currentUser.bumenId;
    this.st.load(query);
  }
  reset($event) {
    this.query.query = new LienPersonnel();
    // 修改排序方式
    const sanyiSort = new SanyiSort();
    sanyiSort.directionMethod = 'DESC';
    sanyiSort.sortName = 'enterTime';
    this.query.sort = sanyiSort;
    this.query.query.cbDepartment = this.currentUser.bumenId;
    this.st.load($event);
  }
}

