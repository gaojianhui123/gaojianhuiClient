import {ApiService} from './api.service';
import {Injectable} from '@angular/core';
import {QueryParam} from '../model/page/QueryParam';
import {Role} from '../model/Role';
import {Observable} from 'rxjs';
import {SanyiPage} from '../model/page/SanyiPage';
import {HandlingPerson} from '../model/HandlingPerson';
import { EntranceGuardStaffDto } from '../model/dto/entranceGuardStaffDto';
import { EntranceGuardDoorDto } from '../model/dto/entranceGuardDoorDto';
import { CardInfoDtos } from '../model/dto/CardInfoDtos';
/**
 * HandlingPersonService 对应后台controller
 */
@Injectable({
  providedIn: 'root'
})

export class  HandlingPersonService extends ApiService {
  //  获取门禁系统中的房门列表
  findMenjinDoors(query: EntranceGuardDoorDto): Observable<Array<EntranceGuardDoorDto>> {
    return this.post('handlingPerson/findMenjinDoors', query);
  }
  //  获取门禁系统中的人员列表
  // by Gjh
  findMenjinStaffs(query: EntranceGuardStaffDto): Observable<Array<EntranceGuardStaffDto>> {
    return this.post('handlingPerson/findMenjinStaffs', query);
  }
  // 根据卡号获取人员信息
  getemplybyserial(query: EntranceGuardStaffDto): Observable<CardInfoDtos> {
    return this.post('handlingPerson/getemplybyserial', query);
  }
  //  查询列表 获取门禁系统的查询一卡通开卡信息
  findCardInfoDtos(query: CardInfoDtos): Observable<CardInfoDtos> {
    return this.post('handlingPerson/findCardInfoDtos', query);
  }
  // 查找
  findHandlingPerson(query: QueryParam<HandlingPerson>): Observable<SanyiPage<HandlingPerson>> {
    return this.post('handlingPerson/findHandlingPerson', query);
  }
  // 保存
  saveHandlingPerson(query: HandlingPerson): Observable<HandlingPerson> {
    return this.post('handlingPerson/saveHandlingPerson', query);
  }
  // 根据id 查
  findHandlingPersonById(id: String): Observable<HandlingPerson> {
    return this.post('handlingPerson/findHandlingPersonById', id);
  }
  // 删除
  deleteHandlingPerson(query: HandlingPerson): Observable<HandlingPerson> {
    return this.post('handlingPerson/deleteHandlingPerson', query);
  }
  findHandlingPersonByIds(ids: Array<string>): Observable<HandlingPerson[]> {
    return this.post('handlingPerson/findHandlingPersonByIds', ids);
  }

}
