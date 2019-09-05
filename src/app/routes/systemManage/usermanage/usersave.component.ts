import {AfterViewInit, Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
// import {Observable} from 'rxjs';
import {NzModalService} from 'ng-zorro-antd';
import {UploadFile, UploadXHRArgs} from 'ng-zorro-antd/upload';
// import {HttpClient, HttpEvent, HttpEventType, HttpRequest, HttpResponse} from '@angular/common/http';
// import { forkJoin } from 'rxjs';
import {NzMessageService} from 'ng-zorro-antd';
import {finalize} from 'rxjs/internal/operators';
import {User} from '../../../model/User';
import { environment } from '@env/environment';
import {QueryParam} from '../../../model/page/QueryParam';
import {Role} from '../../../model/Role';
import {SanyiPage} from '../../../model/page/SanyiPage';
import {SystemService} from '../../../services/SystemService';
import {RoleService} from '../../../services/RoleService';
import {FileUploadService} from '../../../services/FileUploadService';
import {Dictionary} from '../../../model/Dictionary';
import {DictionaryService} from '../../../services/DictionaryService';

@Component({
  selector: 'app-usersave',
  templateUrl: './usersave.component.html',
  styleUrls: ['./usersave.component.scss']
})

export class UsersaveComponent  implements OnInit, AfterViewInit {
  flag = false;
  title: string;
  disable = false;
  user: User = new User();
  fileUploadUrl = environment.FILEUPLOAD_URL;
  imgUrl = environment.FILESERVER_URL;
  previewVisible = false;
  isConfirmLoading = true;
  previewImage = '';
  previewImages = [
    // {
    //   uid: -1,
    //   name: 'xxx.png',
    //   status: 'done',
    //   url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png'
    // }
  ];
  nzOptions = [];
  values =  [];
  currentUser: User;
  rolequeryParam: QueryParam<Role> = new QueryParam<Role>();
  rolecontentPage: SanyiPage<Role> = new SanyiPage<Role>();
  dictionaryueryParam: QueryParam<Dictionary> = new QueryParam<Dictionary>();
  dictionarycontentPage: SanyiPage<Dictionary> = new SanyiPage<Dictionary>();
  // 查看护力量
  kanhuqueryParam: QueryParam<Dictionary> = new QueryParam<Dictionary>();
  kanhucontentPage: SanyiPage<Dictionary> = new SanyiPage<Dictionary>();
  // 查医护人员
  yihuqueryParam: QueryParam<Dictionary> = new QueryParam<Dictionary>();
  yihucontentPage: SanyiPage<Dictionary> = new SanyiPage<Dictionary>();
  constructor(private route: ActivatedRoute, private router: Router,
              private systemService: SystemService, private messageService: NzMessageService, private roleService: RoleService,
              private fileUploadService: FileUploadService, private modalService: NzModalService,
              private dictionaryService: DictionaryService ) {
    this.currentUser = systemService.getCurrentUser();
    // this.values.push(this.currentUser.proviceid);
    // this.values.push(this.currentUser.cityid);
    // this.values.push(this.currentUser.districtid);
    // this.values.push(this.currentUser.juweihui.id);
  }

  ngOnInit(): void {
    // const modal = this.modalService.info({
    //   nzTitle: '网络加载中...',
    //   nzContent: '正在加载中，请稍后！',
    //   nzOkText: null
    // });
    // 查部门
     this.dictionaryueryParam.query.dsId = '4028928b6781689b016782290b030001';
    this.dictionaryueryParam.paging = false;
    this.dictionaryService.findDictionary(this.dictionaryueryParam).subscribe((result) => {
      this.dictionarycontentPage = result;
    });
    // 查看护力量
    this.kanhuqueryParam.query.dsId = '40289287684f430c01684f74cfd00003';
    this.kanhuqueryParam.paging = false;
    this.dictionaryService.findDictionary(this.kanhuqueryParam).subscribe((result) => {
      this.kanhucontentPage = result;
    });
    // 查医护人员
    this.yihuqueryParam.query.dsId = '40289284692c651f01692d8c944e0000';
    this.yihuqueryParam.paging = false;
    this.dictionaryService.findDictionary(this.yihuqueryParam).subscribe((result) => {
      debugger;
      this.yihucontentPage = result;

    });
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    if (id !== 'null') {
      // console.log('走这里吗');
      // this.flag = true;
      this.title = '修改用户信息';
      this.systemService.getUserById(id).subscribe(user => {
        this.user = user;
        // console.log(this.user);
        this.isConfirmLoading = false;
        if (this.user.img) {
          this.previewImages = [
            {
              uid: -1,
              name: '图像',
              status: 'done',
              url: encodeURI(this.imgUrl + this.user.img)
            }
          ];
        }
        // 判断/role是否存在,当前用户是否可以对角色进行修改
        // if ( this.user.roles) {
        //   this.user.roles.forEach(r => {
        //     if ((r.protectedResources.filter((res) =>  res.url === '/role')).length <= 0) {
        //       // console.log('-----------------888888888888888888888888------------');
        //       this.disable = true;
        //     } else {
        //       // console.log('-----------------aaaaaaaaaaaaaaaaaaaaaaaaaa------------');
        //       this.disable = false;
        //     }
        //   });
        // }
      });
    } else {
      this.title = '新增用户信息';
      this.user = new User();
      this.user.isadmin = true;
      this.isConfirmLoading = false;
    }

    this.roleService.findRole(this.rolequeryParam).subscribe( (result) => {
      this.rolecontentPage = result;
      // console.log(result);
    });

  }
  compareFn = (o1: any, o2: any) => o1 && o2 ? o1.id === o2.id : o1 === o2;
  ngAfterViewInit() {

  }

  saveUser() {
    if (this.user.username === undefined || this.user.username === null || this.user.username.trim() === '') {
      this.modalService.info({
        nzTitle: '用户名不能为空',
        nzContent: ' 用户名不能为空',
      });
      return;
    }
    this.user.juweihui = this.currentUser.juweihui;
    // this.user.proviceid = this.currentUser.proviceid;
    // this.user.cityid = this.currentUser.cityid;
    // this.user.districtid = this.currentUser.districtid;
    this.isConfirmLoading = true;
    this.systemService.saveUser(this.user).pipe(finalize(() => this.isConfirmLoading = false)).subscribe(res => {
      this.messageService.success('保存成功');
      this.router.navigate(['/usermanage']);
    });
  }
  // public onChanges(values: any): void {
  //   this.user.proviceid = values[0];
  //   this.user.cityid = values[1];
  //   this.user.districtid = values[2];
  //   this.user.juweihuiid = values[3];
  //   console.log(values, this.values);
  // }

  handleChange(info: { file: UploadFile }) {
    if (info.file.status === 'uploading') {
      this.isConfirmLoading = true;
      return;
    }
    if (info.file.status === 'done') {
      this.isConfirmLoading = false;
      this.user.img = info.file.response.url;

    }
    if (info.file.status === 'removed') {
      this.user.img = null;
    }
  }

  handlePreview = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  }

  customReq = (item: UploadXHRArgs) => {
    this.fileUploadService.fileUpload(item);
  }

  // 关闭按钮
  closed() {
    this.router.navigate(['/usermanage']);
  }
}
