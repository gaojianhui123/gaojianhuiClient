import {BaseEntity} from './BaseEntity';
import { EntranceGuardStaffDto } from './dto/entranceGuardStaffDto';
/**
 * Created by gaojianhui on 2018/12/02
 */
export class Tanhuashenqing extends BaseEntity {
  // 留置人id
  lpId: string ;
  // 填报部门
  bumen: string ;
  // 填报人
  tianbaoren: string ;
  // 人员 (办案人员id列表)
  renyuan: Array<string>  = new Array<string>();
  // 立方人员对象数组
  lifangStaffDto: Array<EntranceGuardStaffDto>  = new Array<EntranceGuardStaffDto>();
  // 房门id
  doorId: string;
  cuoShiType: string ;
  // 填报时间
  tianBaoTime: Date;
  // 代号
  daihao: string ;
  // 留置人姓名
  lpName: string;
  // 留置人性别
  lzSex: string ;
  // 留置人年龄
  lzAge: number ;
  // 留置人职级
  lpZhiji: string ;
  // 进驻时间
  lpTime: string ;

  shenpiStatus: string;
  shenpiYijian: string;
  kanhuLiLiang: string;
}
