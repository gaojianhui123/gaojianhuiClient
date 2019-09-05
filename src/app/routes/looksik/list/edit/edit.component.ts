import { LienPersonnelTanHuaRelateService } from '../../../../services/LienPersonnelTanHuaRelateService';
import { LienPersonnelTanHuaRelate } from '../../../../model/LienPersonnelTanHuaRelate';
import { LienPersonnelService } from '../../../../services/LienPersonnelService';
import { NurseService } from '../../../../services/NurseService';
import { NzI18nService, NzTableComponent } from 'ng-zorro-antd';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Nurse } from '../../../../model/Nurse';
import { User } from '../../../../model/User';
import { FormBuilder } from '@angular/forms';
import groupArray from 'group-array';
import * as moment from 'moment';
@Component({
  selector: 'app-looksik-list-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.css'],
})
export class LooksikListEditComponent implements OnInit {
  record: any = {};
  currentUser: User;
  nurse: Nurse = new Nurse();
  daiHao = ''; // 代号
  @ViewChild('basicTable') basicTable: NzTableComponent;
  lPTanHuaRelateList: Array<LienPersonnelTanHuaRelate> = new Array<LienPersonnelTanHuaRelate>(); // 父集谈话记录数据
  lPTanHuaRelateListOfChild: Array<LienPersonnelTanHuaRelate> = new Array<LienPersonnelTanHuaRelate>(); // 子级谈话记录数据
  lPTanHuaRelateListOfChildGroup: Array<Array<LienPersonnelTanHuaRelate>> = new Array<Array<LienPersonnelTanHuaRelate>>(); // 子级谈话记录数据
  lienPersonnelTanHuaRelateLists: Array<LienPersonnelTanHuaRelate> = new Array<LienPersonnelTanHuaRelate>(); // 谈话记录父集

  constructor(private fb: FormBuilder, private lienPersonnelService: LienPersonnelService,
              private i18n: NzI18nService, private nurseService: NurseService,
              private lienPersonnelTanHuaRelateService: LienPersonnelTanHuaRelateService) {
              this.currentUser = this.nurseService.getCurrentUser();
  }

  ngOnInit() {
    if (this.record.id) {
      // 获取看护对象
      this.nurseService.findNurseById(this.record.id).subscribe((result) => {
        this.nurse = result;
        this.lienPersonnelService.findLienPersonnelById(this.nurse.lienPersonnelid).subscribe(res => {
          this.daiHao = res.daiHao;
        });
        // 根据nurseId 查询谈话记录表列表
        this.lienPersonnelTanHuaRelateService.findLPTanHuaRelateByNurseId(this.nurse.id).subscribe( res1 => {
          console.log(res1);
          this.lPTanHuaRelateList = new Array<LienPersonnelTanHuaRelate>(); // 合成的父集数据
          this.lPTanHuaRelateListOfChild = res1; // 子级数据
          this.lPTanHuaRelateListOfChildGroup = new Array<Array<LienPersonnelTanHuaRelate>>();
          const jsonGroup = groupArray(this.lPTanHuaRelateListOfChild, 'ciShu');
          for (const p in jsonGroup) { // 遍历json对象的每个key/value对,p为key
            this.lPTanHuaRelateListOfChildGroup.push(jsonGroup[p]);
          }
          this.myFunction();
        });
      });
    }
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
}
