import {QueryParam} from '../model/page/QueryParam';
import {SanyiPage} from '../model/page/SanyiPage';
import {District} from '../model/District';
import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {User} from '../model/User';
import {Observable} from 'rxjs';

/**
 * Created by wuzhenxue on 2018/10/11.
 */
@Injectable({
  providedIn: 'root'
})
export class SystemService extends ApiService {
  // 用户登录
  login(user: User): Observable<any> {
    return this.post('user/auth', user);
  }
  getCurrentUserFromServer(): Observable<User> {
    return this.post('users/getCurrentUser');
  }
  // 查找用户
  findUsers(query: QueryParam<User>): Observable<SanyiPage<User>> {
    return this.post('users/findUsers', query);
  }
  saveUser(user: User): Observable<User> {
    return this.post('users/saveUser', user);
  }
  getUserById(id: string): Observable<User> {
    return this.post('users/getUserById', id);
  }
  changeEnabled(user: User): Observable<User> {
    return this.post('users/changeEnabled', user);
  }
  deleteUser(user: User): Observable<User> {
    return this.post('users/delete', user);
  }
  // 重置密码
  resetPassword(user: User): Observable<User> {
    return this.post('users/resetPassword', user);
  }

  /**
   * 查找所有行政区划,后台封装为一棵树
   * @param query
   * @returns {Observable<any>}
   */
  findAllDistricts(): Observable<any> {
    return this.post('district/findDistrictTree');
  }

  /**
   * 查找所有行政区划
   * @returns {Observable<any>}
   */
  findAllDistrictList(): Observable<SanyiPage<District>> {
    return this.post('district/findAllDistrictList');
  }
  // // 查小区
  // findResidentials(query: QueryParam<ResidentialQuarter>): Observable<SanyiPage<ResidentialQuarter>> {
  //   return this.post('residential/findResidential', query);
  // }
  // // 查Partymember 表
  // findPartymember(query: QueryParam<Partymember>): Observable<SanyiPage<Partymember>> {
  //   return this.post('partymember/findPartymember', query);
  // }
  // // 保存
  // savePartymember(query: Partymember): Observable<Partymember> {
  //   return this.post('partymember/savePartymember', query);
  // }
  // // 根据id 查
  // findPartymemberById(query: Partymember): Observable<Partymember> {
  //   return this.post('/partymember/findPartymemberById', query);
  // }
  // // 删除
  // deletedPartymember(query: Partymember): Observable<Partymember> {
  //   return this.post('partymember/deletePartymember', query);
  // }
// 查微信id 存在的用户
  selectUserNoNullWxopenid(query: QueryParam<User>): Observable<SanyiPage<User>> {
    return this.post('users/selectUserNoNullWxopenid', query);
  }
  // 修改密码
  updatePassword(user: User): Observable<User> {
    return this.post('users/updatePassword', user);
  }

}
