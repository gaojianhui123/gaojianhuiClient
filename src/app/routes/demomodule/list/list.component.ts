import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import {DemomoduleListEditComponent} from './edit/edit.component';

@Component({
  selector: 'app-demomodule-list',
  templateUrl: './list.component.html',
})
export class DemomoduleListComponent implements OnInit {
  // url = `/user`;
  url = `http://localhost:8080/partbuildingArticle/findPartyBuildingArticle`;
  query: any = { query:{name: 'asdf'}, page:{} };
  searchSchema: SFSchema = {
    properties: {
      title: {
        type: 'string',
        title: '名称',
        format: 'date'
      }
    }
  };
  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    { title: '编号', index: 'id' },
    { title: '名称',  index: 'title' },
    { title: '头像', type: 'img', width: '50px', index: 'avatar' },
    { title: '时间', type: 'date', index: 'updatedAt' },
    {
      title: '',
      buttons: [
        { text: '查看', click: (item: any) => `/form/${item.id}` },
        { text: '编辑', type: 'static', component: DemomoduleListEditComponent, click: 'reload' },
      ]
    }
  ];

  constructor(private http: _HttpClient, private modal: ModalHelper) { }

  ngOnInit() { }

  add() {
    this.modal
      .createStatic(DemomoduleListEditComponent, { i: { id: 0 } })
      .subscribe(() => this.st.reload());
  }

}
