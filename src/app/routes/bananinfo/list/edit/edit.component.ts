import {Component, OnInit, ViewChild} from '@angular/core';
import {NzI18nService, NzModalService, UploadFile, UploadXHRArgs} from 'ng-zorro-antd';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd';
import {ActivatedRoute, Router} from '@angular/router';
import {LienPersonnelService} from '../../../../services/LienPersonnelService';
import {LienPersonnel} from '../../../../model/LienPersonnel';
import * as moment from 'moment';
import {FileUploadService} from '../../../../services/FileUploadService';
import {environment} from '@env/environment.prod';

@Component({
  selector: 'app-bananinfoedit-list',
  templateUrl: './edit.component.html'
})
export class BananinfoEditComponent implements OnInit {
  title1: string;
  validateForm: FormGroup;
  lienPersonnel: LienPersonnel = new LienPersonnel();
  isLoading = false;
  constructor(private modalService: NzModalService, private i18n: NzI18nService, private fileUploadService: FileUploadService,
              private messageService: NzMessageService, private fb: FormBuilder,
              private router: Router, private route: ActivatedRoute, private lienPersonnelService: LienPersonnelService) {
  }
  attachmentFiles = [];
  imgUrl = environment.FILESERVER_URL;
  attachmentFilesChange(info: { file: UploadFile }) {
    if (info.file.status === 'uploading') {
      return;
    }
    if (info.file.status === 'done') {
      // console.log(this.attachmentFiles);
      if (this.lienPersonnel.wenjian === null) {
        this.lienPersonnel.wenjian = [];
      }
      this.lienPersonnel.wenjian.push({
        uid: info.file.response.uid,
        name: info.file.response.name,
        status: 'done',
        url: info.file.response.url,
        suffix: info.file.response.suffix
      });
    }
    if (info.file.status === 'removed') {
      this.lienPersonnel.wenjian = this.lienPersonnel.wenjian.filter(re => {
        return re.uid !== info.file.uid;
      });
    }
  }
  customReq = (item: UploadXHRArgs) => {
    this.fileUploadService.fileUpload(item);
  }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.title1 = '进驻编辑';
      // 获取文章
      this.lienPersonnelService.findLienPersonnelById(id).subscribe((result) => {
        console.log(result);
        this.lienPersonnel = result;
        const attachmentFiles_ = [];
        if (this.lienPersonnel.wenjian) {
          this.lienPersonnel.wenjian.forEach(file => {
            attachmentFiles_.push({
              uid: file.uid,
              name: file.name,
              status: 'done',
              url: encodeURI(this.imgUrl + file.url),
              suffix: file.suffix
            });
          });
        }
        this.attachmentFiles = attachmentFiles_;
      });
    } else {
      this.title1 = '进驻录入';
    }
    this.validateForm = this.fb.group({
      cuoShiType            : [ null, [ Validators.required ] ],
      zhuanAnName            : [ null, [ Validators.required ] ],
      roomNum            : [ null, [ Validators.required ] ],
      lzSex            : [ null, [ Validators.required ] ],
      lzMinZu            : [ null, [ Validators.required ] ],
      enterTime            : [ null, [ Validators.required ] ],
      outTime            : [ null, [ Validators.required ] ],
      daiHao            : [ null, [ Validators.required ] ],
      lzName            : [ null, [ Validators.required ] ],
      lzAge            : [ null, [ Validators.required ] ],
      lzZhiJi            : [ null, [ Validators.required ] ],
      lzQiXian            : [ null, [ Validators.required ] ],
      cbDepartment            : [ null, [ Validators.required ] ],
      telNum            : [ null, [ Validators.required ] ],
      linkman            : [ null, [ Validators.required ] ],
    });
  }
  submitForm(): void {

    console.log(this.lienPersonnel);
    for (const i of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }

    if (this.validateForm.valid === true) {
      this.lienPersonnel.createtime = moment(this.lienPersonnel.createtime).format('YYYY-MM-DD').toString();
      this.lienPersonnelService.saveLienPersonnel(this.lienPersonnel).subscribe((res) => {
        console.log(res);
        this.isLoading = false;
        if (res) {
          this.messageService.success('保存成功');
          this.router.navigate(['/lienpersonnel']);
        } else {
          this.messageService.error('保存失败');
        }
      });
    }
  }
}
