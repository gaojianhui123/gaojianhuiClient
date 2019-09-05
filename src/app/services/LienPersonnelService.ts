import { LienPersonnelBzDto } from '../model/LienPersonnelBzDto';
import { DoorMunDto } from '../model/dto/doorMunDto';
import {LienPersonnel} from '../model/LienPersonnel';
import {QueryParam} from '../model/page/QueryParam';
import {SanyiPage} from '../model/page/SanyiPage';
import {environment} from '@env/environment';
import {ApiService} from './api.service';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LienPersonnelService extends ApiService {

  // 查找保障审批
  selectLienPersonnelJoinBz(query: QueryParam<LienPersonnelBzDto>): Observable<SanyiPage<LienPersonnelBzDto>> {
    return this.post('lienPersonnel/selectLienPersonnelJoinBz', query);
  }
  // 查找房门号
  findDoorMuns(query: DoorMunDto): Observable<Array<DoorMunDto>> {
    return this.post('lienPersonnel/findDoorMuns', query);
  }
  // 查找活动
  findLienPersonnels(query: QueryParam<LienPersonnel>): Observable<SanyiPage<LienPersonnel>> {
    return this.post('lienPersonnel/findLienPersonnels', query);
  }

  deleteLienPersonnel(lienPersonnel: LienPersonnel): Observable<LienPersonnel> {
    return this.post('lienPersonnel/deleteLienPersonnel', lienPersonnel);
  }
  findLienPersonnelById(id: String): Observable<LienPersonnel> {
    return this.post('lienPersonnel/findLienPersonnelById', id);
  }
  saveLienPersonnel(query: LienPersonnel): Observable<LienPersonnel> {
    return this.post('lienPersonnel/saveLienPersonnel', query);
  }
  // 解除立方门禁系统中的人员权限
  unregisteruserDoorArea(lienPersonnel: LienPersonnel) {
    return this.post('lienPersonnel/unregisteruserDoorArea', lienPersonnel);
  }

  /**
   *
   * @param {LienPersonnel} query
   * @returns {Observable<LienPersonnel>}
   */
  getCountLienPerson() {
    return this.post('/lienPersonnel/nolimit_countLienPerson');
  }
  getCountLienPersonByFloor(floor:string) {
    return this.post('/lienPersonnel/nolimit_countLienPersonByFloor', floor);
  }
  /**
   * 提醒
   * @param id
   */
  exportTiXing(id: string): void {
    window.location.href = environment.SERVER_URL + 'lienPersonnel/noLimit_exportDaoChu/' + id;
  }
  // 导出 天津市监委水上基地在点被调查对象情况一览表
  // status = '0' 说明导出的是在点人员列表
  // status = '1' 说明导出的是撤离人员列表
  exportLiuZhiRen(status: string): void {
    window.location.href = environment.SERVER_URL + 'lienPersonnel/noLimit_exportLiuZhiRenExcel/' + status;
  }
}
