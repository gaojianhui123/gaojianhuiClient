import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SimpleGuard } from '@delon/auth';
import { environment } from '@env/environment';
// layout
import { LayoutDefaultComponent } from '../layout/default/default.component';
import { LayoutPassportComponent } from '../layout/passport/passport.component';
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
import {RuleListEditComponent} from './rule/list/edit/edit.component';
import { FloorplanListComponent } from './floorplan/list/list.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutDefaultComponent,
    canActivate: [SimpleGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent, data: { title: '仪表盘', titleI18n: 'dashboard' } },
      {
        path: 'protectedResource',
        loadChildren: './protectedResource/list.module#ListModule',
        data: { title: '受限资源管理' }
      },
      {
        path: 'role',
        loadChildren: './roles/role/role.module#RoleModule'
      },
      {
        path: 'rolesave',
        loadChildren: './roles/rolesave/rolesave.module#RolesaveModule'
      },
      {
        path: 'usermanage',
        loadChildren: './systemManage/usermanage/usermanage.module#UsermanageModule'
      },
      {
        path: 'useredit/:id',
        loadChildren: './systemManage/usermanage/usersave.module#UsersaveModule'
      },
      {
        path: 'userinfor/:id',
        loadChildren: './systemManage/viewuserinfor/userinfor.module#UserinforModule'
      },
      { path: 'partbuildingtype', component: Exception403Component },
      { path: 'partbuildingarticle', component: Exception404Component },
      { path: 'list', loadChildren: './demomodule/demomodule.module#DemomoduleModule' },
      // 进驻列表
      { path: 'lienpersonnel', loadChildren: './lienpersonnel/lienpersonnel.module#LienpersonnelModule', },
      // 详情
      { path: 'lienpersonnelDetail', component: LienpersonnelDetailComponent },
      // 进驻管理里的谈话情况申请路由
      {path: 'lienTanhuashenqinginfo', loadChildren: './lienTanhuashenqinginfo/list.module#ListModule'},
      // 进驻详情的 常规体检页签点击查看路由跳转到RuleListEditComponent组件
      { path: 'lienpersonnelDetail/viewChangGui', component: RuleListEditComponent },
      // 楼层平面图
      { path: 'floorplan', loadChildren: './floorplan/floorplan.module#FloorplanModule', },
      // 进驻详情页签看护
      {
        path: 'looksik',
        loadChildren: './looksik/looksik.module#LooksikModule',
      },
      // 代办
      {
        path: 'daiban',
        loadChildren: './daiban/daiban.module#DaibanModule',
      },
      // 保障审批
      {
        path: 'bzsp',
        loadChildren: './bzsp/bzsp.module#BzspModule',
      },
      // 保障审批 表单页面
      {
        path: 'bzspEdit',
        loadChildren: './bzsp/list/edit/edit.module#EditModule',
      },
      // 案管
      {
        path: 'anguan',
        loadChildren: './anguan/anguan.module#AnguanModule',
      },
      { path: 'list', loadChildren: './demomodule/demomodule.module#DemomoduleModule' },
      /**
       * 业务子模块
       */
      // { path: 'widgets', loadChildren: './widgets/widgets.module#WidgetsModule' }
      // 字典分类模块
      {path: 'dictsort', loadChildren: './dictsort/dictsort.module#DictsortModule'},
      // 字典模块
      {path: 'dictionary', loadChildren: './dictionary/dictionary.module#DictionaryModule'},
      // 药品模块
      {path: 'drug', loadChildren: './drug/drug.module#DrugModule'},
      {path: 'drugsave', loadChildren: './drug/list/edit/edit.module#EditModule'},
      // 办案管理信息查看
      {path: 'bananinfo', loadChildren: './bananinfo/list.module#ListModule'},
      // // 办案管理保障申请信息
      {path: 'baozhangshenqinginfo', loadChildren: './baozhangshenqinginfo/list.module#ListModule'},
      // // 办案管理谈话申请信息
      {path: 'tanhuashenqinginfo', loadChildren: './tanhuashenqinginfo/list.module#ListModule'},
      // 进驻体检
      {path: 'jinzhutijian', loadChildren: './jinzhutijian/list.module#ListModule'},
      // 常规体检
      {path: 'changguitijian', loadChildren: './changguitijian/list.module#ListModule'},
      // 常规体检二
      {path: 'health', loadChildren: './health/health.module#HealthModule'},
      // 用药记录
      {path: 'medicalrecords', loadChildren: './medicalrecords/medicalrecords.module#MedicalrecordsModule'},
      /**
       * 看护管理
       */
      {path: 'nurse', loadChildren: './nurse/nurse.module#NurseModule'},
      // {path: 'nurseSave', loadChildren: './nurse/list/edit/save.module#SaveModule'},
      {path: 'talklist', loadChildren: './talklist/talklist.module#TalklistModule'},
      // {path: 'talklistSave', loadChildren: './talklist/list/edit/edit.module#EditModule'},
      /**
       * 餐饮管理
       */
      {path: 'catering', loadChildren: './catering/catering.module#CateringModule'},
      {path: 'cateringSave', loadChildren: './catering/list/edit/edit.module#EditModule'},
      {path: 'safeguardlist', loadChildren: './safeguardlist/safeguardlist.module#SafeguardlistModule'},
      {path: 'safeguardlistSave', loadChildren: './safeguardlist/list/edit/edit.module#EditModule'},
      /**
       * 办案人员路由
       */
      {path: 'handlingperson', loadChildren: './handlingperson/handlingperson.module#HandlingpersonModule'},
      {path: 'handlingpersonsave', loadChildren: './handlingperson/list/edit/HandlingPersonEdit.module#HandlingPersonEditModule'},
      /**
       * 问题反馈路由
       */
      {path: 'feedback', loadChildren: './feedback/feedback.module#FeedbackModule'},
      {path: 'feedbacksave', loadChildren: './feedback/list/edit/FeedbackEdit.module#FeedbackEditModule'},
      {path: 'gaijinsave', loadChildren: './feedback/list/gaijin/GaiJinEdit.module#GaiJinEditModule'},
      {path: 'jianyidan', loadChildren: './jianyidan/jianyidan.module#JianyidanModule'},
      /**
       * 统计图身体情况路由
       */
      {path: 'statistic', loadChildren: './statistic/statistic.module#StatisticModule'},
      /**
       * 统计图谈话路由
       */
      {path: 'statistictanhua', loadChildren: './statistictanhua/statistictanhua.module#StatistictanhuaModule'}
    ]
  },
  // 全屏布局
  // {
  //     path: 'fullscreen',
  //     component: LayoutFullScreenComponent,
  //     children: [
  //     ]
  // },
  // passport
  {
    path: 'passport',
    component: LayoutPassportComponent,
    children: [
      { path: 'login', component: UserLoginComponent, data: { title: '登录', titleI18n: 'pro-login' } },
      { path: 'register', component: UserRegisterComponent, data: { title: '注册', titleI18n: 'pro-register' } },
      { path: 'register-result', component: UserRegisterResultComponent, data: { title: '注册结果', titleI18n: 'pro-register-result' } }
    ]
  },
  // 单页不包裹Layout
  { path: 'callback/:type', component: CallbackComponent },
  { path: 'lock', component: UserLockComponent, data: { title: '锁屏', titleI18n: 'lock' } },
  { path: '403', component: Exception403Component },
  { path: '404', component: Exception404Component },
  { path: '500', component: Exception500Component },
  { path: '**', redirectTo: 'dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: environment.useHash })],
  exports: [RouterModule]
})
export class RouteRoutingModule { }
