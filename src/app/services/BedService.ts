import { QueryParam } from '../model/page/QueryParam';
import { SanyiPage } from '../model/page/SanyiPage';
import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs/index';
import { Bed } from '../model/Bed';

/**
 * RoomService 对应后台房间
 * create by gaojianhui
 * 2019年5月30日16:47:07
 */
@Injectable({
  providedIn: 'root'
})
export class  BedService extends ApiService {
  // 获取列表
  findBed(query: QueryParam<Bed>): Observable<SanyiPage<Bed>> {
    return this.post('bed/findBed', query);
  }
  // 获取列表(myBatis)
  findBedByMybatis(query: QueryParam<Bed>): Observable<SanyiPage<Bed>> {
    return this.post('bed/findBedByMybatis', query);
  }
  // 保存或者修改房间对象
  saveBed(bed: Bed): Observable<Bed> {
    return this.post('bed/saveBed', bed);
  }
  // 根据id获得房间对象
  getBedById(id: string): Observable<Bed> {
    return this.post('bed/getBedById', id);
  }


}
