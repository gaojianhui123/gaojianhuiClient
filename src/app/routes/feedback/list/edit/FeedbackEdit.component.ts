import { Component, OnInit, } from '@angular/core';
import {NzI18nService, NzMessageService} from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import {Feedback} from '../../../../model/Feedback';
import {FeedbackService} from '../../../../services/FeedbackService';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';

@Component({
  selector: 'app-feedback-save',
  templateUrl: './feedbackEdit.component.html',
  styleUrls: ['./feedbackEdit.component.css']
})
export class FeedbackEditComponent implements OnInit {
  feedback: Feedback = new Feedback();
  validateForm: FormGroup;
  isLoading = false;
  title: string;
  record: any = {};
  i: any;
  constructor(
    private msgSrv: NzMessageService,
    public http: _HttpClient,
    private feedbackService: FeedbackService,
    private router: Router,
    private route: ActivatedRoute,
    private msg: NzMessageService
    , private fb: FormBuilder,
    private i18n: NzI18nService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    const ids = this.route.snapshot.paramMap.get('ids');
    this.feedback.lienPersonnelid = ids;
    // console.log(ids);
    // console.log(id);
    if (id) {
      this.title = '问题反馈信息编辑';
      this.feedbackService.findFeedbackById(id).subscribe((res) => {
        this.feedback = res;
      });
    }
    this.validateForm = this.fb.group({
        fkTime:        [ null, [ Validators.required ] ],   //  反馈日期
      signTime:        [ null, [Validators.required] ],     //  签收日期
         title:        [ null, [Validators.required] ],     //  签收人
       problem:        [ null, [Validators.required] ],     //  问题反馈
       suggest:        [ null, [Validators.required] ],     //  建议
      department:      [ null, [Validators.required] ],     //  部门
    });
  }
  save() {
    for (const i of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }
    if (this.validateForm.valid === true) {
      this.feedback.fkTime = moment(this.feedback.fkTime).format('YYYY-MM-DD').toString();
      this.feedback.signTime = moment(this.feedback.signTime).format('YYYY-MM-DD').toString();
      this.feedbackService.saveFeedback(this.feedback).subscribe((result) => {
        this.isLoading = false;
        if (result) {
          this.msgSrv.success('保存成功');
          this.router.navigate(['/feedback']);
        } else {
          this.msgSrv.error('保存失败');
        }
      });
    }
  }
// 关闭按钮
  closed() {
    this.router.navigate(['/anguan']);
  }

}
