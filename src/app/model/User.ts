import {BaseEntity} from './BaseEntity';
import {Role} from './Role';
import {District} from './District';
/**
 * Created by wuzhenxue on 2017/9/2.
 */
export class User extends BaseEntity {
  img: string;
  username: string;
  password: string;
  telphone: string;
  bumenId: string;
  bumenName: string;
  title: string;
  enabled = true;
  isadmin = false;
  dangzuzhipassed = false;
  juweihui: District;
  address: string;
  //  bumenId:
  // partymember: Partymember;
  buildinadmin = false;
  // 修改状况标志
  statusChanging = false;
  wxopenid: string ;
  roles: Array<Role> = new Array<Role>();

  oldpassword: string ;
  errorMsg: string ;
  updatePassword: string ;
  secondPassword: string;
  kanhuId: string ;
  yihurenyuan: string ;

}
