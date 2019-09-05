import {LienPersonnelBzDto} from '../../../model/LienPersonnelBzDto';
import { Component, OnInit, ViewChild } from '@angular/core';
import {QueryParam} from '../../../model/page/QueryParam';
import { SanyiSort } from '../../../model/page/SanyiSort';
import {STColumn, STComponent, STData} from '@delon/abc';
import { _HttpClient, ModalHelper } from '@delon/theme';
import {environment} from '@env/environment.prod';
import { SFSchema } from '@delon/form';
import {Router} from '@angular/router';
import { LienPersonnel } from '../../../model/LienPersonnel';
import { map } from 'rxjs/operators';
import { LienPersonnelService } from '../../../services/LienPersonnelService';

@Component({
  selector: 'app-bzsp-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class BzspListComponent implements OnInit {
  url = environment.SERVER_URL + `lienPersonnel/selectLienPersonnelJoinBz`;
  query: QueryParam<LienPersonnelBzDto> = new QueryParam<LienPersonnelBzDto>();
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
      },
      enterTime: {
        type: 'string',
        title: '进驻日期',
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
    {title: '编号', type : 'no'},
    {title: '代号', index: 'daiHao', sort: true},
    {title: '姓名', index: 'lzName'},
    {title: '性别',  index: 'lzSexName'},
    {title: '年龄', index: 'lzAge'},
    {title: '职级', index: 'lzZhiJiName'},
    {title: '进驻日期', type : 'date', index: 'enterTime', dateFormat: 'YYYY-MM-DD'},
    {title: '审批状态', index: 'applyStatusName'},
    { title: '操作区',
      buttons: [{ text: '审批', click: (item: any) => this.shenPi(item) }
      ]
    }
  ];

  constructor(private http: _HttpClient, private modal: ModalHelper,
              private router: Router, private lienPersonnelService: LienPersonnelService
  ) { }
  // 通过response返回数据，预先处理业务需求
  processData = (data: STData[]) => {
    console.log(data);
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
    data.map( d => {
      switch (d.applyStatus) {
        case '1':
          d.applyStatusName = '待审批';
          break;
        case '2':
          d.applyStatusName = '审批同意';
          break;
        case '3':
          d.applyStatusName = '审批拒绝';
          break;
        default:
          d.applyStatusName = '未知';
      }
    });
    return data;
  }
  ngOnInit() {
    // 修改排序方式
    const sanyiSort = new SanyiSort();
    sanyiSort.directionMethod = 'ASC';
    sanyiSort.sortName = 'applyStatus';
    this.query.sort = sanyiSort;
  }
  shenPi(item: any) {
    this.router.navigate(['/bzspEdit', {id: item.bzId}]);
  }
  // 重置按钮
  reset($event) {
    this.query.query = new LienPersonnelBzDto();
    // 修改排序方式
    const sanyiSort = new SanyiSort();
    sanyiSort.directionMethod = 'ASC';
    sanyiSort.sortName = 'applyStatus';
    this.query.sort = sanyiSort;
    this.st.load($event);
  }

}
