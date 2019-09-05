import {QueryParam} from '../model/page/QueryParam';
import {SanyiPage} from '../model/page/SanyiPage';
import {environment} from '@env/environment';
import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs/index';
import {Nurse} from '../model/Nurse';
import { StatisticTanHuaDto } from '../model/dto/StatisticTanHuaDto';

/**
 * ParkingService 对应后台controller
 */
@Injectable({
  providedIn: 'root'
})
export class NurseService extends ApiService {
  // 查找活动
  findNurse(query: QueryParam<Nurse>): Observable<SanyiPage<Nurse>> {
    return this.post('nurse/findNurse', query);
  }
 // 保存
  saveNurse(query: Nurse): Observable<Nurse> {
    return this.post('nurse/saveNurse', query);
  }
  // 根据谈话申请id获取谈话记录对象
  findNurseByTanHuaShenQingId(tanHuaShenQingId: String): Observable<Nurse> {
    return this.post('nurse/findNurseByTanHuaShenQingId', tanHuaShenQingId);
  }
  // 根据id 查
  findNurseById(id: String): Observable<Nurse> {
    return this.post('nurse/findNurseById', id);
  }
  // 删除
  deleteNurse(query: Nurse): Observable<Nurse> {
    return this.post('nurse/deleteNurse', query);
  }
  // 导出日报 参数为上报时间
  exportTalkSafe(submitTime: string): void {
    window.location.href = environment.SERVER_URL + 'nurse/noLimit_exportTalkSafeExcel/' + submitTime;
  }
  // 导出谈话时间表 参数为上报时间
  exportTalkTime(submitTime: string): void {
    window.location.href = environment.SERVER_URL + 'nurse/noLimit_exportTalkTime/' + submitTime;
  }
  // 留置人员谈话情况统计
  statisticTanHua(sDto: StatisticTanHuaDto): Observable<Array<StatisticTanHuaDto>> {
    return this.post('nurse/statisticTanHua', sDto);
  }
// 根据留置人id 和 上报时间查找出来对应的那一条谈话记录对象nurse
  getNurseByLpIdAndTime(nurse: Nurse): Observable<Nurse> {
    return this.post('nurse/getNurseByLpIdAndTime', nurse);
  }
}
