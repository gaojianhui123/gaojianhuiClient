import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SettingsService } from '@delon/theme';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { SystemService } from '../../../../services/SystemService';
import { User } from '../../../../model/User';
import { NzMessageService } from 'ng-zorro-antd';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'header-user',
  template: `
  <nz-dropdown nzPlacement="bottomRight">
    <div class="alain-default__nav-item d-flex align-items-center px-sm" nz-dropdown>
      <nz-avatar [nzSrc]="settings.user.avatar" nzSize="small" class="mr-sm"></nz-avatar>
      {{settings.user.name}}
    </div>
    <div nz-menu class="width-sm">
      <div nz-menu-item (click)="viewUser()"><i nz-icon type="user" class="mr-sm"></i>
        个人中心
      </div>
      <div nz-menu-item (click)="passwd()"><i nz-icon type="setting" class="mr-sm"></i>
        修改密码
      </div>
      <li nz-menu-divider></li>
      <div nz-menu-item (click)="logout()"><i nz-icon type="logout" class="mr-sm"></i>
        退出登录
      </div>
    </div>
  </nz-dropdown>
  <nz-modal [(nzVisible)]="isVisible" [nzTitle]="modalTitle" [nzFooter]="modalFooter" (nzOnCancel)="handleCancel()">
    <ng-template #modalTitle>
      <span style="color: #17a2b8;font-weight:700;">{{title1}}</span>
    </ng-template>
    <form nz-form [formGroup]="validateForm" >
      <nz-form-item>
        <nz-form-label [nzSm]="6" [nzXs]="24" nzFor="updatePassword" nzRequired>新密码</nz-form-label>
        <nz-form-control [nzSm]="14" [nzXs]="24">
          <input nz-input type="password" id="updatePassword" formControlName="updatePassword" [(ngModel)]="currentUser.updatePassword">
          <nz-form-explain *ngIf="validateForm.get('updatePassword').dirty && validateForm.get('updatePassword').errors">
            请输入您的密码!</nz-form-explain>
        </nz-form-control>
      </nz-form-item>
      <nz-form-item>
        <nz-form-label [nzSm]="6" [nzXs]="24" nzFor="secondPassword" nzRequired>确认密码</nz-form-label>
        <nz-form-control [nzSm]="14" [nzXs]="24">
          <input nz-input type="password" formControlName="secondPassword" id="secondPassword" [(ngModel)]="currentUser.secondPassword">
          <nz-form-explain *ngIf="validateForm.get('secondPassword').dirty && validateForm.get('secondPassword').errors">
            <ng-container *ngIf="validateForm.get('secondPassword').hasError('required')">
              请确认您的密码!
            </ng-container>
            <ng-container *ngIf="validateForm.get('secondPassword').hasError('confirm')">
              您输入的两个密码不一致!
            </ng-container>
          </nz-form-explain>
        </nz-form-control>
      </nz-form-item>
      </form>
      <ng-template #modalFooter>
        <button nz-button nzType="default" (click)="handleCancel()">返回</button>
        <button nz-button nzType="primary" (click)="submitForm()" [nzLoading]="isConfirmLoading">提交</button>
      </ng-template>
  </nz-modal>
  `,
})
export class HeaderUserComponent implements OnInit {

  title1: string;
  isVisible = false;  // 模态框
  isConfirmLoading = false;
  currentUser: User;
  validateForm: FormGroup;
  constructor(
    public settings: SettingsService,
    private router: Router,
    private  systemService: SystemService,
    private msgSrv: NzMessageService,
    private fb: FormBuilder,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
  ) {
    this.currentUser = this.systemService.getCurrentUser();
  }

  logout() {
    this.tokenService.clear();
    this.router.navigateByUrl(this.tokenService.login_url);
  }
  viewUser() {
    const id = this.systemService.getCurrentUser().id;
    this.router.navigate(['/userinfor/' + id ]);
  }
  // 修改密码模态框
  passwd() {
    this.title1 = ' 修改密码 ';
    this.isVisible = true;
  }
  /**
   * 关闭模态框
   */
  handleCancel(): void {
    this.isVisible = false;
  }
  // 修改密码提交
  submitForm() {
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }
    // console.log(this.currentUser);
    if (this.validateForm.valid === true) {
          this.systemService.updatePassword(this.currentUser).subscribe(user => {
            // console.log(user);
            this.router.navigate(['/']);
          });
    }
  }
  ngOnInit(): void {
    this.validateForm = this.fb.group({
      updatePassword    : [ null, [ Validators.required ] ],
      secondPassword    : [ null, [ Validators.required,this.confirmationValidator ] ],

    });
  }
  // 动态表单验证 密码是否输入一致
  confirmationValidator = (control: FormControl): { [ s: string ]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.updatePassword.value) {
      return { confirm: true, error: true };
    }
  }
  updateConfirmValidator(): void {
    /** 等待刷新值 */
    Promise.resolve().then(() => this.validateForm.controls.secondPassword.updateValueAndValidity());
  }
}
