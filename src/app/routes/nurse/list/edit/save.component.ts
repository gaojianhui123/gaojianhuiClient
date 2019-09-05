import { LienPersonnelTanHuaRelateService } from '../../../../services/LienPersonnelTanHuaRelateService';
import { LienPersonnelTanHuaRelate } from '../../../../model/LienPersonnelTanHuaRelate';
import {LienPersonnelService} from '../../../../services/LienPersonnelService';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NurseService} from '../../../../services/NurseService';
import { NzI18nService, NzMessageService } from 'ng-zorro-antd';
import {LienPersonnel} from '../../../../model/LienPersonnel';
import {QueryParam} from '../../../../model/page/QueryParam';
import {SanyiPage} from '../../../../model/page/SanyiPage';
import {ActivatedRoute, Router} from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from '../../../../model/User';
import {Nurse} from '../../../../model/Nurse';
import * as moment from 'moment';
import groupArray from 'group-array';
import { UUID } from 'angular2-uuid';
@Component({
  selector: 'app-nurselist-edit',
  templateUrl: './save.component.html'
})
export class NurseListEditComponent implements OnInit {
  isDisabled = false; // 此标识用做判断是新增还是编辑时用的
  currentUser: User;
  title1: string;
  validateForm: FormGroup;
  nurse: Nurse = new Nurse();
  isLoading = false;
  lPTanHuaRelateList: Array<LienPersonnelTanHuaRelate> = new Array<LienPersonnelTanHuaRelate>(); // 父集谈话记录数据
  lPTanHuaRelateListOfChild: Array<LienPersonnelTanHuaRelate> = new Array<LienPersonnelTanHuaRelate>(); // 子级谈话记录数据
  lPTanHuaRelateListOfChildGroup: Array<Array<LienPersonnelTanHuaRelate>> = new Array<Array<LienPersonnelTanHuaRelate>>(); // 子级谈话记录数据
  lienPersonnelquery: QueryParam<LienPersonnel> = new QueryParam<LienPersonnel>();
  lienPersonnelcontentPage: SanyiPage<LienPersonnel> = new SanyiPage<LienPersonnel>();
  // ---------------------------------------------
  listOfChildrenData: any[] = []; // 用来接收子集的数据
  isShow = false; // 是否显示修改的模态框  默认为false 隐藏
  addTanHuaShow = false; // 是否显示添加的模态框 默认为fasle 隐藏
  addChildTanHuaShow = false; // 是否显示添加子集的模态框 默认为fasle 隐藏
  modifyRelate: LienPersonnelTanHuaRelate = new LienPersonnelTanHuaRelate(); // 修改时绑定的那个谈话记录对象
  addTanHuaRelate: LienPersonnelTanHuaRelate = new LienPersonnelTanHuaRelate(); // 新增时绑定的那个谈话记录对象
  addChildTanHuaRelate: LienPersonnelTanHuaRelate = new LienPersonnelTanHuaRelate(); // 新增子集时绑定的那个谈话记录对象
  constructor(private router: Router, private route: ActivatedRoute,
              private fb: FormBuilder, private lienPersonnelService: LienPersonnelService,
              private i18n: NzI18nService, private nurseService: NurseService,
              private lienPersonnelTanHuaRelateService: LienPersonnelTanHuaRelateService,
              private messageService: NzMessageService) {
    this.currentUser = this.nurseService.getCurrentUser();
  }

