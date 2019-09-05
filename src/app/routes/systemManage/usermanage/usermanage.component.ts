import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {SystemService} from '../../../services/SystemService';
import {QueryParam} from '../../../model/page/QueryParam';
import {SanyiPage} from '../../../model/page/SanyiPage';
import { Component, OnInit } from '@angular/core';
import {User} from '../../../model/User';
import {Router} from '@angular/router';
@Component({
  selector: 'app-usermanage',
  templateUrl: './usermanage.component.html',
  styleUrls: ['./usermanage.component.css']
})
export class UsermanageComponent implements OnInit {
  queryParam: QueryParam<User> = new QueryParam<User>();
  contentPage: SanyiPage<User> = new SanyiPage<User>();
  basicTableLoading = true;
  currentUser: User;
  constructor(private systemService: SystemService, private messageService: NzMessageService,
              private modalService: NzModalService, private router: Router, ) {
    this.currentUser = systemService.getCurrentUser();
    this.queryParam.query.isadmin = true;
    this.queryParam.query.juweihui = this.currentUser.juweihui;
  }

  queryContents(reset: boolean = false) {
    if (reset) {
      this.queryParam.page.currentPage  = 1;
    }
    this.queryParam.query.juweihui = this.currentUser.juweihui;
    this.basicTableLoading = true;
    this.systemService.findUsers(this.queryParam).subscribe( (result) => {
      this.contentPage = result;
      this.basicTableLoading = false;
    });
  }
  ngOnInit(): void {
    this.queryContents();
  }
  changeStatus(user) {
    if (user.buildinadmin) {
      this.modalService.info({
        nzTitle: '禁用失败',
        nzContent: user.title + ' 是内置用户，不能被禁用！',
        nzOnOk      : () => {user.enabled = true;
        }
      });
    } else {
      user.statusChanging = true;
      user.enabled = !user.enabled;
      this.systemService.changeEnabled(user).subscribe( res => {
        user.statusChanging = false;
      });
    }
  }
  // 删除用户
  deleteUser(user: User) {
    if (user.buildinadmin) {
      this.modalService.info({
        nzTitle: '删除失败',
        nzContent: user.title + ' 是内置用户，不能被删除！'
      });
    } else {
      this.modalService.confirm({
        nzTitle     : '确定要删除 ' + user.title + ' 用户？',
        nzContent   : '<b style="color: #ff0000;">删除后将不可恢复！</b>',
        nzOkText    : '确定',
        nzOkType    : 'danger',
        nzOnOk      : () => {
          this.systemService.deleteUser(user).subscribe(res => {
            this.messageService.success('删除成功');
            this.queryContents();
          });
        },
        nzCancelText: '取消',
        nzOnCancel  : () => console.log('Cancel')
      });
    }
  }
  // 跳转到编辑页面
  editUser(user: User = new User('null')) {
    this.router.navigate(['/useredit', user.id]);
  }
  // 重置密码
  resetPassword(user: User) {
    this.systemService.resetPassword(user).subscribe(res => {
      this.messageService.success('重置密码成功，密码为111111');
    });
  }

}
