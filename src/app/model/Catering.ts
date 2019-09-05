import {BaseEntity} from './BaseEntity';

export class Catering extends BaseEntity {
  cateringMenu: string ;                  // 菜单  0 常规菜单    1 特殊菜单
  cookingMan: string ;                   // 做餐人
  cookingManTwo: string ;                   // 做餐人
  cookingManThree: string ;                   // 做餐人


  packingMan: string ;                     // 打包人
  packingManTwo: string ;                     // 打包人
  packingManThree: string ;                     // 打包人

  deliveryMan: string ;                     // 送餐人
  deliveryManTwo: string ;                     // 送餐人
  deliveryManThree: string ;                     // 送餐人

  receiveMan: string;                    // 接餐人
  receiveManTwo: string;                    // 接餐人
  receiveManThree: string;                    // 接餐人

  riqi: string;                    // 录入日期
  remarks: string ;                     // 备注

  breakfast: string ;                     // 常规早餐
  lunch: string ;                      // 常规午餐
  dinner: string ;                       // 常规晚餐

  specificbreakfast: string ;                     // 特殊早餐
  specificlunch: string ;                      // 特殊午餐
  specificdinner: string ;                       // 特殊晚餐
  lienPersonnelid: string ;                  // 代号


}
