import {ApiService} from './api.service';
import {Injectable} from '@angular/core';
import {QueryParam} from '../model/page/QueryParam';
import {Observable} from 'rxjs';
import {SanyiPage} from '../model/page/SanyiPage';
import {Feedback} from '../model/Feedback';
import {environment} from '@env/environment';
/**
 * FeedbackService 对应后台controller
 */
@Injectable({
  providedIn: 'root'
})

export class  FeedbackService extends ApiService {
  // 查找
  findFeedback(query: QueryParam<Feedback>): Observable<SanyiPage<Feedback>> {
    return this.post('feedback/findFeedback', query);
  }
  // 保存
  saveFeedback(query: Feedback): Observable<Feedback> {
    return this.post('feedback/saveFeedback', query);
  }
  // 保存 问题反馈改进
  saveFeedbackQuestion(query: Feedback): Observable<Feedback> {
    return this.post('feedback/saveFeedbackQuestion', query);
  }
  // 根据id 查
  findFeedbackById(id: String): Observable<Feedback> {
    return this.post('feedback/findFeedbackById', id);
  }
  // 删除
  deleteFeedback(query: Feedback): Observable<Feedback> {
    return this.post('feedback/deleteFeedback', query);
  }
  // 导出（执纪审查点安全工作改进建议单）
  exportDaoChu(id: string): void {
    window.location.href = environment.SERVER_URL + 'feedback/noLimit_exportDaoChu/' + id;
  }
  // 导出（天津市监委水上基地讯问及安全情况日报）
  exportTalkSafe(id: string): void {
    console.log(id);
    window.location.href = environment.SERVER_URL + 'feedback/noLimit_exportTalkSafe/' + id;
  }
  // 导出（天津市监委水上基地讯问时间表）
  exportTalkTime(id: string): void {
    console.log(id);
    window.location.href = environment.SERVER_URL + 'feedback/noLimit_exportTalkTime/' + id;
  }

}
