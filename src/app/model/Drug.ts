import {BaseEntity} from './BaseEntity';
/**
 * Created by gaojianhui on 2018/11/29
 */
export class Drug extends BaseEntity {
  // 使用药品名称
  drugName: string ;
  // 药品数量
  drugTotalCount: number ;
  // 单位
  unit: string ;
  // 单价
  price: string ;
  // 规格
  guige: string;
  // 入库医生
  doctor: string ;
  // 备注
  remark: string ;
  // 入库时间
  rukuTime: Date;
  // 留置人id
  lpId: string ;
  // 开始时间
  start: string ;
  // 结束时间
  end: string ;

  drugNameString: string ;

}
