import {BaseEntity} from './BaseEntity';
import { HealthDrugRelate } from './HealthDrugRelate';
/**
 * 体检表
 * Created by gaojianhui on 2018/11/30
 */
export class Health extends BaseEntity {

// 留置人id
  lpId: string ;
  // 体检状态 1： 进驻体检  2： 常规体检
  status: string ;
  // 病史
  historyMedical: string ;
  // 体温
  tiWen: string;
  // 血压
  xueYa: string;
  // 呼吸
  huXi: string;
  // 心率
  xinLv: string;
// 体格检查
  checkHealth: string;
// 体格检查
  xinDianTu: string;
// 随机血糖
  xueTang: string;
// 医生意见
  doctorYiJian: string;
// 医生
  doctor: string;
// 体检时间
  tiJianTime: Date;
// 专案组负责人
  fuZeRen: Date;
// 联系方式
  fuZeRenTel: string;
// 时段
  shiDuan: string;
// 用药记录
  medicalRecords: string;
// 特殊情况
  specialCase: string;
  // 代号
  daihao: string;
  // 房间号
  roomNum: string;
  // 性别
  lzSex: string;
  // 年龄
  lzAge: number;
  // 进驻时间
  jinzhuriqi: string;

  // healthDrugRelateList: Array<HealthDrugRelate> = new Array<HealthDrugRelate>();
  healthDrugRelateList: any;
  // 体重
  weight: string;
  // 高血压
  gaoXueYa: string ;
  // 医护人员id
  yihurenyuan: string;

  edit: boolean;
  hushi: string;
  outStatus:string;

}
