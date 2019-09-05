/**
 * Created by wuzhenxue on 2017/9/2.
 */
export class BaseEntity {
    id: string;
    createtime: string;
    title: string;
    deleted: boolean;
    createrid: string;
    constructor(id ?: string) {
      this.id = id;
    }
}
