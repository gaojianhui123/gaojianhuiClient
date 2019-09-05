import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs/index';
import {Baozhangshenqing} from '../model/Baozhangshenqing';

/**
 * BaozhangshenqingService 对应后台controller
 * create by gaojianhui
 */
@Injectable({
  providedIn: 'root'
})
export class  BaozhangshenqingService extends ApiService {
  // 保存或者修改保障申请对象
  saveBaozhangshenqing(baozhangshenqing: Baozhangshenqing): Observable<Baozhangshenqing> {
    return this.post('baozhangshenqing/saveBaozhangshenqing', baozhangshenqing);
  }
  // 根据id获得保障申请对象
  findBaozhangshenqingById(id: string): Observable<Baozhangshenqing> {
    return this.post('baozhangshenqing/findBaozhangshenqingById', id);
  }
  // 删除保障申请对象
  deleteBaozhangshenqing(baozhangshenqing: Baozhangshenqing): Observable<Baozhangshenqing> {
    return this.post('baozhangshenqing/deleteBaozhangshenqing', baozhangshenqing);
  }
  // 审批同意
  tongyi(baozhangshenqing: Baozhangshenqing): Observable<Baozhangshenqing> {
    return this.post('baozhangshenqing/tongyi', baozhangshenqing);
  }
  // 审批拒绝
  jujue(baozhangshenqing: Baozhangshenqing): Observable<Baozhangshenqing> {
    return this.post('baozhangshenqing/jujue', baozhangshenqing);
  }
}
