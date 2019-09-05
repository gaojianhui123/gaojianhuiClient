import {BaozhangshenqingService} from '../../../services/BaozhangshenqingService';
import {LienPersonnelService} from '../../../services/LienPersonnelService';
import {LienPersonnelBzDto} from '../../../model/LienPersonnelBzDto';
import {environment} from '../../../../environments/environment';
import {Baozhangshenqing} from '../../../model/Baozhangshenqing';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SanyiSort } from '../../../model/page/SanyiSort';
import {QueryParam} from '../../../model/page/QueryParam';
import {STColumn, STComponent, STData} from '@delon/abc';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { SFSchema } from '@delon/form';
import {Router} from '@angular/router';
import { LienPersonnel } from '../../../model/LienPersonnel';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-safeguardlist-list',
  templateUrl: './list.component.html',
})
export class SafeguardlistListComponent implements OnInit {
  url = environment.SERVER_URL + `lienPersonnel/selectLienPersonnelJoinBz`;
  queryParam: QueryParam<Baozhangshenqing> = new QueryParam<Baozhangshenqing>();
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
      }
    }
  };
  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    {title: '编号', type : 'no'},
    {title: '代号', index: 'daiHao', sort: true},
    {title: '性别',  index: 'lzSexName'},
    {title: '年龄', index: 'lzAge'},
    {title: '职级', index: 'lzZhiJiName'},
    {title: '进驻日期', type : 'date', index: 'enterTime', dateFormat: 'YYYY-MM-DD'},
    {title: '保障申请时间', type : 'date', index: 'tianBaoTime', dateFormat: 'YYYY-MM-DD'},
    {
      title: '操作区',
      buttons: [{text: '查看', click: (item: any) => this.goToView(item.bzId)}]
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
    data.map( d => {
      switch (d.lpZhiji) {
        case '1':
          d.lzZhiJiName = '处级以下';
          break;
        case '2':
          d.lzZhiJiName = '处级';
          break;
        case '3':
          d.lzZhiJiName = '厅局级';
          break;
        case '4':
          d.lzZhiJiName = '厅局级以上';
          break;
        default:
          d.lzZhiJiName = '';
      }
    });
    return data;
  }
  constructor(private http: _HttpClient, private modal: ModalHelper, private router: Router,
              private lienPersonnelService: LienPersonnelService,
              private baozhangshenqingService: BaozhangshenqingService) { }

  ngOnInit() {
    // 修改排序方式
    const sanyiSort = new SanyiSort();
    sanyiSort.directionMethod = 'DESC';
    sanyiSort.sortName = 'tianBaoTime';
    this.query.sort = sanyiSort;
    this.query.query.applyStatus = '2';
  }

  goToView(id: any) {
    this.router.navigate(['/safeguardlistSave', {id: id}]);
  }

  reset($event) {
    this.query.query = new LienPersonnelBzDto();
    // 修改排序方式
    const sanyiSort = new SanyiSort();
    sanyiSort.directionMethod = 'DESC';
    sanyiSort.sortName = 'tianBaoTime';
    this.query.sort = sanyiSort;
    this.st.load($event);
  }

}
