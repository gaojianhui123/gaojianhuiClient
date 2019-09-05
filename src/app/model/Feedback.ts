import {BaseEntity} from './BaseEntity';

export class Feedback extends BaseEntity {
  fkTime: string ;                    // 反馈时间
  signTime: string ;                  // 签收时间
  department: string ;              // 部门
  problem: string ;                 // 存在问题
  suggest: string ;                 // 改进建议
  lienPersonnelid: string;          // 代号
  daiHao: string;                   // 代号临时变量
  lzName: string;                   // 姓名临时变量
  lzAge: number;                    // 年龄
  lzSex: string;                    // 性别临时变量
  lzZhiJi: string;                  // 职级临时变量
  enterTime: string;                  // 进驻时间临时变量
  label: string;
  value: string;
  shenpi: string;                   // 审批状态

  fzPerson: string ;                  // 负责人

  gjTime: string ;                  // 改进反馈时间

  phone: string ;                  // 联系方式

  gjResult: string ;                  // 改进结果
  bumenid: string;
}
