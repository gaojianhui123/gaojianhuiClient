import { Component } from '@angular/core';
import {NzMessageService, NzNotificationService} from 'ng-zorro-antd';
import {MenuService, SettingsService} from '@delon/theme';
import {Subscription} from 'rxjs';
import {NurseService} from '../../../services/NurseService';
import { User } from '../../../model/User';
import { TanhuashenqingService } from '../../../services/TanhuashenqingService';
import { QueryParam } from '../../../model/page/QueryParam';
import { Tanhuashenqing } from '../../../model/Tanhuashenqing';
import { LienPersonnelService } from '../../../services/LienPersonnelService';
import { LienPersonnelBzDto } from '../../../model/LienPersonnelBzDto';

@Component({
  selector: 'layout-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  private subscription: Subscription;
  public message: string;
  currentUser: User;
  isJiDiUserFlag = false; // 当前用户是否为基地用户标识
  isCanYinUserFlag = false; // 当前用户是否为餐饮用户标识
  isKanHuUserFlag = false; // 当前用户是否为看护用户标识
  isBanAnUserFlag = false; // 当前用户是否为办案用户标识
  isAnGuanUserFlag = false; // 当前用户是否为案管用户标识
  constructor(
    public settings: SettingsService,
    public msgSrv: NzMessageService,
    private menuService: MenuService,
    private messageService: NzMessageService,
    private notification: NzNotificationService,
    private nurseService: NurseService,
    private tanhuashenqingService: TanhuashenqingService,
    private lienPersonnelService: LienPersonnelService,
  ) {
    this.currentUser = this.nurseService.getCurrentUser();
    this.currentUser.roles.forEach(role => {
      switch (role.title) {
        case '基地角色':
          // 如果是基地角色查询谈话和保障审批是否有待审批的
          const queryParam = new QueryParam<Tanhuashenqing>();
          queryParam.paging = false;
          this.tanhuashenqingService.findTanhuashenqing(queryParam).subscribe((res) => {
            if (res) {
              if (res.content.filter( (r) =>   r.shenpiStatus === '0').length > 0) {
                  this.tanHuaShenPi();
              }
            }
          });
          const query = new QueryParam<LienPersonnelBzDto>();
          query.paging = false;
          this.lienPersonnelService.selectLienPersonnelJoinBz(query).subscribe( (result) => {
            if (result) {
              if (result.content.filter( (r) =>   r.applyStatus === '1').length > 0) {
                this.baoZhangShenPi();
              }
            }
          });
          break;
        case '餐饮角色':
          console.log('说明是餐饮用户');
          break;
        case '看护角色':
          console.log('说明是看护用户');
          break;
        case '办案角色':
          console.log('说明是办案用户');
          break;
        case '案管角色':
          console.log('说明是安管用户');
          break;
      }
      // r.protectedResources.forEach(p => {
        // // 40289286675d9b2b01675e13989d0000 为进驻管理菜单权限的id 40289286675d9b2b01675e155e960001进驻登记
        // if (p.id === '40289286675d9b2b01675e155e960001') {
        //   this.isJiDiUserFlag = true;
        //   console.log('说明是基地用户');
        // }
        // if (p.id === '4028928a675da89601675db57d210002') { // 4028928a675da89601675db57d210002 为餐饮管理菜单权限的id
        //   this.isCanYinUserFlag = true;
        //   console.log('说明是餐饮用户');
        // }
        // if (p.id === '402892836754594a016755047b2c0000') { //  402892836754594a016755047b2c0000为看护管理菜单权限的id
        //   this.isKanHuUserFlag = true;
        //   console.log('说明是看护用户');
        // }
        // if (p.id === '40289283675da0c501675e52e9cf0004') { //  402892836754594a016755047b2c0000为办案管理菜单权限的id
        //   this.isBanAnUserFlag = true;
        //   console.log('说明是办案用户');
        // }
        // if (p.id === '40289287676024810167606fd1740003') { //  402892836754594a016755047b2c0000为安管管理菜单权限的id
        //   this.isAnGuanUserFlag = true;
        //   console.log('说明是安管用户');
        // }
      // });
    });
    // 当前用户是基地用户
    // if (this.isJiDiUserFlag) {
    //   this.subscription = this._mqttService.observe('BZSQalert').subscribe((message: IMqttMessage) => {
    //     // this.message = message.payload.toString();
    //     this.createBasicNotification3();
    //   });
    //   this.subscription = this._mqttService.observe('THQXSQalert').subscribe((message: IMqttMessage) => {
    //     // this.message = message.payload.toString();
    //     this.createBasicNotification2();
    //   });
    // }
    // 判断当前用户是餐饮用户
    // if (this.isCanYinUserFlag) {
    //   this.subscription = this._mqttService.observe('BZalert').subscribe((message: IMqttMessage) => {
    //     // this.message = message.payload.toString();
    //     this.createBasicNotification();
    //   });
    // }
    // 判断当前用户是看护用户
    // if (this.isKanHuUserFlag) {
    //   this.subscription = this._mqttService.observe('THalert' + this.currentUser.kanhuId).subscribe((message: IMqttMessage) => {
    //     // this.message = message.payload.toString();
    //     this.createBasicNotification1();
    //   });
    // }
    // 判断当前用户是否为办案用户
    // if (this.isBanAnUserFlag) {
    //   this.subscription = this._mqttService.observe('FYWTalert' + this.currentUser.bumenId).subscribe((message: IMqttMessage) => {
    //     // this.message = message.payload.toString();
    //     this.createBasicNotification4();
    //   });
    // }
    // 判断当前用户是否为安管用户
    // if (this.isAnGuanUserFlag) {
    //   this.subscription = this._mqttService.observe('GJWTalert').subscribe((message: IMqttMessage) => {
    //     // this.message = message.payload.toString();
    //     this.createBasicNotification5();
    //   });
    // }
  }

  // 餐饮管理
  canYinGuanLi(): void {
    this.notification.blank( '您好！', '新到审批通过的的保障申请，请到餐饮管理下的查看保障申请菜单查看。', { nzDuration: 0 });
  }
  // 看护管理
  kanHuGuanLi(): void {
    this.notification.blank( '您好！', '新到审批通过的谈话申请，请到看护管理下的谈话名单查询菜单查看。', { nzDuration: 0 });
  }
  // 进驻管理  --> 谈话审批
  tanHuaShenPi(): void {
    this.notification.blank( '您好！', '新到需要审批的谈话申请，请到进驻管理下的谈话审批菜单查看。', { nzDuration: 0 });
  }
  // 进驻管理  --> 保障审批
  baoZhangShenPi(): void {
    this.notification.blank( '您好！', '新到需要审批的保障申请，请到进驻管理下的保障审批菜单查看。', { nzDuration: 0 });
  }
  // 办案管理  --> 问题反馈
  wenTiFanKui(): void {
    this.notification.blank( '您好！', '新到一条问题反馈，请到办案管理下的查看工作改进建议单菜单查看。', { nzDuration: 0 });
  }
  // 改进情况
  gaiJinQingKuang(): void {
    this.notification.blank( '您好！', '新到一条消息，改进情况已完成。', { nzDuration: 0 });
  }
}
