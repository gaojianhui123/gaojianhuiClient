import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs/index';
import { LienPersonnelTanHuaRelate } from '../model/LienPersonnelTanHuaRelate';
import { Nurse } from '../model/Nurse';

/**
 * LienPersonnelTanHuaRelateService 对应后台controller
 * create by gaojianhui 2019年3月12日11:15:16
 */
@Injectable({
  providedIn: 'root'
})
export class  LienPersonnelTanHuaRelateService extends ApiService {
  // 根据id获得对象
  getLienPersonnelTanHuaRelateById(id: string): Observable<LienPersonnelTanHuaRelate> {
    return this.post('lienPersonnelTanHuaRelate/getLienPersonnelTanHuaRelateById', id);
  }
  // 根据lpid  和 nurseId获得对象
  getLienPersonnelTanHuaRelateByLpIdAndNurseId(nurse: Nurse): Observable<Array<LienPersonnelTanHuaRelate>> {
    return this.post('lienPersonnelTanHuaRelate/getLienPersonnelTanHuaRelateByLpIdAndNurseId', nurse);
  }
  // 删除关联对象
  deletedLienPersonnelTanHua(lienPersonnelTanHuaRelate: LienPersonnelTanHuaRelate): Observable<void> {
    return this.post('lienPersonnelTanHuaRelate/deletedLienPersonnelTanHua', lienPersonnelTanHuaRelate);
  }

  // 根据nurseId 查询谈话记录表列表
  findLPTanHuaRelateByNurseId(nurseId: string): Observable<Array<LienPersonnelTanHuaRelate>> {
    return this.post('lienPersonnelTanHuaRelate/findLPTanHuaRelateByNurseId', nurseId);
  }
  //  保存对象
  saveLienPersonnelTanHuaRelate(lienPersonnelTanHuaRelateFather: LienPersonnelTanHuaRelate): Observable<LienPersonnelTanHuaRelate> {
    return this.post('lienPersonnelTanHuaRelate/saveLienPersonnelTanHuaRelate', lienPersonnelTanHuaRelateFather);
  }
}
