import {Dictsort} from '../model/Dictsort';
import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs/index';
import {QueryParam} from '../model/page/QueryParam';
import {User} from '../model/User';
import {SanyiPage} from '../model/page/SanyiPage';

/**
 * DictsortService 对应后台controller
 * create by gaojianhui
 */
@Injectable({
  providedIn: 'root'
})
export class  DictsortService extends ApiService {
  // 查询字典分类对象
  findDictsort(query: QueryParam<Dictsort>): Observable<SanyiPage<Dictsort>> {
    return this.post('dictsort/findDictsort', query);
  }
  // 保存或者修改字典分类对象
  saveDictsort(dictsort: Dictsort): Observable<Dictsort> {
    return this.post('dictsort/saveDictsort', dictsort);
  }
  // 根据id获得字典分类对象
  getDictsortById(id: string): Observable<Dictsort> {
    return this.post('dictsort/getDictsortById', id);
  }
  // 删除字典分类对象
  deleteDictsort(dictsort: Dictsort): Observable<Dictsort> {
    return this.post('dictsort/deleteDictsort', dictsort);
  }


}