  ngOnInit() {
    if (this.currentUser.kanhuId) {
      this.lienPersonnelquery.query.kanhuLiLiang = this.currentUser.kanhuId;
    }
    this.lienPersonnelquery.paging = false;
    this.lienPersonnelService.findLienPersonnels(this.lienPersonnelquery).subscribe((res) => {
      this.lienPersonnelcontentPage = res ;
      this.lienPersonnelcontentPage.content = this.lienPersonnelcontentPage.content.filter( (lp) => !lp.outTime);
    });
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isDisabled = true;
      this.title1 = '编辑看护信息';
      // 获取看护对象
      this.nurseService.findNurseById(id).subscribe((result) => {
        this.nurse = result;
        // 根据nurseId 查询谈话记录表列表
        this.lienPersonnelTanHuaRelateService.findLPTanHuaRelateByNurseId(id).subscribe( res1 => {
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
    } else {
      this.title1 = '每日情况录入';
    }
    this.validateForm = this.fb.group({
      submitId            : [ null, [] ],
      cateringRemarks       : [ null, [] ],
      conditionRemarks       : [ null, [] ],
      restsRemarks       : [ null, [] ],
      submitTime     : [ null, [ Validators.required ] ],
      lienPersonnelid: [ null, [ Validators.required ] ],
      noinquiry: [ null, [] ]              // 被调查对象非讯问时间情况
    });
  }

  submitForm(): void {
    for (const i of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }
    if (this.validateForm.valid === true) {
      if (this.nurse.submitTime) {
        this.nurse.submitTime = moment(this.nurse.submitTime).format('YYYY-MM-DD').toString();
      }
      this.nurse.lienPersonnelTanHuaRelates = this.lPTanHuaRelateListOfChild;
      this.nurse.nursePower = this.currentUser.kanhuId;
      this.nurseService.saveNurse(this.nurse).subscribe( (result) => {
        this.isLoading = false;
        if (result) {
          this.messageService.success('保存成功！');
          this.router.navigate(['/nurse']);
        } else {
          this.messageService.error('保存失败！');
        }
      });
    }
  }
  // 关闭按钮
  closed() {
    this.router.navigate(['/nurse']);
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
        if (this.lPTanHuaRelateListOfChildGroup[i].length === 1) {
          lienPersonnelTanHuaRelate.id = l.id;
        }
      }
      lienPersonnelTanHuaRelate.tanHuaRen = tanhuaren;
      lienPersonnelTanHuaRelate.talkStartTime = kaishishijian;
      lienPersonnelTanHuaRelate.talkEndTime = jieshushijian;
      lienPersonnelTanHuaRelate.remark = remark;
      lienPersonnelTanHuaRelate.ciShu = ciShu;
      this.lPTanHuaRelateList.push(lienPersonnelTanHuaRelate);
    }
    this.lPTanHuaRelateList.map( (relate) => {
      relate.expand = false;
    });
  }
  // 修改
  modify (relate: LienPersonnelTanHuaRelate) {
    this.modifyRelate = new LienPersonnelTanHuaRelate();
    this.modifyRelate.id = relate.id;
    this.modifyRelate.tanHuaRen = relate.tanHuaRen;
    this.modifyRelate.remark = relate.remark;
    this.modifyRelate.ciShu = relate.ciShu;
    if (relate.talkStartTime) {
      this.modifyRelate.startTime = moment(relate.talkStartTime).toDate();
    }
    if (relate.talkEndTime) {
      this.modifyRelate.endTime = moment(relate.talkEndTime).toDate();
    }
    this.isShow = true;
  }
  // 取消修改
  cancelModify() {
    this.isShow = false;
  }
  // 保存修改操作
  saveModify () {
    if (!this.modifyRelate.startTime) {
      this.messageService.error('请选择开始时间!');
      return;
    }
    if (this.modifyRelate.startTime && this.modifyRelate.endTime) {
      if (moment(this.modifyRelate.endTime) <= moment(this.modifyRelate.startTime)) {
        this.messageService.error('结束时间必须大于开始时间！');
        return;
      }
    }
    let nochildList = new Array<LienPersonnelTanHuaRelate>();
    let childList = new Array<LienPersonnelTanHuaRelate>();
    nochildList  = this.lPTanHuaRelateListOfChild.filter( (child) => {
      return child.ciShu !== this.modifyRelate.ciShu;
    });
    childList  = this.lPTanHuaRelateListOfChild.filter( (child) => {
      return child.ciShu === this.modifyRelate.ciShu;
    });
     // 如果改的是子集 则改备注就相当于修改所有的子集的备注
      for (let i = 0; i < childList.length; i++)  {
        if (childList[i].id === this.modifyRelate.id) {
          if (this.modifyRelate.startTime) {
            this.modifyRelate.talkStartTime = moment(this.modifyRelate.startTime).format('YYYY-MM-DD HH:mm:ss');
            childList[i].talkStartTime = this.modifyRelate.talkStartTime;
          }
          if (this.modifyRelate.endTime) {
            this.modifyRelate.talkEndTime = moment(this.modifyRelate.endTime).format('YYYY-MM-DD HH:mm:ss');
            childList[i].talkEndTime = this.modifyRelate.talkEndTime;
          }
          childList[i].tanHuaRen = this.modifyRelate.tanHuaRen;
          childList[i].remark = this.modifyRelate.remark;
        } else {
          childList[i].remark = this.modifyRelate.remark;
        }
        // this.lienPersonnelTanHuaRelateService.saveLienPersonnelTanHuaRelate(childList[i]).subscribe( res1 => {
        //   this.lienPersonnelTanHuaRelateService.findLPTanHuaRelateByNurseId(this.nurse.id).subscribe( res2 => {
        //     this.lPTanHuaRelateList = new Array<LienPersonnelTanHuaRelate>(); // 合成的父集数据
        //     this.lPTanHuaRelateListOfChild = res2; // 子级数据
        //     this.lPTanHuaRelateListOfChildGroup = new Array<Array<LienPersonnelTanHuaRelate>>();
        //     const jsonGroup = groupArray(this.lPTanHuaRelateListOfChild, 'ciShu');
        //     // tslint:disable-next-line:forin
        //     for (const p in jsonGroup) { // 遍历json对象的每个key/value对,p为key
        //       this.lPTanHuaRelateListOfChildGroup.push(jsonGroup[p]);
        //     }
        //     this.myFunction();
        //     this.isShow = false;
        //   });
        // });
      }
    this.lPTanHuaRelateListOfChild = [...nochildList, ...childList];
    this.lPTanHuaRelateListOfChildGroup = new Array<Array<LienPersonnelTanHuaRelate>>();
        const jsonGroup = groupArray(this.lPTanHuaRelateListOfChild, 'ciShu');
        // tslint:disable-next-line:forin
        for (const p in jsonGroup) { // 遍历json对象的每个key/value对,p为key
          this.lPTanHuaRelateListOfChildGroup.push(jsonGroup[p]);
        }
        this.myFunction();
        this.isShow = false;
  }
  // 删除一条
  deleteRelate (id: string) {
    this.lienPersonnelTanHuaRelateService.getLienPersonnelTanHuaRelateById(id).subscribe( res => {
      if (res) {
        res.deleted = true;
        this.lienPersonnelTanHuaRelateService.saveLienPersonnelTanHuaRelate(res).subscribe(res1 => {
          this.messageService.success('删除成功！');
        });
      }
    });
    let noDeleteList = new Array<LienPersonnelTanHuaRelate>();
    noDeleteList  = this.lPTanHuaRelateListOfChild.filter( (child) => {
      return child.id !== id;
    });
    this.lPTanHuaRelateListOfChild = [...noDeleteList];
    this.lPTanHuaRelateListOfChildGroup = new Array<Array<LienPersonnelTanHuaRelate>>();
    const jsonGroup = groupArray(this.lPTanHuaRelateListOfChild, 'ciShu');
    // tslint:disable-next-line:forin
    for (const p in jsonGroup) { // 遍历json对象的每个key/value对,p为key
      this.lPTanHuaRelateListOfChildGroup.push(jsonGroup[p]);
    }
    this.myFunction();
    this.isShow = false;
  }
  // 选择代号触发的change事件
  selectDaiHao() {
    if (this.nurse.submitTime && this.nurse.lienPersonnelid) {
      this.getNurseByLpIdAndTime();
    }
  }
  // 选择上报时间触发的change事件
  selectSubmitTime() {
    if (this.nurse.submitTime && this.nurse.lienPersonnelid) {
      this.getNurseByLpIdAndTime();
    }
  }
  // 根据留置人id 和 上报时间查找出来对应的那一条谈话记录对象nurse
  getNurseByLpIdAndTime() {
    this.nurseService.getNurseByLpIdAndTime(this.nurse).subscribe(res => {
      console.log('这是res的值', res);
      if (res) {
        this.nurse = res;
        // 根据nurseId 查询谈话记录表列表
        this.lienPersonnelTanHuaRelateService.findLPTanHuaRelateByNurseId(this.nurse.id).subscribe( res1 => {
          console.log('这是res1的值', res1);
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
      } else {
        this.lPTanHuaRelateList = new Array<LienPersonnelTanHuaRelate>(); // 合成的父集数据
        const lienPersonnelid = this.nurse.lienPersonnelid;
        const  submitTime = this.nurse.submitTime;
        this.nurse = new Nurse();
        this.nurse.submitTime = submitTime;
        this.nurse.lienPersonnelid = lienPersonnelid;
      }
    });
  }
  // 查看子集
  getChild (relate: LienPersonnelTanHuaRelate) {
    // 根据选择的这个一个把 他相关的分组查出来
    if (relate.expand) {
      this.listOfChildrenData = [];
      this.listOfChildrenData = this.lPTanHuaRelateListOfChild.filter( (child) => {
        return child.ciShu === relate.ciShu;
      });
    }
  }
  // 添加一条谈话信息
  addTanHua() {
    this.addTanHuaRelate = new LienPersonnelTanHuaRelate();
    this.addTanHuaShow = true;
  }
  // 取消添加
  cancelAddTanHua() {
    this.addTanHuaShow = false;
  }
  // 保存新增 直接添加子集
  saveAddTanHua() {

    if (!this.addTanHuaRelate.startTime) {
      this.messageService.error('请选择开始时间!');
      return;
    } else {
      this.addTanHuaRelate.talkStartTime = moment(this.addTanHuaRelate.startTime).format('YYYY-MM-DD HH:mm:ss');
    }
    if (this.addTanHuaRelate.startTime && this.addTanHuaRelate.endTime) {
      if (moment(this.addTanHuaRelate.endTime) <= moment(this.addTanHuaRelate.startTime)) {
        this.messageService.error('结束时间必须大于开始时间！');
        return;
      }
    }
    if (this.addTanHuaRelate.endTime) {
      this.addTanHuaRelate.talkEndTime = moment(this.addTanHuaRelate.endTime).format('YYYY-MM-DD HH:mm:ss');
    }
    this.addTanHuaRelate.id = UUID.UUID();
    this.addTanHuaRelate.ciShu = UUID.UUID();
    this.lPTanHuaRelateListOfChild.push(this.addTanHuaRelate);
    this.lPTanHuaRelateListOfChildGroup = new Array<Array<LienPersonnelTanHuaRelate>>();
    const jsonGroup = groupArray(this.lPTanHuaRelateListOfChild, 'ciShu');
    // tslint:disable-next-line:forin
    for (const p in jsonGroup) { // 遍历json对象的每个key/value对,p为key
      this.lPTanHuaRelateListOfChildGroup.push(jsonGroup[p]);
    }
    this.myFunction();
    this.addTanHuaShow = false;
  }
  // 在父集的上面添加子集
  addTanHuaChild (relate: LienPersonnelTanHuaRelate) {
    this.addChildTanHuaRelate = new LienPersonnelTanHuaRelate();
    this.addChildTanHuaRelate.ciShu = relate.ciShu;
    this.addChildTanHuaRelate.remark = relate.remark;
    this.addChildTanHuaShow = true;
  }
  // 取消添加子集模态框
  cancelAddChildTanHua() {
    this.addChildTanHuaShow = false;
  }
  // 保存添加子集
  saveAddChildTanHua() {
    if (!this.addChildTanHuaRelate.startTime) {
      this.messageService.error('请选择开始时间!');
      return;
    } else {
      this.addChildTanHuaRelate.talkStartTime = moment(this.addChildTanHuaRelate.startTime).format('YYYY-MM-DD HH:mm:ss');
    }
    if (this.addChildTanHuaRelate.startTime && this.addChildTanHuaRelate.endTime) {
      if (moment(this.addChildTanHuaRelate.endTime) <= moment(this.addChildTanHuaRelate.startTime)) {
        this.messageService.error('结束时间必须大于开始时间！');
        return;
      }
    }
    if (this.addChildTanHuaRelate.endTime) {
      this.addChildTanHuaRelate.talkEndTime = moment(this.addChildTanHuaRelate.endTime).format('YYYY-MM-DD HH:mm:ss');
    }
    this.addChildTanHuaRelate.id = UUID.UUID();
    this.lPTanHuaRelateListOfChild.push(this.addChildTanHuaRelate);
    this.lPTanHuaRelateListOfChildGroup = new Array<Array<LienPersonnelTanHuaRelate>>();
    const jsonGroup = groupArray(this.lPTanHuaRelateListOfChild, 'ciShu');
    // tslint:disable-next-line:forin
    for (const p in jsonGroup) { // 遍历json对象的每个key/value对,p为key
      this.lPTanHuaRelateListOfChildGroup.push(jsonGroup[p]);
    }
    this.myFunction();
    this.addChildTanHuaShow = false;
  }
}
