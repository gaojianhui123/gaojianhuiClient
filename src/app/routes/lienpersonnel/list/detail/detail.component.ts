import {Component, OnInit, ViewChild} from '@angular/core';
import {NzI18nService, NzModalService, UploadFile, UploadXHRArgs} from 'ng-zorro-antd';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd';
import {ActivatedRoute, Router} from '@angular/router';
import {LienPersonnelService} from '../../../../services/LienPersonnelService';
import {LienPersonnel} from '../../../../model/LienPersonnel';
import * as moment from 'moment';
import {FileUploadService} from '../../../../services/FileUploadService';
import {HealthService} from '../../../../services/HealthService';
import {QueryParam} from '../../../../model/page/QueryParam';
import {Health} from '../../../../model/Health';
import { Dictionary } from '../../../../model/Dictionary';
import { SanyiPage } from '../../../../model/page/SanyiPage';
import { DictionaryService } from '../../../../services/DictionaryService';
import { environment } from '@env/environment';
import { RoomService } from '../../../../services/RoomService';
import { BedService } from '../../../../services/BedService';

@Component({
  selector: 'app-lienpersonnel-detail',
  templateUrl: './detail.component.html',
})

export class LienpersonnelDetailComponent implements OnInit {
  daohang = '/lienpersonnel';
  biaoti = '进驻登记';
  title: string;
  title1: string;
  validateForm: FormGroup;
  lienPersonnel: LienPersonnel = new LienPersonnel();
  isLoading = false;
  id: any;
  jzId: string;
  queryParams: QueryParam<Health> = new QueryParam<Health>();
  health: Health = new Health();
  lzSexName: string;
  dictionaryueryParam: QueryParam<Dictionary> = new QueryParam<Dictionary>();
  dictionarycontentPage: SanyiPage<Dictionary> = new SanyiPage<Dictionary>();
  // 查部门
  bumenqueryParam: QueryParam<Dictionary> = new QueryParam<Dictionary>();
  bumencontentPage: SanyiPage<Dictionary> = new SanyiPage<Dictionary>();
  // 查看护力量
  kanhuqueryParam: QueryParam<Dictionary> = new QueryParam<Dictionary>();
  kanhucontentPage: SanyiPage<Dictionary> = new SanyiPage<Dictionary>();
  // 查看医护人员
  yihuqueryParam: QueryParam<Dictionary> = new QueryParam<Dictionary>();
  yihucontentPage: SanyiPage<Dictionary> = new SanyiPage<Dictionary>();
  constructor(private modalService: NzModalService, private i18n: NzI18nService, private fileUploadService: FileUploadService,
              private messageService: NzMessageService, private fb: FormBuilder, private healthService: HealthService,
              private router: Router, private route: ActivatedRoute, private lienPersonnelService: LienPersonnelService,
              private dictionaryService: DictionaryService, private roomService: RoomService,private bedService: BedService) {
  }
  attachmentFiles = [];
  imgUrl = environment.FILESERVER_URL;
  attachmentFilesChange(info: { file: UploadFile }) {
    if (info.file.status === 'uploading') {
      return;
    }
    if (info.file.status === 'done') {
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
    // 查民族
    this.dictionaryueryParam.query.dsId = '40289289676d0e6301676da3418a0004';
    this.dictionaryueryParam.paging = false;
    this.dictionaryService.findDictionary(this.dictionaryueryParam).subscribe((result) => {
      this.dictionarycontentPage = result;
    });
    // 查部门
    this.bumenqueryParam.query.dsId = '4028928b6781689b016782290b030001';
    this.bumenqueryParam.paging = false;
    this.dictionaryService.findDictionary(this.bumenqueryParam).subscribe((result) => {
      this.bumencontentPage = result;
    });
    // 查看护
    this.kanhuqueryParam.query.dsId = '40289287684f430c01684f74cfd00003';
    this.kanhuqueryParam.paging = false;
    this.dictionaryService.findDictionary(this.kanhuqueryParam).subscribe((result) => {
      this.kanhucontentPage = result;
    });
    // 查医护
    this.yihuqueryParam.query.dsId = '40289284692c651f01692d8c944e0000';
    this.yihuqueryParam.paging = false;
    this.dictionaryService.findDictionary(this.yihuqueryParam).subscribe((result) => {
      this.yihucontentPage = result;
    });
    this.id = this.route.snapshot.paramMap.get('id');
    this.title = this.route.snapshot.paramMap.get('title');
    if (this.title === '办案管理') {
      this.daohang = '/bananinfo';
      this.biaoti = '留置人员信息查询';
    }
    this.jzId = this.id;
    if (this.id) {
      this.title1 = '进驻编辑';
      // 获取文章
      this.lienPersonnelService.findLienPersonnelById(this.id).subscribe((result) => {
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
        if (this.lienPersonnel.roomNum) { // 房间
          this.roomService.getRoomById(this.lienPersonnel.roomNum).subscribe( res => {
            this.lienPersonnel.roomNumName = res.title;
          });
        }
        if (this.lienPersonnel.bedNum) { //床位
          this.bedService.getBedById(this.lienPersonnel.bedNum).subscribe( res => {
            this.lienPersonnel.bedNumName = res.title;
          });
        }
        this.attachmentFiles = attachmentFiles_;
        this.queryParams.query.lpId = this.id;
        this.queryParams.query.status = '1';
        this.healthService.findHealths(this.queryParams).subscribe(res => {
          if (res.content[0]) {
            this.health = res.content[0];
          }
        });
      });
    } else {
      this.title1 = '进驻录入';
    }
    // this.validateForm = this.fb.group({
    //   cuoShiType            : [ null, [ Validators.required ] ],
    //   zhuanAnName            : [ null, [ Validators.required ] ],
    //   roomNum            : [ null, [ Validators.required ] ],
    //   lzSex            : [ null, [ Validators.required ] ],
    //   lzMinZu            : [ null, [ Validators.required ] ],
    //   enterTime            : [ null, [ Validators.required ] ],
    //   outTime            : [ null, [ Validators.required ] ],
    //   daiHao            : [ null, [ Validators.required ] ],
    //   lzName            : [ null, [ Validators.required ] ],
    //   lzAge            : [ null, [ Validators.required ] ],
    //   lzZhiJi            : [ null, [ Validators.required ] ],
    //   lzQiXian            : [ null, [ Validators.required ] ],
    //   cbDepartment            : [ null, [ Validators.required ] ],
    //   telNum            : [ null, [ Validators.required ] ],
    //   linkman            : [ null, [ Validators.required ] ],
    //   yihurenyuan            : [ null, [ Validators.required ] ]
    // });
  }
  submitForm(): void {

    for (const i of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }

    if (this.validateForm.valid === true) {
      this.lienPersonnel.createtime = moment(this.lienPersonnel.createtime).format('YYYY-MM-DD').toString();
      this.lienPersonnelService.saveLienPersonnel(this.lienPersonnel).subscribe((res) => {
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
