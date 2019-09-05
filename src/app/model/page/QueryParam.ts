import {SanyiSort} from './SanyiSort';
import {SanyiPageable} from './SanyiPageable';
import {BaseEntity} from '../BaseEntity';
/**
 * Created by wuzhenxue on 2018/10/11.
 */
export class QueryParam <T extends BaseEntity> {
  page: SanyiPageable = new SanyiPageable() ;
  sort: SanyiSort = new SanyiSort();
  paging = true;
  query: T = <T>{};
  sortparam: string;
}
