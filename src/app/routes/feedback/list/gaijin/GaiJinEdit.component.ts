import { Component, OnInit, } from '@angular/core';
import {NzI18nService, NzMessageService} from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import {Feedback} from '../../../../model/Feedback';
import {FeedbackService} from '../../../../services/FeedbackService';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import * as moment from 'moment';
import { User } from '../../../../model/User';
// import * as moment from 'moment';

@Component({
  selector: 'app-gaijin-save',
  templateUrl: './GaiJinEdit.component.html',
  styleUrls: ['./GaiJinEdit.component.css']
})
export class GaiJinEditComponent implements OnInit {
  currentUser: User;
  feedback: Feedback = new Feedback();
  validateForm: FormGroup;
  isLoading = false;
  title: string;
  i: any;
  constructor(
    private msgSrv: NzMessageService,
    public http: _HttpClient,
    private feedbackService: FeedbackService,
    private router: Router,
    private route: ActivatedRoute,
    private msg: NzMessageService,
    private fb: FormBuilder,
  ) {
    this.currentUser = this.feedbackService.getCurrentUser();
  }

  ngOnInit(): void {
    this.feedback.bumenid = this.currentUser.bumenId;
    const idl = this.route.snapshot.paramMap.get('idl');
    const ids = this.route.snapshot.paramMap.get('ids');
    this.feedback.id = ids;
    if (ids ) {
      this.feedbackService.findFeedbackById(ids).subscribe(res => {
        this.feedback = res;
      });
    }
    if (idl) {
      this.feedbackService.findFeedbackById(idl).subscribe(resl => {
        this.feedback = resl;
      });
    }
    this.validateForm = this.fb.group({
      fzPerson:        [ null, [ Validators.required ] ],   //  负责人
      gjTime:          [ null, [Validators.required] ],     //  改进反馈时间
      phone:           [ null, [Validators.required] ],     //  联系方式
      gjResult:        [ null, [Validators.required] ],     //  改进结果
    });
  }
  save() {
    this.feedback.bumenid = this.currentUser.bumenId;
    for (const i of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }
    if (this.validateForm.valid === true) {
      this.feedback.gjTime = moment(this.feedback.gjTime).format('YYYY-MM-DD').toString();
      this.feedbackService.saveFeedbackQuestion(this.feedback).subscribe(res => {
        this.isLoading = false;
        if (res) {
          this.msgSrv.success('保存成功');
          this.router.navigate(['/jianyidan']);
        } else {
          this.msgSrv.error('保存失败');
        }
      });
    }
  }
  // 关闭按钮
  closed() {
    this.router.navigate(['/jianyidan']);
  }

}
