import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import {STColumn, STComponent, STData} from '@delon/abc';
import { SFSchema } from '@delon/form';
import {environment} from '@env/environment.prod';
import {QueryParam} from '../../../model/page/QueryParam';
import {BaozhangListEditComponent} from './edit/edit.component';
import {LienPersonnel} from '../../../model/LienPersonnel';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-baozhang-list',
  templateUrl: './list.component.html',
})
export class BaozhangListComponent implements OnInit {
  url = environment.SERVER_URL + `lienPersonnel/selectLienPersonnelJoinBz`;
  query: QueryParam<LienPersonnel> = new QueryParam<LienPersonnel>();
  id: string;
  searchSchema: SFSchema = {
    properties: {
      tianBaoTime: {
        type: 'string',
        title: '保障申请时间',
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
    {title: '保障申请时间', type : 'date', index: 'tianBaoTime', dateFormat: 'YYYY-MM-DD'},
    {
      title: '操作区',
      buttons: [
        { text: '查看详情', click: (item: any) => ( this.view(item) )},
      ]
    }
  ];

  constructor(private http: _HttpClient, private modal: ModalHelper, private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.query.query.id = this.id;
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
  view(item: any) {
    console.log(item);
    this.modal.createStatic(BaozhangListEditComponent, { record: { id: item.bzId, lpId: this.id}}).
    subscribe(() => this.st.reload());
  }
  load($event) {
    this.query.query = $event;
    this.query.query.id = this.id;
    this.st.load($event);
  }
  reset($event) {
    this.query.query = new LienPersonnel();
    this.query.query.id = this.id;
    this.st.load($event);
  }

}
