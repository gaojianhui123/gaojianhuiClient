import { TanhuashenqingService } from '../../../services/TanhuashenqingService';
import {LienPersonnelTHDto} from '../../../model/LienPersonnelTHDto';
import {Tanhuashenqing} from '../../../model/Tanhuashenqing';
import { Component, OnInit, ViewChild } from '@angular/core';
import {QueryParam} from '../../../model/page/QueryParam';
import { SanyiSort } from '../../../model/page/SanyiSort';
import {STColumn, STComponent, STData} from '@delon/abc';
import { _HttpClient, ModalHelper } from '@delon/theme';
import {environment} from '@env/environment.prod';
import {Router} from '@angular/router';
import { SFSchema } from '@delon/form';
import { LienPersonnel } from '../../../model/LienPersonnel';
import { map } from 'rxjs/operators';
import { LienPersonnelService } from '../../../services/LienPersonnelService';

@Component({
  selector: 'app-daiban-list',
  templateUrl: './list.component.html',
})
export class DaibanListComponent implements OnInit {
  url = environment.SERVER_URL + `tanhuashenqing/findTanhuashenqing`;
  query: QueryParam<LienPersonnelTHDto> = new QueryParam<LienPersonnelTHDto>();
  querys: QueryParam<Tanhuashenqing> = new QueryParam<Tanhuashenqing>();
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
  @ViewChild('sf') sf: STComponent;
  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    {title: '编号', type : 'no'},
    {title: '代号', index: 'daiHao', sort: true},
    {title: '性别',  index: 'lzSexName'},
    {title: '年龄', index: 'lzAge'},
    {title: '职级', index: 'lzZhiJiName'},
    {title: '进驻日期', type : 'date', index: 'lpTime', dateFormat: 'YYYY-MM-DD'},
    {title: '审批情况', index: 'shenpiStatusName'},
    {
      title: '操作区',
      buttons: [
        { text: '审批', click: (item: any) => ( this.View(item) )},
      ]
    }
  ];
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
      switch (d.shenpiStatus) {
        case '0':
          d.shenpiStatusName = '未审批';
          break;
        case '1':
          d.shenpiStatusName = '已同意';
          break;
        case '2':
          d.shenpiStatusName = '已拒绝';
          break;
        default:
          d.shenpiStatusName = '未发起谈话';
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
  constructor(private http: _HttpClient, private modal: ModalHelper, private tanhuashenqingService: TanhuashenqingService,
              private router: Router, private lienPersonnelService: LienPersonnelService) { }

  ngOnInit() {
    // 修改排序方式
    const sanyiSort = new SanyiSort();
    sanyiSort.directionMethod = 'ASC';
    sanyiSort.sortName = 'shenpiStatus';
    this.querys.sort = sanyiSort;
  }

  add() {}

  reset($event) {
    this.querys.query = new Tanhuashenqing();
    // 修改排序方式
    const sanyiSort = new SanyiSort();
    sanyiSort.directionMethod = 'ASC';
    sanyiSort.sortName = 'shenpiStatus';
    this.querys.sort = sanyiSort;
    this.st.load($event);
}
  View( item: any) {
    console.log(item);
    this.router.navigate(['daiban/save', { id: item.id }]);
  }
}
