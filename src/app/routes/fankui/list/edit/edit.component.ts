import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';
import {FeedbackService} from '../../../../services/FeedbackService';

@Component({
  selector: 'app-fankui-list-edit',
  templateUrl: './edit.component.html',
})
export class FankuiListEditComponent implements OnInit {
  record: any = {};
  i: any;
  modalTitle: string;
  schema: SFSchema = {
    properties: {
      fzPerson: { type: 'string', title: '负责人', readOnly: true },
      gjTime: { type: 'string', title: '反馈时间',  readOnly: true },
      phone: { type: 'string', title: '联系方式' , readOnly: true},
      gjResult: { type: 'string', title: '描述', maxLength: 140 , readOnly: true},
    },
    // required: ['owner', 'callNo', 'href', 'gjResult'],
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: { span: 12 },
    },
    // $no: {
    //   widget: 'text'
    // },
    // $href: {
    //   widget: 'string',
    // },
    // $gjResult: {
    //   widget: 'textarea',
    //   // hight: 200,
    //   grid: { span: 24 },
    // },
  };

  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
    private feedbackService: FeedbackService
  ) {}

  ngOnInit(): void {
    this.modalTitle = '查看';
    if (this.record.id) {
      this.modalTitle = '查看';
      this.feedbackService.findFeedbackById(this.record.id).subscribe(res => {
        this.i = res;
        console.log(this.i);
      });
    }
  }

  close() {
    this.modal.destroy();
  }
}
