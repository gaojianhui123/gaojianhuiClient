import { NgModule } from '@angular/core';

import { SharedModule } from '@shared/shared.module';
import { RouteRoutingModule } from './routes-routing.module';
// dashboard pages
import { DashboardComponent } from './dashboard/dashboard.component';
// passport pages
import { UserLoginComponent } from './passport/login/login.component';
import { UserRegisterComponent } from './passport/register/register.component';
import { UserRegisterResultComponent } from './passport/register-result/register-result.component';
// single pages
import { CallbackComponent } from './callback/callback.component';
import { UserLockComponent } from './passport/lock/lock.component';
import { Exception403Component } from './exception/403.component';
import { Exception404Component } from './exception/404.component';
import { Exception500Component } from './exception/500.component';
import { LienpersonnelDetailComponent } from './lienpersonnel/list/detail/detail.component';
import { FileUploadService } from '../services/FileUploadService';
import { LooksikListComponent } from './looksik/list/list.component';
import { RuleListComponent } from './rule/list/list.component';
import { YinshiListComponent } from './yinshi/list/list.component';
import { BaozhangListComponent } from './baozhang/list/list.component';
import { TanhuaListComponent } from './tanhua1/list/list.component';
import { LooksikListEditComponent } from './looksik/list/edit/edit.component';
import { RuleListEditComponent } from './rule/list/edit/edit.component';
import { YinshiListEditComponent } from './yinshi/list/edit/edit.component';
import { BaozhangListEditComponent } from './baozhang/list/edit/edit.component';
import { TanhuaListEditComponent } from './tanhua1/list/edit/edit.component';
import { BaozhangListViewComponent } from './baozhang/list/view/view.component';
import { LooksikListViewComponent } from './looksik/list/view/view.component';
import { RuleListViewComponent } from './rule/list/view/view.component';
import { TanhuaListViewComponent } from './tanhua1/list/view/view.component';
import { YinshiListViewComponent } from './yinshi/list/view/view.component';
import {FankuiListComponent} from './fankui/list/list.component';
import {FankuiListEditComponent} from './fankui/list/edit/edit.component';
import {FankuiListViewComponent} from './fankui/list/view/view.component';

const COMPONENTS = [
  DashboardComponent,
  // passport pages
  UserLoginComponent,
  UserRegisterComponent,
  UserRegisterResultComponent,
  // single pages
  CallbackComponent,
  UserLockComponent,
  Exception403Component,
  Exception404Component,
  Exception500Component,
  LienpersonnelDetailComponent,
  LooksikListComponent,
  LooksikListEditComponent,
  LooksikListViewComponent,
  RuleListComponent,
  RuleListEditComponent,
  RuleListViewComponent,
  YinshiListComponent,
  YinshiListEditComponent,
  YinshiListViewComponent,
  BaozhangListComponent,
  BaozhangListEditComponent,
  BaozhangListViewComponent,
  TanhuaListComponent,
  TanhuaListEditComponent,
  TanhuaListViewComponent,
  FankuiListComponent,
  FankuiListEditComponent,
  FankuiListViewComponent
];
const COMPONENTS_NOROUNT = [
  LienpersonnelDetailComponent,
  LooksikListComponent,
  LooksikListEditComponent,
  LooksikListViewComponent,
  RuleListComponent,
  RuleListEditComponent,
  RuleListViewComponent,
  YinshiListComponent,
  YinshiListEditComponent,
  YinshiListViewComponent,
  BaozhangListComponent,
  BaozhangListEditComponent,
  BaozhangListViewComponent,
  TanhuaListComponent,
  TanhuaListEditComponent,
  TanhuaListViewComponent,
  FankuiListComponent,
  FankuiListEditComponent,
  FankuiListViewComponent
];

@NgModule({
  imports: [ SharedModule, RouteRoutingModule ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT,
  providers: [FileUploadService]
})
export class RoutesModule {}
