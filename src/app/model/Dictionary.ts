import {BaseEntity} from './BaseEntity';
/**
 * 字典
 * Created by gaojianhui on 2018/11/30
 */
export class Dictionary extends BaseEntity {


  // 字典分类id
  dsId: string ;
  // 排序
  dicIndex: number;
  // 字典名称
  dicName: string ;
  // 拼音码
  dicPyCode: string ;
  // 备注
  dicMemo: string ;
  // 是否自用
  isOwner: number ;
  // 分类名称
  sortName: string ;
  label: string;
  value: string;

}
