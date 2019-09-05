import { NzI18nService, NzModalRef, NzModalService, UploadFile, UploadXHRArgs } from 'ng-zorro-antd';
import { LienPersonnelService } from '../../../../services/LienPersonnelService';
import { DictionaryService } from '../../../../services/DictionaryService';
import { FileUploadService } from '../../../../services/FileUploadService';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QueryParam } from '../../../../model/page/QueryParam';
import { LienPersonnel } from '../../../../model/LienPersonnel';
import { RoomService } from '../../../../services/RoomService';
import { SanyiPage } from '../../../../model/page/SanyiPage';
import { BedService } from '../../../../services/BedService';
import { Dictionary } from '../../../../model/Dictionary';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { environment } from '@env/environment';
import { Room } from '../../../../model/Room';
import { Bed } from '../../../../model/Bed';
import * as moment from 'moment';
import { forkJoin } from 'rxjs';
import { debug } from 'util';

@Component({
  selector: 'app-lienpersonnel-edit',
  templateUrl: './lienPersonnel-edit.component.html',
})
export class LienPersonnelEditComponent implements OnInit {
  record: any = {};
  title1: string;
  validateForm: FormGroup;
  lienPersonnel: LienPersonnel = new LienPersonnel();
  isLoading = false;
  // 查民族
  dictionaryueryParam: QueryParam<Dictionary> = new QueryParam<Dictionary>();
  dictionarycontentPage: SanyiPage<Dictionary> = new SanyiPage<Dictionary>();
  // 查部门
  bumenqueryParam: QueryParam<Dictionary> = new QueryParam<Dictionary>();
  bumencontentPage: SanyiPage<Dictionary> = new SanyiPage<Dictionary>();
  // 查看护力量
  kanhuqueryParam: QueryParam<Dictionary> = new QueryParam<Dictionary>();
  kanhucontentPage: SanyiPage<Dictionary> = new SanyiPage<Dictionary>();
  // 查医护人员
  yihuqueryParam: QueryParam<Dictionary> = new QueryParam<Dictionary>();
  yihucontentPage: SanyiPage<Dictionary> = new SanyiPage<Dictionary>();
  // 房间列表
  roomData: Array<Room> = new Array<Room>();
  // 床位列表
  bedData: Array<Bed> = new Array<Bed>();
  // 门区列表 获取立方系统的房间号数组  现在又不获取了 以做备用
  // doorMunDtos: Array<DoorMunDto> = new Array<DoorMunDto>();
  constructor(private modalService: NzModalService, private i18n: NzI18nService, private fileUploadService: FileUploadService,
              private messageService: NzMessageService, private fb: FormBuilder, private dictionaryService: DictionaryService,
              private router: Router, private route: ActivatedRoute, private lienPersonnelService: LienPersonnelService,
              private modal: NzModalRef, private roomService: RoomService, private bedService: BedService) {
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
        suffix: info.file.response.suffix,
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
    this.lienPersonnel.cuoShiType = '0'; // 默认类型是留置
    /**
     * 查 民族、部门、看护力量、医护人员
     */
    this.dictionaryueryParam.query.dsId = '40289289676d0e6301676da3418a0004';
    this.dictionaryueryParam.paging = false;
    this.bumenqueryParam.query.dsId = '4028928b6781689b016782290b030001';
    this.bumenqueryParam.paging = false;
    this.kanhuqueryParam.query.dsId = '40289287684f430c01684f74cfd00003';
    this.kanhuqueryParam.paging = false;
    this.yihuqueryParam.query.dsId = '40289284692c651f01692d8c944e0000';
    this.yihuqueryParam.paging = false;
    forkJoin(this.dictionaryService.findDictionary(this.dictionaryueryParam),
      this.dictionaryService.findDictionary(this.bumenqueryParam),
      this.dictionaryService.findDictionary(this.kanhuqueryParam),
      this.dictionaryService.findDictionary(this.yihuqueryParam)).subscribe(([res1, res2, res3, res4]) => {
      this.dictionarycontentPage = res1;
      this.bumencontentPage = res2;
      this.kanhucontentPage = res3;
      this.yihucontentPage = res4;
    });
    // 获取所有的房间号列表
    const roomQuery = new QueryParam<Room>();
    roomQuery.paging = false;
    roomQuery.sort.sortName="title";
    this.roomService.findRoom(roomQuery).subscribe(res => {

      this.roomData = res.content;
    });
    // 获取所有的床位列表
    // const roomQuery = new QueryParam<Bed>();
    // roomQuery.paging = false;
    // this.roomService.findRoom(roomQuery).subscribe( res => {
    //   console.log(res);
    //   this.roomData = res.content;
    // });
    if (this.record.id) {
      this.title1 = '进驻编辑';
      // 获取文章
      this.lienPersonnelService.findLienPersonnelById(this.record.id).subscribe((result) => {
        this.lienPersonnel = result;
        const attachmentFiles_ = [];
        if (this.lienPersonnel.wenjian) {
          this.lienPersonnel.wenjian.forEach(file => {
            attachmentFiles_.push({
              uid: file.uid,
              name: file.name,
              status: 'done',
              url: encodeURI(this.imgUrl + file.url),
              suffix: file.suffix,
            });
          });
        }
        this.attachmentFiles = attachmentFiles_;
      });
    } else {
      this.title1 = '进驻录入';
    }
    // const id = this.route.snapshot.paramMap.get('id');
    // if (id) {
    //   this.title1 = '进驻编辑';
    //   // 获取文章
    //   this.lienPersonnelService.findLienPersonnelById(id).subscribe((result) => {
    //     this.lienPersonnel = result;
    //     const attachmentFiles_ = [];
    //     if (this.lienPersonnel.wenjian) {
    //       this.lienPersonnel.wenjian.forEach(file => {
    //         attachmentFiles_.push({
    //           uid: file.uid,
    //           name: file.name,
    //           status: 'done',
    //           url: encodeURI(this.imgUrl + file.url),
    //           suffix: file.suffix
    //         });
    //       });
    //     }
    //     this.attachmentFiles = attachmentFiles_;
    //   });
    // } else {
    //   this.title1 = '进驻录入';
    // }
    this.validateForm = this.fb.group({
      cuoShiType: [null, []],
      zhuanAnName: [null, []],
      roomNum: [null, [Validators.required]],
      bedNum: [null, [Validators.required]],
      lzSex: [null, []],
      lzMinZu: [null, []],
      enterTime: [null, [Validators.required]],
      outTime: [null],
      daiHao: [null, []],
      lzName: [null, []],
      lzAge: [null, []],
      lzZhiJi: [null, []],
      lzZhiWu: [null, []],
      lzDanWei: [null, []],
      lzQiXian: [null, [Validators.required]],
      cbDepartment: [null, []],
      telNum: [null, []],
      linkman: [null, []],
      birthDay: [null],
      kanhuLiLiang: [null, []],
      yihurenyuan: [null, []],
    });
    // 查看门禁系统的门区列表   需求改了，不获取立方系统的房间号了，改成保存字符串了，以作备用
    // this.lienPersonnelService.findDoorMuns(new DoorMunDto()).subscribe((result) => {
    //   this.doorMunDtos = result;
    //   this.doorMunDtos.map( (door) => {
    //     door.areaId = door.areaId.toString();
    //   });
    // });
  }

