import { Component, OnInit, ViewChild } from '@angular/core';
import { NzMessageService, NzModalService, NzI18nService, NzTableComponent } from 'ng-zorro-antd';
import { TanhuashenqingService } from '../../../../services/TanhuashenqingService';
import { environment } from '@env/environment';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Tanhuashenqing } from '../../../../model/Tanhuashenqing';
import { EntranceGuardStaffDto } from '../../../../model/dto/entranceGuardStaffDto';
import { CardInfoDtos } from '../../../../model/dto/CardInfoDtos';
import { HandlingPersonService } from '../../../../services/HandlingPersonService';
import { DictionaryService } from '../../../../services/DictionaryService';
import { ActivatedRoute, Router } from '@angular/router';
import { LienPersonnelService } from '../../../../services/LienPersonnelService';
import { NurseService } from '../../../../services/NurseService';
import { LienPersonnelTanHuaRelate } from '../../../../model/LienPersonnelTanHuaRelate';
import * as moment from 'moment';
import { Nurse } from '../../../../model/Nurse';
import { LienPersonnelTanHuaRelateService } from '../../../../services/LienPersonnelTanHuaRelateService';
import { UUID } from 'angular2-uuid';
import groupArray from 'group-array';

@Component({
  selector: 'app-talklist-list-view',
  templateUrl: './view.component.html',
})
export class TalklistListViewComponent implements OnInit {
  @ViewChild('smallTable') smallTable: NzTableComponent;
  @ViewChild('basicTable') basicTable: NzTableComponent;
  lpRelateEdit: LienPersonnelTanHuaRelate = new LienPersonnelTanHuaRelate(); // 编辑框的 谈话记录 对象
  lienPersonnelTanHuaRelate: LienPersonnelTanHuaRelate = new LienPersonnelTanHuaRelate(); // 点击添加时弹出来的谈话记录对应的model
  lPTanHuaRelateList: Array<LienPersonnelTanHuaRelate> = new Array<LienPersonnelTanHuaRelate>(); // 父集谈话记录数据
  lPTanHuaRelateListOfChild: Array<LienPersonnelTanHuaRelate> = new Array<LienPersonnelTanHuaRelate>(); // 子级谈话记录数据
  lPTanHuaRelateListOfChildGroup: Array<Array<LienPersonnelTanHuaRelate>> = new Array<Array<LienPersonnelTanHuaRelate>>(); // 子级谈话记录数据
  dateMode = 'time'; // 模态框里的时间控件的属性
  isVisible = false; // 是否打开模态框的标识
  isVisibleRemark = false; // 是否打开备注模态框的标识
  isVisibleTanHua = false; // 是否打开模态框的标识
  lipRemark: LienPersonnelTanHuaRelate = new LienPersonnelTanHuaRelate(); // 备注 那块需要的对象
  nurse: Nurse = new Nurse();
  photourl = environment.photo_URL; // 立方人员图片url
  isDukaLoading = false; // 读卡loading
  title1 = '';
  daiHao = ''; // 代号
  buMen = '';  // 部门
  kaHao: any;  // 读卡时的卡号
  renyuanxinxi: Array<CardInfoDtos> = new Array<CardInfoDtos>();
  validateForm: FormGroup;
  tanhuashenqing: Tanhuashenqing = new Tanhuashenqing();
  isLoading = false;
  currentUser: any; // 当前用户
  cardInfoDtoQuery: CardInfoDtos = new CardInfoDtos();
  id: any; // 参数：  申请id
  /**
   * 读卡器
   */
  MR: any; // 读卡器控件对象
  lastFinger: any;

