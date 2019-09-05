import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {QueryParam} from '../model/page/QueryParam';
import {Observable} from 'rxjs/index';
import {SanyiPage} from '../model/page/SanyiPage';
import {Catering} from '../model/Catering';

/**
 * ParkingService 对应后台controller
 */
@Injectable({
  providedIn: 'root'
})
export class CateringService extends ApiService {
  // 查找活动
  findCatering(query: QueryParam<Catering>): Observable<SanyiPage<Catering>> {
    return this.post('catering/findCatering', query);
  }
 // 保存
  saveCatering(query: Catering): Observable<Catering> {
    return this.post('catering/saveCatering', query);
  }
  // 根据id 查
  findCateringById(id: String): Observable<Catering> {
    return this.post('catering/findCateringById', id);
  }
  // 删除
  deleteCatering(query: Catering): Observable<Catering> {
    return this.post('catering/deleteCatering', query);
  }


}