  submitForm(): void {
    for (const i of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid === true) {
      if (this.lienPersonnel.birthDay) {
        this.lienPersonnel.birthDay = moment(this.lienPersonnel.birthDay).format('YYYY-MM-DD').toString();
      }
      if (this.lienPersonnel.enterTime) {
        this.lienPersonnel.enterTime = moment(this.lienPersonnel.enterTime).format('YYYY-MM-DD').toString();
      }
      if (this.lienPersonnel.outTime) {
        this.lienPersonnel.outTime = moment(this.lienPersonnel.outTime).format('YYYY-MM-DD').toString();
      }
      this.lienPersonnelService.saveLienPersonnel(this.lienPersonnel).subscribe((res) => {
        this.isLoading = false;
        if (res) {
          this.messageService.success('保存成功');
          // this.router.navigate(['/lienpersonnel']);
          this.modal.close(true);
        } else {
          this.messageService.error('保存失败');
        }
      });
    }
  }

  // 关闭按钮
  closed() {
    this.modal.close(true);
  }

  // 选择某一个房间触发的change事件
  selectRoomChange(event: any) {
    const bedQuery = new QueryParam<Bed>();
    bedQuery.paging = false;
    bedQuery.query.roomId = event;
    this.bedService.findBed(bedQuery).subscribe( res => {
      this.bedData = res.content;
      const list = this.bedData.filter( bed => {
        return bed.id === this.lienPersonnel.bedNum;
      });
      if (list.length <= 0) {
        this.lienPersonnel.bedNum = undefined;
      }
    });
  }

}
