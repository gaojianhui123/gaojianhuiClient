import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/index';
import {ApiService} from './api.service';
import {QueryParam} from '../model/page/QueryParam';
import {ProtectedResource} from '../model/ProtectedResource';
/**
 * ProtectedResourceService 对应后台contriller
 */
@Injectable()
export class  ProtectedResourceService extends ApiService {
  // 查找
  findProtectedResource(query: QueryParam<ProtectedResource>): Observable<any> {
    return this.post('protectedResource/findAll', query);
  }
 // 保存
  saveProtectedResource(query: ProtectedResource): Observable<ProtectedResource> {
    return this.post('protectedResource/saveProtectedResource', query);
  }
  // 根据id 查
  findProtectedResourceById(query: ProtectedResource): Observable<ProtectedResource> {
    return this.post('protectedResource/findProtectedResourceById', query);
  }
  // 删除
 deletedProtectedResource(query: ProtectedResource): Observable<ProtectedResource> {
    return this.post('protectedResource/deleteProtectedResource', query);
  }

  // 根据id 查树
  findProtectedResourceTreeById(query: ProtectedResource): Observable<ProtectedResource> {
    return this.post('protectedResource/findProtectedResourceTreeById', query);
  }
  findMenuTreeByCurrentUser(): Observable<any> {
    return this.post('protectedResource/findMenuTreeByCurrentUser');
  }


}
