import {BaseEntity} from './BaseEntity';
/**
 * 体检药品关联
 * Created by gaojianhui on 2018/12/02
 */
export class HealthDrugRelate extends BaseEntity {
  // 体检id
  healthId: string ;
  // 留置人id
  lpId: string ;
  // 药品id
  dId: string ;
  // 用量
  yongliang: number ;

  // 用法
  remark: string;
  // 规格
  danwei: string;
  edit = false;
  kaishiTime: string;     // 开始时间
  jieshuTime: string;       // 结束时间
  pinci: string;         // 频次
  yongyaoType: string ;  // 用药类型（0：长期用药；1：临时用药）
  kaiYaoDoctor: string ; // 开药医生
  tingYaoDoctor: string ; // 停药医生

  // 药品名(字符串)
  drugName: string;
  // 用法 (字符串)
  yongfa: string ;
  // 频次(字符串)
  pinciString: string ;
  // 规格(字符串)
  guigeString: string ;
}
