import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs/index';
import {Health} from '../model/Health';
import { HealthDrugRelate } from '../model/HealthDrugRelate';
import { SanyiPage } from '../model/page/SanyiPage';
import { QueryParam } from '../model/page/QueryParam';
import { Dictionary } from '../model/Dictionary';

/**
 * HealthDrugRelateService 对应后台controller
 * create by gaojianhui
 */
@Injectable({
  providedIn: 'root'
})
export class  HealthDrugRelateService extends ApiService {
  // 获取药品用量列表
  findHealthDrugRelate(query: QueryParam<HealthDrugRelate>): Observable<SanyiPage<HealthDrugRelate>> {
    return this.post('healthDrugRelate/findHealthDrugRelate', query);
  }
  // 保存或者修改体检药品关联对象
  saveHealthDrugRelate(healthDrugRelate: HealthDrugRelate): Observable<HealthDrugRelate> {
    return this.post('healthDrugRelate/saveHealthDrugRelate', healthDrugRelate);
  }
  // 根据id获得体检药品关联对象
  getHealthDrugRelateById(id: string): Observable<HealthDrugRelate> {
    return this.post('healthDrugRelate/getHealthDrugRelateById', id);
  }
  // 删除体检药品关联对象
  deleteHealthDrugRelate(healthDrugRelate: HealthDrugRelate): Observable<HealthDrugRelate> {
    return this.post('healthDrugRelate/deleteHealthDrugRelate', healthDrugRelate);
  }
  // 查列表
  findHealthDrugRelateByjpa(query: QueryParam<HealthDrugRelate>): Observable<SanyiPage<HealthDrugRelate>> {
    return this.post('healthDrugRelate/findHealthDrugRelates', query);
  }

}
