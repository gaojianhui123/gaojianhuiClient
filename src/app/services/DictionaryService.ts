import {Dictionary} from '../model/Dictionary';
import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs/index';
import { SanyiPage } from '../model/page/SanyiPage';
import { QueryParam } from '../model/page/QueryParam';
import { LienPersonnel } from '../model/LienPersonnel';

/**
 * DictionaryService 对应后台controller
 * create by gaojianhui
 */
@Injectable({
  providedIn: 'root'
})
export class  DictionaryService extends ApiService {
  // 获取列表
  findDictionary(query: QueryParam<Dictionary>): Observable<SanyiPage<Dictionary>> {
    return this.post('dictionary/findDictionary', query);
  }
  // 保存或者修改字典对象
  saveDictionary(dictionary: Dictionary): Observable<Dictionary> {
    return this.post('dictionary/saveDictionary', dictionary);
  }
  // 根据id获得字典对象
  getDictionaryById(id: string): Observable<Dictionary> {
    return this.post('dictionary/getDictionaryById', id);
  }
  // 删除字典对象
  deleteDictionary(dictionary: Dictionary): Observable<Dictionary> {
    return this.post('dictionary/deleteDictionary', dictionary);
  }


}
