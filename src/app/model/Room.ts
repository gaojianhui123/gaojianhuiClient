import {BaseEntity} from './BaseEntity';
import { Bed } from './Bed';
/**
 * Created by gaojianhui on 2018/11/29
 */
export class Room extends BaseEntity {
  // 楼层 1 ,2 ,3
  floorTier: string;
  // 固定值 数据库不能修改
  fixationValue: string;
  bedList: Array<Bed> = new Array<Bed>();
  daiHao: string;
  bedName:string;
}
