import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef, NzMessageService, NzModalService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';
import { FeedbackService } from '../../../../services/FeedbackService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jianyidan-list-edit',
  templateUrl: './edit.component.html',
})
export class JianyidanListEditComponent implements OnInit {
  feedback: any = {};
  i: any;
  schema: SFSchema = {
    properties: {
      department: { type: 'string', title: '部门', readOnly: true },
      fkTime: { type: 'string', title: '反馈时间', readOnly: true  },
      problem: { type: 'string', title: '存在问题', readOnly: true  },
      suggest: { type: 'string', title: '改进意见', readOnly: true  },
      signTime: { type: 'string', title: '签收日期', readOnly: true  },
      title: { type: 'string', title: '签收人', readOnly: true  },
      // description: { type: 'string', title: '签收日期', maxLength: 140 },
    },
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: { span: 12 },
    },
    $problem: {
      widget: 'textarea',
      grid: { span: 24 },
      autosize: { minRows: 3, maxRows: 6 }
    },
    $suggest: {
      widget: 'textarea',
      grid: { span: 24 },
      autosize: { minRows: 3, maxRows: 6 }
    },
  };

  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
    private  feedbackService: FeedbackService,
    private router: Router,
  ) {}

  ngOnInit() {
    if (this.feedback.id) {
      this.feedbackService.findFeedbackById(this.feedback.id).subscribe((res) => (this.i = res
      ));
      // console.log(this.i);
    }
  }
  // 改进情况反馈
  gaijin(i) {
      this.router.navigate(['/gaijinsave', { ids: i.id}]);
    }
  close() {
    this.modal.destroy();
  }
}
