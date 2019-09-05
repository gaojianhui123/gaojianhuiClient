import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import {STColumn, STComponent, STData} from '@delon/abc';
import { SFSchema } from '@delon/form';
import {QueryParam} from '../../../model/page/QueryParam';
import {SanyiPage} from '../../../model/page/SanyiPage';
import {HandlingPerson} from '../../../model/HandlingPerson';
import {environment} from '@env/environment';
import {HandlingPersonService} from '../../../services/HandlingPersonService';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {Router} from '@angular/router';

@Component({
  selector: 'app-handlingperson-list',
  templateUrl: './list.component.html',
})
export class HandlingpersonListComponent implements OnInit {
  queryParam: QueryParam<HandlingPerson> = new QueryParam<HandlingPerson>();
  contentPage: SanyiPage<HandlingPerson> = new SanyiPage<HandlingPerson>();
  url = environment.SERVER_URL + `handlingPerson/findHandlingPerson`;
  searchSchema: SFSchema = {
    properties: {
      controlNo: {
        type: 'string',
        title: '编号'
      },
      applyTime: {
        type: 'string',
        title: '登记日期',
        format: 'date'
      }
    }
  };
  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    { title: '序号', type: 'no' },
    { title: '办案人员编号', index: 'controlNo' },
    { title: '办案人员姓名', index: 'title' },
    { title: '性别', index: 'memberSexName' },
    { title: '登记日期', index: 'applyTime', type: 'date', dateFormat: 'YYYY-MM-DD'},
    // { title: '年龄', index: 'age' },
    {
      title: '操作区',
      buttons: [
        { text: '编辑', type: 'static', click: (item: any) => (this.Edit(item.id)) },
        { text: '删除', type: 'static', click: (data: any) => (this.Delete(data)) },
      ]
    }
  ];

  constructor(private http: _HttpClient, private modal: ModalHelper, private router: Router,
              private handlingPersonService: HandlingPersonService,
              private messageService: NzMessageService, private modalService: NzModalService, ) { }

  processData = (data: STData[]) => {
    data.map( d => {
      switch (d.memberSex) {
        case 0:
          d.memberSexName = '男';
          break;
        case 1:
          d.memberSexName = '女';
          break;
        default:
          d.memberSexName = '';
      }
    })
    return data;
  }
  ngOnInit() { }
 //  新建
  add() {
    this.router.navigate(['/handlingpersonsave']);
  }
  // 编辑
  Edit(id: any) {
    this.router.navigate(['/handlingpersonsave', {id: id}]);
  }
  Delete(data: any) {
    console.log(data);
    this.modalService.confirm({
      nzTitle     : '确定要删除编号 ' + data.controlNo + ' 办案人员吗？',
      nzContent   : '<b style="color: #ff0000;">删除后将不可恢复！</b>',
      nzOkType    : 'danger',
      nzOnOk      : () => {
        this.handlingPersonService.deleteHandlingPerson(data).subscribe(res => {
          this.messageService.success('删除成功');
          this.st.reload();
        });
      },
      nzCancelText: '取消',
      nzOnCancel  : () => console.log('Cancel')
    });
  }
  reset($event) {
    this.queryParam.query = new HandlingPerson();
    this.st.load($event);
  }

}
