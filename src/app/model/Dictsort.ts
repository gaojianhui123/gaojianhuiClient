import {BaseEntity} from './BaseEntity';
/**
 * 字典分类
 * Created by gaojianhui on 2018/11/28.
 */
export class Dictsort extends BaseEntity {

  // 字典分类名称
  dictsortName: string;
  // 是否自用
  isOwner: number;

}
