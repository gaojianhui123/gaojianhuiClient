import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import {SFSchema, SFUISchema} from '@delon/form';
import {CateringService} from '../../../../services/CateringService';

@Component({
  selector: 'app-yinshi-list-view',
  templateUrl: './view.component.html',
})
export class YinshiListViewComponent implements OnInit {
  record: any = {};
  i: any;
  modalTitle: string;
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
      breakfast: { type: 'string', title: '早餐', readOnly: true, maxLength: 1000},
      lunch: { type: 'string', title: '午餐', readOnly: true, maxLength: 1000},
      dinner: { type: 'string', title: '晚餐', readOnly: true, maxLength: 1000},
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
    $lunch: {
      widget: 'textarea',
      grid: { span: 24 },
    },
    $dinner: {
      widget: 'textarea',
      grid: { span: 24 },
    },
  };
  constructor(
    private modal: NzModalRef,
    public msgSrv: NzMessageService,
    public http: _HttpClient,
    private cateringService: CateringService
  ) { }

  ngOnInit(): void {
    console.log(this.record.id);
    if (this.record.id) {
      this.modalTitle = '常规餐饮查看';
      this.cateringService.findCateringById(this.record.id).subscribe(res => {
        this.i = res;
      });
    }
  }

  close() {
    this.modal.destroy();
  }
}
