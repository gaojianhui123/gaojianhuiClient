/**
 *门禁系统的房门Dto
 */
export class CardInfoDtos {
  employeeName: string;
  phone: string;
  departId: number;  // 部门id  int
  deptName: string;   // 部门名称  string:"接口测试部门",//
  employeeId: string;  // 证件号  string :"0008
  sysNo: number;  // 人员编号 int
  sysNoForDevice: string;
  photo: string;
  boarding_expenses: string ;
  cardCost: string ;
  deposit: string ;
  empTypeName: string ;

  employeePass: string ;
  employeeSex: string ;

  employeeType: string ;
  emplyeeCode: string ;
  fingerPrintNumber: string ;
  invalidate: string ;

  isAdmin: string ;
  isDelete: string ;
  isLeave: string ;
  password: string ;

  recharge_gif: string ;
  serial: string ;
}
