import { BaseEntity } from './BaseEntity';

export class LienPersonnel extends BaseEntity {
  cuoShiType: string;        			// 措施种类

  zhuanAnName: string; 				// 专案名称

  daiHao: string; 						// 留置人代号

  roomNum: string; 					// 留置人员房间号（存放roomId）

  roomNumName: string;      //  房间号名称（非持久 ）

  bedNum: string; 					// 留置人员床位号（存放bedId）

  bedNumName: string; 					// 留置人员床位号名称（非持久 ）

  lzName: string; 						// 留置人员姓名

  lzSex: string; 						// 留置人员性别

  lzAge: number; 						// 留置人员年龄

  birthDay: string;           // 留置人员生日

  lzMinZu: string; 					// 留置人员名族

  lzZhiJi: number;					// 留置人员职级

  lzDanWei: string;        // 留置人单位
  lzZhiWu: string;        // 留置人职务
  enterTime: string;						// 进驻时间

  lzQiXian: string;					// 留置期限

  outTime: string;						// 撤离时间

  outStatus: string;          // 撤离状态  0： 未撤离 1： 已撤离

  cbDepartment: string;					// 承办部门

  linkman: string;						// 联系人

  telNum: string;						// 联系电话

  wenjian = [];						// 相关文件

  sPStatus: string;					// 审批状态

  kanhuLiLiang: string;      // 看护力量
  yihurenyuan: string;       // 医护人员


  start: string;
  end: string;
  kanhuLiLiangString: string; // 看护力量名称
  cbDepartmentString: string; // 承办部门名称
  /**
   * 看护字段
   */
  lienPersonnelid: string;       // 临时参数
  label: string;
  value: string;
  submitId: string;  // 临时参数
  talkId: string;  // 临时参数
  talkTimeOpen: string; // 临时参数
  talkTimeClose: string;  // 临时参数
  nurseId: string;                     // 看护id
  /**
   * 体检字段
   */
  lpId: string;
  doctor: string;
  tiJianTime: string;
  hId: string;
  submitTime: string;
}
