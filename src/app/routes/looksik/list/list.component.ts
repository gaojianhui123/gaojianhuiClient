import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import {STColumn, STComponent, STData} from '@delon/abc';
import { SFSchema } from '@delon/form';
import {environment} from '@env/environment';
import {QueryParam} from '../../../model/page/QueryParam';
import {LooksikListEditComponent} from './edit/edit.component';
import {NzModalService} from 'ng-zorro-antd';
import {LienPersonnel} from '../../../model/LienPersonnel';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-looksik-list',
  templateUrl: './list.component.html',
})
export class LooksikListComponent implements OnInit {
  url = environment.SERVER_URL + `lienPersonnel/selectLienPersonnelJoinNurse`;
  id: string;
  queryParam: QueryParam<LienPersonnel> = new QueryParam<LienPersonnel>();
  searchSchema: SFSchema = {
    properties: {
      submitTime: {
        type: 'string',
        format: 'date',
        title: '上报时间',
        ui: {
          width: 300
        }
      }
    }
  };
  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    { title: '编号', type: 'no' },
    { title: '代号', index: 'daiHao' },
    // { title: '房间号', index: 'roomNum' },
    { title: '性别', index: 'lzSexName'},
    // { title: '民族',  index: 'lzMinZuName' },
    { title: '进驻时间', type : 'date', index: 'enterTime', dateFormat: 'YYYY-MM-DD' },
    { title: '上报人', index: 'submitId' },
    { title: '上报时间', type: 'date', index: 'submitTime', dateFormat: 'YYYY-MM-DD' },
    {
      title: '操作',
      buttons: [
        {text: '查看详情', type: 'static',  click: (item: any) => ( this.view(item) ) },
      ]
    }
  ];
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
    return data; }

  constructor(private http: _HttpClient, private modal: ModalHelper, private modalService: NzModalService,
              private router: Router, private route: ActivatedRoute ) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.queryParam.query.id = this.id ;
  }

  view(item: any) {
    this.modal.createStatic(LooksikListEditComponent, { record: { id: item.nurseId } })
      .subscribe(() => this.st.reload());
  }
  load($event) {
    this.queryParam.query = $event;
    this.queryParam.query.id = this.id;
    this.st.load($event);
  }
  reset($event) {
    this.queryParam.query = new LienPersonnel();
    this.queryParam.query.id = this.id;
    this.st.reset($event);
  }

}
