import {Tanhuashenqing} from '../model/Tanhuashenqing';
import { QueryParam } from '../model/page/QueryParam';
import { SanyiPage } from '../model/page/SanyiPage';
import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs/index';
import { environment } from '@env/environment';

/**
 * TanhuashenqingService 对应后台controller
 * create by gaojianhui
 */
@Injectable({
  providedIn: 'root'
})
export class  TanhuashenqingService extends ApiService {
  // 查询
  findTanhuashenqing(query: QueryParam<Tanhuashenqing>): Observable<SanyiPage<Tanhuashenqing>> {
    return this.post('tanhuashenqing/findTanhuashenqing', query);
  }
  // 保存或者修改谈话申请对象
  saveTanhuashenqing(tanhuashenqing: Tanhuashenqing): Observable<Tanhuashenqing> {
    return this.post('tanhuashenqing/saveTanhuashenqing', tanhuashenqing);
  }
  // 根据id获得谈话申请对象
  findTanhuashenqingById(id: string): Observable<Tanhuashenqing> {
    return this.post('tanhuashenqing/findTanhuashenqingById', id);
  }
  // 删除谈话申请对象
  deleteTanhuashenqing(tanhuashenqing: Tanhuashenqing): Observable<Tanhuashenqing> {
    return this.post('tanhuashenqing/deleteTanhuashenqing', tanhuashenqing);
  }

  // 审批 谈话申请对象
  saveTanhuashenqingTongyi(tanhuashenqing: Tanhuashenqing): Observable<Tanhuashenqing> {
    return this.post('tanhuashenqing/saveTanhuashenqingTongyi', tanhuashenqing);
  }
  // 审批 谈话申请对象
  saveTanhuashenqingJujue(tanhuashenqing: Tanhuashenqing): Observable<Tanhuashenqing> {
    return this.post('tanhuashenqing/saveTanhuashenqingJujue', tanhuashenqing);
  }
  // 导出 ----谈话名单查询
  lienTanhuashenqinginExport(id: string): void {
    window.location.href = environment.SERVER_URL + 'tanhuashenqing/noLimit_lienTanhuashenqinginExport/' + id;
  }



  // 导出 ----谈话名单查询
  exportTanHuaAll(kanhuliliang: string):Observable<Blob> {
    return this.post('tanhuashenqing/noLimit_lienTanhuashenqinginExportAll',kanhuliliang,
       {responseType:'blob'});

  }
  // 解除立方门禁系统中的人员权限
  unregisteruserDoorArea(tanhuashenqingOld: Tanhuashenqing) {
    return this.post('tanhuashenqing/unregisteruserDoorArea', tanhuashenqingOld);
  }
}
