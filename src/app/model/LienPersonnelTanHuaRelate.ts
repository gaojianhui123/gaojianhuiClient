import {BaseEntity} from './BaseEntity';
/**
 * 留置人谈话记录
 * 2019年3月12日09:40:39
 */
export class LienPersonnelTanHuaRelate extends BaseEntity {
  // 留置人id
  lpId: string;
  // 谈话记录id
  nurseId: string;
  // 谈话开始时间
  talkStartTime: any;
  // 谈话结束时间
  talkEndTime: any;
  startTime: Date;
  endTime: Date;
  // 备注
  remark: string ;
  // 谈话人
  tanHuaRen: string ;
  // 谈话人编号
  tanHuaRenNo: string;
  // 次数 第几波人 是一个随机生成的标识
  ciShu: string;
  expand: boolean;
}