  constructor(private modalService: NzModalService, private i18n: NzI18nService, private handlingPersonService: HandlingPersonService,
              private messageService: NzMessageService, private fb: FormBuilder, private dictionaryService: DictionaryService,
              private router: Router, private route: ActivatedRoute, private nurseService: NurseService,
              private lienPersonnelService: LienPersonnelService, private tanhuashenqingService: TanhuashenqingService,
              private lienPersonnelTanHuaRelateService: LienPersonnelTanHuaRelateService) {
    this.currentUser = this.lienPersonnelService.getCurrentUser();
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.title1 = '谈话信息查看';
      this.tanhuashenqingService.findTanhuashenqingById(this.id).subscribe((result) => {
        this.tanhuashenqing = result;
        if (this.tanhuashenqing.lpId) {
          this.lienPersonnelService.findLienPersonnelById(this.tanhuashenqing.lpId).subscribe(res => {
            this.daiHao = res.daiHao;
          });
        }
        if (this.tanhuashenqing.bumen) {
          this.dictionaryService.getDictionaryById(this.tanhuashenqing.bumen).subscribe(res => {
            this.buMen = res.dicName;
          });
        }
        if (this.tanhuashenqing.renyuan) {
          this.tanhuashenqing.renyuan.forEach(r => {
            const cardInfoDtoQuery = new CardInfoDtos();
            cardInfoDtoQuery.employeeId = r;
            this.handlingPersonService.findCardInfoDtos(cardInfoDtoQuery).subscribe(res => {
              this.renyuanxinxi.push(res);
              // @ts-ignore // 排序
              this.renyuanxinxi.sort((a, b) => a.employeeId - b.employeeId);
            });
          });
        }
        // 根据谈话申请id找到谈话记录表对象（nurse）
        this.nurseService.findNurseByTanHuaShenQingId(this.id).subscribe(res => {
          console.log(res);
          if (res) {
            this.nurse = res;
          } else {
            const newNurse = new Nurse();
            newNurse.tanHuaShenQingId = this.tanhuashenqing.id; // 谈话申请的id
            newNurse.lienPersonnelid = this.tanhuashenqing.lpId; // 留置人id
            newNurse.nursePower = this.lienPersonnelService.getCurrentUser().kanhuId; // 看护力量
            newNurse.submitTime = moment(new Date()).format('YYYY-MM-DD'); // 填报时间
            console.log('滚出来', newNurse);
            this.nurseService.saveNurse(newNurse).subscribe(res1 => {
              console.log('啦啦啦啦啦啦啦啦啦啦啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊', res1);
              this.nurse = res1;
            });
          }
          // 根据nurseId 查询谈话记录表列表
          this.lienPersonnelTanHuaRelateService.findLPTanHuaRelateByNurseId(this.nurse.id).subscribe(res1 => {
            console.log(res1);
            this.lPTanHuaRelateList = new Array<LienPersonnelTanHuaRelate>(); // 合成的父集数据
            this.lPTanHuaRelateListOfChild = res1; // 子级数据
            this.lPTanHuaRelateListOfChildGroup = new Array<Array<LienPersonnelTanHuaRelate>>();
            const jsonGroup = groupArray(this.lPTanHuaRelateListOfChild, 'ciShu');
            // tslint:disable-next-line:forin
            for (const p in jsonGroup) { // 遍历json对象的每个key/value对,p为key
              this.lPTanHuaRelateListOfChildGroup.push(jsonGroup[p]);
            }
            this.myFunction();
          });
        });
      });
    }
    this.validateForm = this.fb.group({
      daiHao: [],
      bumen: [],
      renyuan: [],
    });
    // 初始化，连接发卡器。固定使用串口 0
    this.initPort();
  }

  // 初始化，连接发卡器。固定使用串口 0
  initPort() {
    try {
      if (this.MR == null) {
        this.MR = document.getElementById('MReader');
      }
      if (this.MR != null) {
        const ret = this.MR.OnIniCom(0);
        this.messageService.success('读卡器初始化加载完毕！');
      }
    } catch (e) {
      this.messageService.error('读卡器初始化失败！');
    }
    return -1;
  }

  connect_card() {
    try {
      if (this.MR == null) {
        this.MR = document.getElementById('MReader');
      }
      if (this.MR != null) {
        this.MR.RS_SetSingAndBlink(1, 1);
        this.kaHao = this.MR.RS_ReadSerial('0', 3);
        this.isDukaLoading = true;
        const entranceGuardStaffDto = new EntranceGuardStaffDto();
        entranceGuardStaffDto.serial = this.kaHao;
        this.handlingPersonService.getemplybyserial(entranceGuardStaffDto).subscribe(res => {
          this.cardInfoDtoQuery = res; // 根据ic卡 序列号 找到的人员信息对象
          if (this.cardInfoDtoQuery) {
            const reyuanList = this.renyuanxinxi.filter(r => {
              return r.employeeId === this.cardInfoDtoQuery.employeeId;
            });
            if (reyuanList.length > 0) { // 判断在申请列表的人员中是否有读出来的这个人 有则验证成功
              // 把读卡出来的那个放在数组的最前面 做个排序 让操作人员永远都在最一个看到是不是读卡的那个
              const a = this.renyuanxinxi.filter(r1 => r1.employeeId === this.cardInfoDtoQuery.employeeId);
              const other = this.renyuanxinxi.filter(r2 => r2.employeeId !== this.cardInfoDtoQuery.employeeId);
              this.renyuanxinxi = [];
              this.renyuanxinxi = [...a, ...other];
              this.messageService.success('读卡匹配成功!');
              const child = new LienPersonnelTanHuaRelate();
              child.tanHuaRenNo = res.employeeId;
              child.tanHuaRen = res.employeeName;
              this.updatelPTanHuaRelateListOfChild(child);
              this.isDukaLoading = false;
            } else {
              this.isDukaLoading = false;
              this.messageService.error('对不起此人不在人员名单内不能通过!');
            }
          } else {
            this.isDukaLoading = false;
            this.messageService.error('对不起此卡未绑到任何人员!');
          }
        });
      }
    } catch (e) {
      this.isDukaLoading = false;
      this.messageService.error('读卡器加载失败!');
    }
  }

  // 连接卡，相当于读卡号
  connect_card2() {
    this.isDukaLoading = true;
    // try {
    //   if (this.MR == null) {
    //     this.MR = document.getElementById('MReader');
    //   }
    //   if (this.MR != null) {
    //     this.MR.RS_SetSingAndBlink(1, 1);
    //     this.kaHao = this.MR.RS_ReadSerial('0', 3);
    // 0000000053116894 人员序列号0002
    // '0000000053977D93' 0001
    const entranceGuardStaffDto = new EntranceGuardStaffDto();
    entranceGuardStaffDto.serial = this.kaHao;
    this.handlingPersonService.getemplybyserial(entranceGuardStaffDto).subscribe(res => {
      this.cardInfoDtoQuery = res; // 根据ic卡 序列号 找到的人员信息对象
      if (this.cardInfoDtoQuery) {
        const reyuanList = this.renyuanxinxi.filter(r => {
          return r.employeeId === this.cardInfoDtoQuery.employeeId;
        });
        if (reyuanList.length > 0) { // 判断在申请列表的人员中是否有读出来的这个人 有则验证成功
          // 把读卡出来的那个放在数组的最前面 做个排序 让操作人员永远都在最一个看到是不是读卡的那个
          const a = this.renyuanxinxi.filter(r1 => r1.employeeId === this.cardInfoDtoQuery.employeeId);
          const other = this.renyuanxinxi.filter(r2 => r2.employeeId !== this.cardInfoDtoQuery.employeeId);
          this.renyuanxinxi = [];
          this.renyuanxinxi = [...a, ...other];
          this.messageService.success('读卡匹配成功!');
          /**
           * 先判断 lPTanHuaRelateListOfChild 列表中是否存在没有填写结束时间的对象，如果有 没有填结束时间的对象，
           * 则说面新添加的这一条跟没有填写结束时间的对象是一波谈话的，就把没有填写结束时间的波数 赋给这个新对象
           * 如果 都填写了结束时间   说明 新的对象是新的一波谈话，就需要新生成一个新的波数
           */
          const noWriteEndTimeList = this.lPTanHuaRelateListOfChild.filter(child => {
            return child.talkEndTime === null || child.talkEndTime === undefined;
          });
          /**
           *同一拨谈话
           */
          if (noWriteEndTimeList.length > 0) { // 说明存在没有填写结束时间的对象  新添加的这一条和没有填写结束时间的是同一拨谈话
            /**
             * 第一次刷卡
             */
            // 读第一次卡  先找一下是否在数组中存在  如果不存在的话就是第一次刷卡
            if (this.lPTanHuaRelateListOfChild.filter(child => {
              return child.tanHuaRenNo === this.cardInfoDtoQuery.employeeId &&
                (child.talkEndTime === null || child.talkEndTime === undefined);
            }).length <= 0) {
              console.log('走这里说明是第一次刷卡');
              const lienPersonnelTanHuaRelate = new LienPersonnelTanHuaRelate();
              lienPersonnelTanHuaRelate.id = UUID.UUID();
              lienPersonnelTanHuaRelate.tanHuaRen = this.cardInfoDtoQuery.employeeName;
              lienPersonnelTanHuaRelate.tanHuaRenNo = this.cardInfoDtoQuery.employeeId;
              lienPersonnelTanHuaRelate.talkStartTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss'); // 开始时间
              lienPersonnelTanHuaRelate.ciShu = noWriteEndTimeList[0].ciShu;
              this.lPTanHuaRelateListOfChild.push(lienPersonnelTanHuaRelate);
            } else {
              /**
               * 第二次刷卡
               */
              this.lPTanHuaRelateListOfChild.map(child => {
                console.log('走这里说明是第二次刷卡');
                if (child.tanHuaRenNo === this.cardInfoDtoQuery.employeeId && child.talkStartTime !== null
                  && (child.talkEndTime === undefined || child.talkEndTime === null)) {
                  child.talkEndTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss'); // 结束时间
                }
              });
            }
            const jsonGroup = groupArray(this.lPTanHuaRelateListOfChild, 'ciShu');
            this.lPTanHuaRelateListOfChildGroup = new Array<Array<LienPersonnelTanHuaRelate>>();
            // tslint:disable-next-line:forin
            for (const p in jsonGroup) { // 遍历json对象的每个key/value对,p为key
              this.lPTanHuaRelateListOfChildGroup.push(jsonGroup[p]);
            }
            console.log('保存之前的里面的人员数据 我要看一下！！', this.lPTanHuaRelateListOfChild);
            this.submitForm();
            /**
             * 以下为新的一波谈话
             */
          } else {
            /**
             * 第一次刷卡
             */
            console.log('走这里说明是新的一波谈话');
            const lienPersonnelTanHuaRelate = new LienPersonnelTanHuaRelate();
            lienPersonnelTanHuaRelate.tanHuaRen = this.cardInfoDtoQuery.employeeName;
            lienPersonnelTanHuaRelate.tanHuaRenNo = this.cardInfoDtoQuery.employeeId;
            lienPersonnelTanHuaRelate.talkStartTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss'); // 开始时间
            lienPersonnelTanHuaRelate.ciShu = UUID.UUID();
            this.lPTanHuaRelateListOfChild.push(lienPersonnelTanHuaRelate);
            this.submitForm();
          }
        } else {
          this.isDukaLoading = false;
          console.log(this.isDukaLoading);
          this.messageService.error('对不起此人不在人员名单内不能通过!');
        }
      } else {
        this.isDukaLoading = false;
        this.messageService.error('对不起此卡未绑到任何人员!');
      }
    });
    // }
    // } catch (e) {
    //   this.isDukaLoading = false;
    //   this.messageService.error('读卡器加载失败!');
    // }
  }

  /**
   * 有未结束的谈话
   */
  haveNotEndTanhua(): boolean {
    let result = false;
    const notEndTanhuas = this.lPTanHuaRelateListOfChild.filter(r => !r.talkEndTime);
    result = notEndTanhuas.length > 0;
    return result;
  }

  /**
   * 判断当前在是否正在谈话
   * @param tanHuaRenNo
   */
  currentCarInNotEndTanhua(tanHuaRenNo: string): boolean {
    let result = false;
    const notEndTanhuas = this.lPTanHuaRelateListOfChild.filter(r => !r.talkEndTime &&
      r.tanHuaRenNo === tanHuaRenNo);
    result = notEndTanhuas.length > 0;
    return result;
  }

  updatelPTanHuaRelateListOfChild(child: LienPersonnelTanHuaRelate) {
    if (this.currentCarInNotEndTanhua(child.tanHuaRenNo)) {
      this.lPTanHuaRelateListOfChild.map(r => {
        if (!r.talkEndTime && (r.tanHuaRenNo === child.tanHuaRenNo)) {
          r.talkEndTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        }
        return r;
      });
    } else {
      if (this.haveNotEndTanhua()) {
        const notEndTanhua = this.lPTanHuaRelateListOfChild.filter(r => !r.talkEndTime)[0];
        child.ciShu = notEndTanhua.ciShu;
        child.talkStartTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        this.lPTanHuaRelateListOfChild.push(child);
      } else {
        child.ciShu = UUID.UUID();
        child.talkStartTime = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        this.lPTanHuaRelateListOfChild.push(child);
      }

    }
    console.log(this.lPTanHuaRelateListOfChild);
    this.merge();

  }

  merge() {
    const jsonGroup = groupArray(this.lPTanHuaRelateListOfChild, 'ciShu');
    this.lPTanHuaRelateListOfChildGroup = new Array<Array<LienPersonnelTanHuaRelate>>();
    // tslint:disable-next-line:forin
    for (const p in jsonGroup) { // 遍历json对象的每个key/value对,p为key
      this.lPTanHuaRelateListOfChildGroup.push(jsonGroup[p]);
    }
    this.submitForm();
  }

  // 保存按钮
  submitForm() {
    this.lPTanHuaRelateListOfChild.forEach(child => {
      child.nurseId = this.nurse.id;
      this.lienPersonnelTanHuaRelateService.saveLienPersonnelTanHuaRelate(child).subscribe(result => {
        // 根据nurseId 查询谈话记录表列表
        this.lienPersonnelTanHuaRelateService.findLPTanHuaRelateByNurseId(this.nurse.id).subscribe(res1 => {
          console.log(res1);
          this.lPTanHuaRelateList = new Array<LienPersonnelTanHuaRelate>(); // 合成的父集数据
          this.lPTanHuaRelateListOfChild = res1; // 子级数据
          this.lPTanHuaRelateListOfChildGroup = new Array<Array<LienPersonnelTanHuaRelate>>();
          const jsonGroup = groupArray(this.lPTanHuaRelateListOfChild, 'ciShu');
          // tslint:disable-next-line:forin
          for (const p in jsonGroup) { // 遍历json对象的每个key/value对,p为key
            this.lPTanHuaRelateListOfChildGroup.push(jsonGroup[p]);
          }
          this.myFunction();
        });
      });
    });
    // 取消读卡按钮的等待
    this.isDukaLoading = false;
  }

  // 打开修改模态框
  showModal(record: LienPersonnelTanHuaRelate): void {// 根据id 找到谈话记录
    this.lpRelateEdit = new LienPersonnelTanHuaRelate();
    this.lpRelateEdit.id = record.id;
    this.lpRelateEdit.tanHuaRen = record.tanHuaRen;
    if (record.talkStartTime) {
      this.lpRelateEdit.startTime = moment(record.talkStartTime).toDate();
    }
    if (record.talkEndTime) {
      this.lpRelateEdit.endTime = moment(record.talkEndTime).toDate();
    }
    this.isVisible = true;
  }

  // 修改中的 保存
  handleOk(): void {
    if (this.lpRelateEdit.startTime) {
      this.lpRelateEdit.talkStartTime = moment(this.lpRelateEdit.startTime).format('YYYY-MM-DD HH:mm:ss');
    } else {
      this.messageService.error('请选择开始时间!');
      return;
    }
    if (this.lpRelateEdit.endTime) {
      this.lpRelateEdit.talkEndTime = moment(this.lpRelateEdit.endTime).format('YYYY-MM-DD HH:mm:ss');
    }
    if (this.lpRelateEdit.startTime && this.lpRelateEdit.endTime) {
      if (moment(this.lpRelateEdit.endTime) < moment(this.lpRelateEdit.startTime)) {
        this.messageService.error('结束时间必须大于开始时间！');
        return;
      }
    }
    this.lPTanHuaRelateListOfChild.map(child => {
      if (child.id === this.lpRelateEdit.id) {
        child.tanHuaRen = this.lpRelateEdit.tanHuaRen;
        child.talkStartTime = this.lpRelateEdit.talkStartTime;
        child.talkEndTime = this.lpRelateEdit.talkEndTime;
      }
    });
    const jsonGroup = groupArray(this.lPTanHuaRelateListOfChild, 'ciShu');
    this.lPTanHuaRelateListOfChildGroup = new Array<Array<LienPersonnelTanHuaRelate>>();
    // tslint:disable-next-line:forin
    for (const p in jsonGroup) { // 遍历json对象的每个key/value对,p为key
      this.lPTanHuaRelateListOfChildGroup.push(jsonGroup[p]);
    }
    this.submitForm();
    this.isVisible = false;
  }

  // 关闭模态框
  handleCancel(): void {
    this.isVisible = false;
  }

  // 手动添加一条谈话记录
  addTanHuaOne() {
    this.lienPersonnelTanHuaRelate = new LienPersonnelTanHuaRelate();
    this.isVisibleTanHua = true;
  }

  // 保存
  handleOkTanHua(): void {
    if (!this.lienPersonnelTanHuaRelate.tanHuaRen) {
      this.messageService.error('谈话人必填必填！');
      return;
    }
    if (this.lienPersonnelTanHuaRelate.startTime) {
      this.lienPersonnelTanHuaRelate.talkStartTime = moment(this.lienPersonnelTanHuaRelate.startTime).format('YYYY-MM-DD HH:mm:ss');
    } else {
      this.messageService.error('开始时间必填！');
      return;
    }
    if (this.lienPersonnelTanHuaRelate.endTime) {
      this.lienPersonnelTanHuaRelate.talkEndTime = moment(this.lienPersonnelTanHuaRelate.endTime).format('YYYY-MM-DD HH:mm:ss');
    } else {
      this.lienPersonnelTanHuaRelate.talkEndTime = null;
    }
    if (this.lienPersonnelTanHuaRelate.startTime && this.lienPersonnelTanHuaRelate.endTime) {
      if (moment(this.lienPersonnelTanHuaRelate.startTime) >= moment(this.lienPersonnelTanHuaRelate.endTime)) {
        this.messageService.error('结束时间必须大于开始时间！');
        return;
      }
    }
    /**
     * 先判断 lPTanHuaRelateListOfChild 列表中是否存在没有填写结束时间的对象，如果有 没有填结束时间的对象，
     * 则说面新添加的这一条跟没有填写结束时间的对象是一波谈话的，就把没有填写结束时间的波数 赋给这个新对象
     * 如果 都填写了结束时间   说明 新的对象是新的一波谈话，就需要新生成一个新的波数
     */
    const noWriteEndTimeList = this.lPTanHuaRelateListOfChild.filter(child => {
      return child.talkEndTime === null || child.talkEndTime === undefined;
    });
    /**
     *同一拨谈话
     */
    if (noWriteEndTimeList.length > 0) { // 说明存在没有填写结束时间的对象  新添加的这一条和没有填写结束时间的是同一拨谈话
      /**
       * 第一次刷卡
       */
      this.lienPersonnelTanHuaRelate.ciShu = noWriteEndTimeList[0].ciShu;
      this.lPTanHuaRelateListOfChild.push(this.lienPersonnelTanHuaRelate);
      const jsonGroup = groupArray(this.lPTanHuaRelateListOfChild, 'ciShu');
      this.lPTanHuaRelateListOfChildGroup = new Array<Array<LienPersonnelTanHuaRelate>>();
      // tslint:disable-next-line:forin
      for (const p in jsonGroup) { // 遍历json对象的每个key/value对,p为key
        this.lPTanHuaRelateListOfChildGroup.push(jsonGroup[p]);
      }
      this.submitForm();
      /**
       * 新的一波谈话
       */
    } else {
      /**
       * 第一次刷卡
       */
      const uuid = UUID.UUID();
      // 父集创建出来
      const lienPersonnelTanHuaRelateFather = new LienPersonnelTanHuaRelate();
      lienPersonnelTanHuaRelateFather.ciShu = uuid; // 次数
      this.lienPersonnelTanHuaRelateService.saveLienPersonnelTanHuaRelate(lienPersonnelTanHuaRelateFather).subscribe(res => {
        console.log(res);
        this.lienPersonnelTanHuaRelate.ciShu = uuid;
        this.lPTanHuaRelateListOfChild.push(this.lienPersonnelTanHuaRelate);
        const jsonGroup = groupArray(this.lPTanHuaRelateListOfChild, 'ciShu');
        this.lPTanHuaRelateListOfChildGroup = new Array<Array<LienPersonnelTanHuaRelate>>();
        // tslint:disable-next-line:forin
        for (const p in jsonGroup) { // 遍历json对象的每个key/value对,p为key
          this.lPTanHuaRelateListOfChildGroup.push(jsonGroup[p]);
        }
        this.submitForm();
      });
    }
    this.isVisibleTanHua = false;
  }

  // 关闭模态框
  handleCancelTanHua(): void {
    this.isVisibleTanHua = false;
  }

  handleDateOpenChange(open: boolean): void {
    if (open) {
      this.dateMode = 'time';
    }
  }

  handleDatePanelChange(mode: string): void {
    console.log('handleDatePanelChange: ', mode);
  }

  // 删除某个人的谈话时间记录
  deletedRecord(record: LienPersonnelTanHuaRelate) {
    this.lienPersonnelTanHuaRelateService.getLienPersonnelTanHuaRelateById(record.id).subscribe(result => {
      if (result) {
        result.deleted = true;
        this.lienPersonnelTanHuaRelateService.saveLienPersonnelTanHuaRelate(result).subscribe();
      }
      // 在列表中剔除
      this.lPTanHuaRelateListOfChild = this.lPTanHuaRelateListOfChild.filter(t => {
        return t.id !== record.id;
      });
      const jsonGroup = groupArray(this.lPTanHuaRelateListOfChild, 'ciShu');
      this.lPTanHuaRelateListOfChildGroup = new Array<Array<LienPersonnelTanHuaRelate>>();
      // tslint:disable-next-line:forin
      for (const p in jsonGroup) { // 遍历json对象的每个key/value对,p为key
        this.lPTanHuaRelateListOfChildGroup.push(jsonGroup[p]);
      }
      this.submitForm();
      this.messageService.success('删除成功！');
    });

  }

  // 获得谈话人
  getTanhuaRen(lpthl: Array<LienPersonnelTanHuaRelate>) {
    let name = '';
    lpthl.forEach((l, index) => {
      if (index === lpthl.length - 1) {
        name += l.tanHuaRen;
      } else {
        name += l.tanHuaRen + ',';
      }
    });
    return name;
  }

  // 根据自己合成父集数据
  myFunction() {
    this.lPTanHuaRelateList = new Array<LienPersonnelTanHuaRelate>();
    for (let i = 0; i < this.lPTanHuaRelateListOfChildGroup.length; i++) {
      const lienPersonnelTanHuaRelate = new LienPersonnelTanHuaRelate();
      let tanhuaren = '';
      let kaishishijian = null;
      let jieshushijian = null;
      let remark = '';
      let ciShu = '';
      for (let j = 0; j < this.lPTanHuaRelateListOfChildGroup[i].length; j++) {
        const l = this.lPTanHuaRelateListOfChildGroup[i][j];
        if (l.tanHuaRen != null) {
          if (tanhuaren === '') {
            tanhuaren += l.tanHuaRen;
          } else {
            tanhuaren += ',' + l.tanHuaRen;
          }
        }
        if (l.talkStartTime != null) {
          if (kaishishijian === null) {
            kaishishijian = l.talkStartTime;
          } else {
            if (moment(kaishishijian) > moment(l.talkStartTime)) {
              kaishishijian = l.talkStartTime;
            }
          }
        }
        if (l.talkEndTime != null) {
          if (jieshushijian === null) {
            jieshushijian = l.talkEndTime;
          } else {
            if (moment(jieshushijian) < moment(l.talkEndTime)) {
              jieshushijian = l.talkEndTime;
            }
          }
        }
        if (l.remark != null) {
          remark = l.remark;
        }
        ciShu = l.ciShu;
      }
      lienPersonnelTanHuaRelate.tanHuaRen = tanhuaren;
      lienPersonnelTanHuaRelate.talkStartTime = kaishishijian;
      lienPersonnelTanHuaRelate.talkEndTime = jieshushijian;
      lienPersonnelTanHuaRelate.remark = remark;
      lienPersonnelTanHuaRelate.ciShu = ciShu;
      this.lPTanHuaRelateList.push(lienPersonnelTanHuaRelate);
    }
    this.basicTable.nzData = this.lPTanHuaRelateList;
  }

  // 打开备注弹框
  openRemark(nurse1: LienPersonnelTanHuaRelate) {
    this.lipRemark = nurse1;
    this.isVisibleRemark = true;
  }

  // 取消备注模态框
  handleCancelRemark() {
    this.isVisibleRemark = false;
  }

  // 保存备注
  handleOkTanHuaRemark() {
    this.lPTanHuaRelateListOfChild.map(child => {
      if (child.ciShu === this.lipRemark.ciShu) {
        child.remark = this.lipRemark.remark;
      }
    });
    this.submitForm();
    this.isVisibleRemark = false;
  }
}
