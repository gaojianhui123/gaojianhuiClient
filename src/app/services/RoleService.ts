import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {QueryParam} from '../model/page/QueryParam';
import {Observable} from 'rxjs/index';
import {SanyiPage} from '../model/page/SanyiPage';
import {Role} from '../model/Role';

/**
 * ActivityService 对应后台controller
 */
@Injectable()
export class  RoleService extends ApiService {
  // 查找活动
  findRole(query: QueryParam<Role>): Observable<SanyiPage<Role>> {
    return this.post('role/findRole', query);
  }
 // 保存
  saveRole(query: Role): Observable<Role> {
    return this.post('role/saveRole', query);
  }
  // 根据id 查
  findRoleById(id: String): Observable<Role> {
    return this.post('role/findRoleById', id);
  }
  // 删除
  deleteRole(query: Role): Observable<Role> {
    return this.post('role/deleteRole', query);
  }


}
