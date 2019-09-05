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
  selector: 'app-userinfor',
  templateUrl: './userinfor.component.html',
  styleUrls: ['./userinfor.component.css']
})

export class UserinforComponent  implements OnInit, AfterViewInit {
  // disable: boolean = false;
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
  constructor(private route: ActivatedRoute, private router: Router,
              private systemService: SystemService, private messageService: NzMessageService, private roleService: RoleService,
              private fileUploadService: FileUploadService, private modalService: NzModalService,
              private dictionaryService: DictionaryService ) {
    this.currentUser = systemService.getCurrentUser();
  }

  ngOnInit(): void {
    // 查部门
    this.dictionaryueryParam.query.dsId = '4028928b6781689b016782290b030001';
    this.dictionaryueryParam.query.id = this.user.bumenId;
    this.dictionaryueryParam.paging = false;
    // this.dictionaryueryParam.query.isadmin = true;
    this.dictionaryService.findDictionary(this.dictionaryueryParam).subscribe((result) => {
      this.dictionarycontentPage = result;
    });
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== 'null') {
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
        // // 判断/role是否存在,当前用户是否可以对角色进行修改
        // if ( this.user.roles) {
        //   this.user.roles.forEach(r => {
        //     if ((r.protectedResources.filter(res => { return res.url === '/role'; })).length <= 0) {
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


}
