import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';
import {CateringService} from '../../../../services/CateringService';

@Component({
  selector: 'app-yinshi-list-edit',
  templateUrl: './edit.component.html',
})
export class YinshiListEditComponent implements OnInit {
  record: any = {};
  i: any;
  modalTitle = '查看';
  schema: SFSchema = {
    properties: {
      cookingMan: { type: 'string', title: '做餐人', readOnly: true },
      cookingManTwo: { type: 'string', title: '', readOnly: true },
      cookingManThree: { type: 'string', title: '', readOnly: true },
      packingMan: { type: 'string', title: '打包人', readOnly: true },
      packingManTwo: { type: 'string', title: '', readOnly: true },
      packingManThree: { type: 'string', title: '', readOnly: true },
      deliveryMan: { type: 'string', title: '送餐人', readOnly: true},
      deliveryManTwo: { type: 'string', title: '', readOnly: true},
      deliveryManThree: { type: 'string', title: '', readOnly: true},
      receiveMan: { type: 'string', title: '接餐人', readOnly: true},
      receiveManTwo: { type: 'string', title: '', readOnly: true},
      receiveManThree: { type: 'string', title: '', readOnly: true},
      riqi: { type: 'string', title: '日期', readOnly: true },
      remarks: { type: 'string', title: '备注', readOnly: true, maxLength: 1000},
      specificbreakfast: { type: 'string', title: '特殊早餐', readOnly: true, maxLength: 1000},
      specificlunch: { type: 'string', title: '特殊午餐', readOnly: true, maxLength: 1000},
      specificdinner: { type: 'string', title: '特殊晚餐', readOnly: true, maxLength: 1000},
    },
    required: [],
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: { span: 8 },
    },
    cookingManTwo: {
      grid: { span: 8 },
    },
    $riqi: {
      grid: { span: 24 },
    },
    $remarks: {
      widget: 'textarea',
      grid: { span: 24 },
    },
    $breakfast: {
      widget: 'textarea',
      grid: { span: 24 },
    },
    $specificlunch: {
      widget: 'textarea',
      grid: { span: 24 },
    },
    $specificdinner: {
      widget: 'textarea',
      grid: { span: 24 },
    },
  };

  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
    private cateringService: CateringService
  ) {}

  ngOnInit(): void {
    if (this.record.id) {
      this.modalTitle = '特殊餐饮查看';
      this.cateringService.findCateringById(this.record.id).subscribe(res => {
        this.i = res;
      });
    }
  }

  save(value: any) {
    this.http.post(`/user/${this.record.id}`, value).subscribe(res => {
      this.msgSrv.success('保存成功');
      this.modal.close(true);
    });
  }

  close() {
    this.modal.destroy();
  }
}
