import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs/index';
import {Health} from '../model/Health';
import {QueryParam} from '../model/page/QueryParam';
import {SanyiPage} from '../model/page/SanyiPage';
import {environment} from '@env/environment';
import { StatisticDto } from '../model/dto/statisticDto';
import { StatisticResultDto } from '../model/dto/statisticResultDto';

/**
 * HealthService 对应后台controller
 * create by gaojianhui
 */
@Injectable({
  providedIn: 'root'
})
export class  HealthService extends ApiService {
  // 保存或者修改体检对象
  saveHealth(health: Health): Observable<Health> {
    return this.post('health/saveHealth', health);
  }
  // 针对进驻体检的 保存或者修改体检对象
  saveJinZhuTiJian(health: Health): Observable<Health> {
    return this.post('health/saveJinZhuTiJian', health);
  }
  // 根据id获得体检对象
  getHealthById(id: string): Observable<Health> {
    return this.post('health/getHealthById', id);
  }
  // 删除体检对象
  deleteHealth(health: Health): Observable<Health> {
    return this.post('health/deleteHealth', health);
  }
  // 心率查询
  selectlzXinLv(sId: StatisticDto): Observable<Array<StatisticResultDto>> {
    return this.post('health/selectlzXinLv', sId);
  }

  findHealths(query: QueryParam<Health>): Observable<SanyiPage<Health>> {
    return this.post('health/findHealth', query);
  }
  exportJinZhu(id: string, lpId: string): void {
    window.location.href = environment.SERVER_URL + 'health/noLimit_exportJinZhu/' + id + '/' + lpId;
  }
  // 导出生命体征
  exportTiZheng(lpId: string): void {
    window.location.href = environment.SERVER_URL + 'health/noLimit_exportTiZheng/' + lpId;
  }
  // 导出长期用药记录
  exportYongYao( lpId: string, yongyaoType: string): void {
    window.location.href = environment.SERVER_URL + 'health/noLimit_exportYongYao/' + yongyaoType + '/' + lpId;
  }
  // 导出临时用药记录
  exportLinShiYongYao(id: string, lpId: string, healthId: string): void {
    window.location.href = environment.SERVER_URL + 'health/noLimit_exportYongYaoLinShi/' + id + '/' + lpId + '/' + healthId;
  }
  // 导出特殊情况
  exportSpecial(lpId: string): void {
    window.location.href = environment.SERVER_URL + 'health/noLimit_exportSpecial/' + lpId;
  }
}
