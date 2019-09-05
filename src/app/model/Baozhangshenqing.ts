import {BaseEntity} from './BaseEntity';
/**
 * Created by gaojianhui on 2018/12/02
 */
export class Baozhangshenqing extends BaseEntity {
  // 留置人id
  lpId: string;
  // 填报部门
  bumen: string ;
  // 案件承办部门
  chengbanbumen: string ;
  // 呈批申请
  apply: string;
  // 申请事项及具体需求
  matter: string;
  // 1：未审批 2：已审批）
  applyStatus: string;
  // 备注
  remark: string;
  // 代号
  daihao: string;
  // 填报日期
  tianBaoTime: string;
  // 留置人姓名
  lpName: string ;
  // 留置人性别
  lzSex: string ;
  // 留置人年龄
  lzAge: number ;
  // 留置人职级
  lpZhiji: string ;
  // 进驻时间
  lpTime: string ;
  bumens: string ;
}
