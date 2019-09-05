import { QueryParam } from '../model/page/QueryParam';
import { SanyiPage } from '../model/page/SanyiPage';
import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs/index';
import { Room } from '../model/Room';
import { environment } from '@env/environment';

/**
 * RoomService 对应后台房间
 * create by gaojianhui
 * 2019年5月30日16:47:07
 */
@Injectable({
  providedIn: 'root'
})
export class  RoomService extends ApiService {
  // 获取列表
  findRoom(query: QueryParam<Room>): Observable<SanyiPage<Room>> {
    return this.post('room/findRoom', query);
  }
  // 获取列表(myBatis)
  findRoomByMybatis(query: QueryParam<Room>): Observable<SanyiPage<Room>> {
    return this.post('room/findRoomByMybatis', query);
  }
  // 保存或者修改房间对象
  saveRoom(room: Room): Observable<Room> {
    return this.post('room/saveRoom', room);
  }
  // 根据id获得房间对象
  getRoomById(id: string): Observable<Room> {
    return this.post('room/getRoomById', id);
  }

  // 根据固定的值查询获取房间对象
  getRoomByFixationValue(key: string): Observable<Room> {
    return this.post('room/getRoomByFixationValue', key);
  }
  // 导出
  exportRoom (selectValue: string): void {
    window.location.href = environment.SERVER_URL + 'room/noLimit_exportRoom/' + selectValue;
  }
}
