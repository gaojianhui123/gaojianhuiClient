import {BaseEntity} from './BaseEntity';
/**
 * 床
 * Created by gaojianhui on 2018/11/29
 */
export class Bed extends BaseEntity {
  // 房间id
  roomId: string;
  nearWind: boolean; // 是否靠窗 true 靠窗 false 不靠窗
  key: string; // 关键字
  daiHao: string ;  // 代号
  buMen: string ;  // 部门
  jinzhuTime: string ;  // 进驻时间
}
