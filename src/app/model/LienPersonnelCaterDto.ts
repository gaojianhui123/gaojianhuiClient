import {LienPersonnel} from './LienPersonnel';

export class LienPersonnelCaterDto extends LienPersonnel {
  lienPersonnelid: string;
  riqi: string;
  cookingMan: string;
  cookingManTwo: string ;                   // 做餐人
  cookingManThree: string ;
  packingMan: string;
  packingManTwo: string ;                     // 打包人
  packingManThree: string ;
  deliveryMan: string;
  deliveryManTwo: string ;                     // 送餐人
  deliveryManThree: string ;
  receiveMan: string;
  receiveManTwo: string;                    // 接餐人
  receiveManThree: string;
  remarks: string;
  breakfast: string;                   // 常规早餐
  lunch: string ;                      // 常规午餐
  dinner: string ;                     // 常规晚餐
  specificbreakfast: string ;          // 特殊早餐
  specificlunch: string;               // 特殊午餐
  specificdinner: string;              // 特殊晚餐
  caterId: string;
}
