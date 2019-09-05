import {Injectable} from '@angular/core';
import {ApiService} from './api.service';
import {Observable} from 'rxjs/index';
import {Drug} from '../model/Drug';
import { environment } from '@env/environment';

/**
 * DrugService 对应后台controller
 * create by gaojianhui
 */
@Injectable({
  providedIn: 'root'
})
export class  DrugService extends ApiService {
  // 保存或者修改药品对象
  saveDrug(drug: Drug): Observable<Drug> {
    return this.post('drug/saveDrug', drug);
  }
  // 根据id获得药品对象
  getDrugById(id: string): Observable<Drug> {
    return this.post('drug/getDrugById', id);
  }
  // 删除药品对象
  deleteDrug(drug: Drug): Observable<Drug> {
    return this.post('drug/deleteDrug', drug);
  }
  // 导出药品库费用统计
  exportDrugFeiYong( start: string, end: string,drugNameString : string): void {
    window.location.href = environment.SERVER_URL + 'drug/noLimit_exportDrugFeiYong/' + start + '/' + end+ '/' + drugNameString;
  }

}
