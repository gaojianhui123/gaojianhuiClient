import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {NzModalService} from 'ng-zorro-antd';
import {NzMessageService} from 'ng-zorro-antd';
import {Router} from '@angular/router';
import {QueryParam} from '../../../model/page/QueryParam';
import {Role} from '../../../model/Role';
import {SanyiPage} from '../../../model/page/SanyiPage';
import {RoleService} from '../../../services/RoleService';


@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  basicTableLoading = true;
  expandDataCache = {};
  rolequeryParam: QueryParam<Role> = new QueryParam<Role>();
  rolecontentPage: SanyiPage<Role> = new SanyiPage<Role>();

  title1: string;
  isVisible = false;
  eris = [];
  constructor(private router: Router, private fb: FormBuilder,
              private roleService: RoleService, private messageService: NzMessageService, private modalService: NzModalService) {

  }

  ngOnInit() {
    this.queryContents();
  }

  // 查角色表
  queryContents(reset: boolean = false) {
    if (reset) {
      this.rolequeryParam.page.currentPage  = 1;
    }
    this.basicTableLoading = true;
    this.roleService.findRole(this.rolequeryParam).subscribe( (result) => {
      this.rolecontentPage = result;
      this.basicTableLoading = false;
      if (!event) {
        console.log('共计查询' + result.totalElements + '条记录');
      }
    }, err => {
      console.log('查询失败！', '请联系管理员！' + err.message, 'error');

    });
  }






  showModal(): void {
    this.router.navigate(['/rolesave']);
  }

  EditRole(data): void {
    // console.log(data);
    this.router.navigate(['/rolesave', {id: data.id}]);
  }

  deletedRole(data): void {
    this.modalService.confirm({
      nzTitle     : '确定要删除 ' + data.title + ' 角色？',
      nzContent   : '<b style="color: #ff0000;">删除后将不可恢复！</b>',
      nzOkText    : '确定',
      nzOkType    : 'danger',
      nzOnOk      : () => {
        this.roleService.deleteRole(data).subscribe(res => {
          if (res.errorMsg) {
            this.messageService.error('删除失败！该角色已被使用！');
          } else {
            this.messageService.success('删除成功');
            this.queryContents();
          }
        });
      },
      nzCancelText: '取消',
      nzOnCancel  : () => console.log('Cancel')
    });
  }

}
