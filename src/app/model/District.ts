import {BaseEntity} from './BaseEntity';
/**
 * Created by wuzhenxue on 2018/10/26.
 */
export class District extends BaseEntity {
  code: string;
  type: string;                      // 区划类型 A: 省市  B: 区县 C:街道  D:居委会
  classification: string;                  // 排序
  value: string;
  lable: string;
  isLeaf: boolean;
  pid: string;
  adminname: string; // 超级管理员名
  enabled: boolean;




}
