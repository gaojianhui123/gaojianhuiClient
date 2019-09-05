import {BaseEntity} from './BaseEntity';
import { LienPersonnelTanHuaRelate } from './LienPersonnelTanHuaRelate';

export class Nurse extends BaseEntity {
  submitId: string;                   // 上报人
  submitTime: string;                 // 上报时间
  cateringRemarks: string;            // 餐饮情况
  conditionRemarks: string;           // 情绪情况
  restsRemarks: string;               // 其他情况
  lienPersonnelid: string;            // 代号
  tanHuaShenQingId: string;           // 谈话申请id
  nursePower: string;                 // 看护力量  0  武警 1公安  (下拉 )
  noinquiry: string;                  // 被调查对象非讯问时间情况
  daiHao: string;                     // 代号临时变量
  roomNum: string;                    // 房间号临时变量
  lzSex: string;                      // 性别临时变量
  lzMinZu: string;                    // 民族临时变量
  enterTime: string;                  // 进驻时间临时变量
  lienPersonnelTanHuaRelates = new Array<LienPersonnelTanHuaRelate>();                  // 谈话记录列表临时变量
}
