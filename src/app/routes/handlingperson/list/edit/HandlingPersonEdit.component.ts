import { Component, OnInit } from '@angular/core';
import {NzMessageService, NzI18nService, UploadFile, UploadXHRArgs} from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import {HandlingPerson} from '../../../../model/HandlingPerson';
import {registerLocaleData} from '@angular/common';
import zh from '@angular/common/locales/zh';
import {HandlingPersonService} from '../../../../services/HandlingPersonService';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FileUploadService} from '../../../../services/FileUploadService';
import {environment} from '@env/environment';
import * as moment from 'moment';
registerLocaleData(zh);
@Component({
  selector: 'app-handlingperson-save',
  templateUrl: './handlingPersonEdit.component.html',
  styleUrls: ['./handlingPersonEdit.component.css']
})
export class HandlingPersonEditComponent implements OnInit {
  // 办案人员对象
  handlingPerson: HandlingPerson = new HandlingPerson();
  title = '办案人员登记';
  validateForm: FormGroup;
  isLoading = false;
  previewImage = '';
  previewImages = [];
  previewVisible = false;
  imgUrl = environment.SERVER_URL;

  constructor(
    private msgSrv: NzMessageService, public http: _HttpClient, private msg: NzMessageService, private fb: FormBuilder,
    private i18n: NzI18nService, private router: Router, private route: ActivatedRoute,  private fileUploadService: FileUploadService,
    private handlingPersonService: HandlingPersonService,
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.title = '办案人员编辑';
      this.handlingPersonService.findHandlingPersonById(id).subscribe((res) => {
        this.handlingPerson = res;
        if (this.handlingPerson.img ) {
          this.previewImages = [
            {
              uid: Math.random(),
              name: '头像',
              status: 'done',
              url: encodeURI(this.imgUrl + this.handlingPerson.img),
            }
          ];
        }
      });
    }
    this.validateForm = this.fb.group({
      controlNo :    [ null, [ Validators.required ] ],
      applyTime:     [ null, [Validators.required] ],
      title:         [ null, [Validators.required] ],
      memberSex:     [ null, [Validators.required] ],
      age:           [ null, [Validators.required] ],
      img:           [ null, [] ],
    });
  }
   // 保存
  saveHandlingPerson() {
    this.handlingPerson.applyTime = moment(this.handlingPerson.applyTime ).format('YYYY-MM-DD').toString();
    for (const i of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }
    // if (this.validateForm.valid === true) {
      this.handlingPersonService.saveHandlingPerson(this.handlingPerson).subscribe((result) => {
        this.isLoading = false;
        if (result) {
          this.msgSrv.success('保存成功');
          this.router.navigate(['/handlingperson']);
        } else {
          this.msgSrv.error('保存失败');
        }
      });
    // }
  }
  // 点击文件链接或预览图标时的回调；注意：务必使用 => 定义处理方法。
  handlePreview = (file: UploadFile) => {
    this.previewImage = file.url || file.thumbUrl;
    this.previewVisible = true;
  }

  handleChange(info: { file: UploadFile }) {
    if (info.file.status === 'uploading') {
      return;
    }
    if (info.file.status === 'done') {
      this.handlingPerson.img = info.file.response.url;
      this.previewImages = [
        {
          uid: -1,
          name: info.file.response.name,
          status: 'done',
          url: encodeURI(this.imgUrl + info.file.response.url)
        }
      ];
    }
    if (info.file.status === 'removed') {
      this.handlingPerson.img = null;
    }
  }

  customReq = (item: UploadXHRArgs) => {
    this.fileUploadService.fileUpload(item);
  }
  // 关闭按钮
  closed() {
    this.router.navigate(['/handlingperson']);
  }


}
