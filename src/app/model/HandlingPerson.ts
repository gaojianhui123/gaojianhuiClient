import {BaseEntity} from './BaseEntity';
import {AttachmentFile} from './AttachmentFile';

export class HandlingPerson extends BaseEntity {


  applyTime: string ;                  // 备案日期

  controlNo: string ;                // 办案人员编号

  memberSex: number ;                // 性别(0:男 1:女)

  age: number ;                      // 年龄

  image:  AttachmentFile [] ;                    // 办案人员图片

  img: string;

  label: string = this.title;

  value: string = this.id;


}
