import {LienPersonnelTHDto} from '../../../model/LienPersonnelTHDto';
import {TanhuaListEditComponent} from './edit/edit.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import {QueryParam} from '../../../model/page/QueryParam';
import {STColumn, STComponent, STData} from '@delon/abc';
import { _HttpClient, ModalHelper } from '@delon/theme';
import {ActivatedRoute, Router} from '@angular/router';
import {environment} from '@env/environment.prod';
import { SFSchema } from '@delon/form';

@Component({
  selector: 'app-tanhua-list',
  templateUrl: './list.component.html',
})
export class TanhuaListComponent implements OnInit {
  url = environment.SERVER_URL + `lienPersonnel/selectLienPersonnelJoinTh`;
  query: QueryParam<LienPersonnelTHDto> = new QueryParam<LienPersonnelTHDto>();
  id: string;
  searchSchema: SFSchema = {
    properties: {
      tianBaoTime: {
        type: 'string',
        title: '谈话申请时间',
        format: 'date',
        ui: {
          width: 300
        }
      }
    }
  };
  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    {title: '编号', type : 'no'},
    {title: '代号', index: 'daiHao'},
    {title: '姓名', index: 'lzName'},
    {title: '性别',  index: 'lzSexName'},
    {title: '年龄', index: 'lzAge'},
    {title: '进驻日期', type : 'date', index: 'enterTime', dateFormat: 'YYYY-MM-DD'},
    {title: '谈话申请时间', type : 'date', index: 'tianBaoTime', dateFormat: 'YYYY-MM-DD'},
    {
      title: '操作区',
      buttons: [
        { text: '查看详情', click: (item: any) => ( this.view(item) )},
      ]
    }
  ];

  constructor(private http: _HttpClient, private modal: ModalHelper,
              private router: Router, private route: ActivatedRoute
  ) { }
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
    this.id = this.route.snapshot.paramMap.get('id');
    this.query.query.id = this.id ;
  }
  view(item: any) {
    // console.log(item);
    this.modal.createStatic(TanhuaListEditComponent, { tanhua: { id: item.thId } }).
    subscribe(() => this.st.reload());
  }
  load($event) {
    this.query.query = $event;
    this.query.query.id = this.id;
    this.st.load($event);
  }
  reset($event) {
    this.query.query = new LienPersonnelTHDto();
    this.query.query.id = this.id;
    this.st.load($event);
  }

}
