import {BaseEntity} from './BaseEntity';

/**
 * 对应后台实体类
 */
export class ProtectedResource extends BaseEntity {
  id: string;
  url: string;
  tyle: string;                       // 受限资源类型，包括菜单  按钮  访问接口 BusinessEnum.ProtectedResourceType
  sortindex: number;                  // 排序
  icon: string ;                       // 图标
  iconclass:string = '';
  iconcolor: string ;                 // 图标颜色
  pid: string;
  description: string;                // 备注
  disabled: boolean;            // 不可选中
  children: ProtectedResource[];
  key: string;
  selected: boolean;
  isLeaf: boolean;

}
