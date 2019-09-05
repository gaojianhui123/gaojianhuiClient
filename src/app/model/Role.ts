import {BaseEntity} from './BaseEntity';
import {ProtectedResource} from './ProtectedResource';

export class Role extends BaseEntity {

  protectedResources: Array<ProtectedResource> = new Array<ProtectedResource>();              //  权限
  // protectedResources: any;
  roletype: string ;    // 角色类型
  errorMsg: string;

}
