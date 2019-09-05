/**
 * Created by wuzhenxue on 2018/1/24.
 */
export interface MenuItem {
  id?: string;
  url?: string;
  name?: string;
  icon?: string;
  key?: string;
  children?: MenuItem[];
}
