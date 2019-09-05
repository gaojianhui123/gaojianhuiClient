import {FankuiListEditComponent} from './edit/edit.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import {QueryParam} from '../../../model/page/QueryParam';
import {STColumn, STComponent, STData} from '@delon/abc';
import { _HttpClient, ModalHelper } from '@delon/theme';
import {ActivatedRoute, Router} from '@angular/router';
import {Feedback} from '../../../model/Feedback';
import {NzModalService} from 'ng-zorro-antd';
import {environment} from '@env/environment';
import { SFSchema } from '@delon/form';

@Component({
  selector: 'app-fankui-list',
  templateUrl: './list.component.html',
})
export class FankuiListComponent implements OnInit {
  url = environment.SERVER_URL + `feedback/findFeedback`;
  queryParam: QueryParam<Feedback> = new QueryParam<Feedback>();
  id: string;
  searchSchema: SFSchema = {
    properties: {
      fkTime: {
        type: 'string',
        title: '反馈时间',
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
    {title: '进驻日期', type: 'date', index: 'enterTime',  dateFormat: 'YYYY-MM-DD'},
    {title: '反馈时间', index: 'fkTime'},
    {
      title: '操作区',
      buttons: [
        { text: '查看详情', type: 'static', click: (item: any) => (this.view(item.id)) },
      ]
    }
  ];
  constructor(private http: _HttpClient, private modal: ModalHelper, private modalService: NzModalService,
              private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.queryParam.query.lienPersonnelid = this.id;
  }
  processData = (data: STData[]) => {
    console.log(data);
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
  view(id: string) {
    console.log(id);
    this.modal.createStatic(FankuiListEditComponent, { record: { id: id } })
      .subscribe(() => this.st.reload());
  }
  load($event) {
    this.queryParam.query = $event;
    console.log($event);
    this.queryParam.query.lienPersonnelid = this.id;
    this.st.load($event);
  }
  reset($event) {
    this.queryParam.query = new Feedback();
    this.queryParam.query.lienPersonnelid = this.id;
    this.st.reset($event);
  }
}
