import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import {STColumn, STComponent, STData} from '@delon/abc';
import { SFSchema } from '@delon/form';
import {environment} from '@env/environment';
import {QueryParam} from '../../../model/page/QueryParam';
import {Drug} from '../../../model/Drug';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import {DrugService} from '../../../services/DrugService';
import {Router} from '@angular/router';

@Component({
  selector: 'app-drug-list',
  templateUrl: './list.component.html',
})
export class DrugListComponent implements OnInit {
  url = environment.SERVER_URL + `drug/findDrugs`;
  query: QueryParam<Drug> = new QueryParam<Drug>();
  searchSchema: SFSchema = {
    properties: {
      drugNameString: {
        type: 'string',
        title: '药品名称',
        ui: {
          width: 300
        }
      },

    start: {
      type: 'string',
      format: 'date',
      title: '入库时间',
      ui: {
        width: 300,
        widget: 'date',
        end: 'end' }
    },
    end: {
      type: 'string',
      format: 'date',
      ui: {
        width: 300,
        widget: 'date',
        end: 'end' }
    },
    }
  };
  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    { title: '序号', type: 'no' },
    { title: '药品名称',  index: 'drugNameString', sort: true },
    { title: '入库时间',  index: 'rukuTime' },
    { title: '数量',  index: 'drugTotalCount' },
    { title: '单位', index: 'unit' },
    { title: '单价',  index: 'price' },
    { title: '费用',  index: 'cost' },
    { title: '入库医生',  index: 'doctor' },
    {
      title: '操作区',
      buttons: [
        // { text: '查看', click: (item: any) => `/form/${item.id}` },
        { text: '编辑', type: 'static',  click: (item: any) => this.goToEdit(item.id) },
        { text: '删除', type: 'static', click: (data: any) => this.deletedDrug(data) }
      ]
    }
  ];

  constructor(private http: _HttpClient, private modal: ModalHelper,
              private modalService: NzModalService, private msgSrv: NzMessageService,
              private drugService: DrugService, private router: Router) { }

  ngOnInit() { }
// 对数据进行修改显示
  processData = (data: STData[]) => {
    data.map( d => {});
    return data;
  }
  /**
   * 新增
   */
  add() {
    this.router.navigate(['/drugsave']);
  }

  /**
   * 删除药品库信息
   * @param data
   */
  deletedDrug(data): void {
    this.modalService.confirm({
      nzTitle     : '确定要删除这条药品？',
      nzContent   : '<b style="color: #ff0000;">删除后将不可恢复！</b>',
      nzOkText    : '确定',
      nzOkType    : 'danger',
      nzOnOk      : () => {
        this.drugService.deleteDrug(data).subscribe(res => {
          this.msgSrv.success('删除成功');
          this.st.reload();
        });
      },
      nzCancelText: '取消',
      nzOnCancel  : () => console.log('Cancel')
    });
  }
// 编辑
  goToEdit(id: any) {
    this.router.navigate(['/drugsave', {id: id}]);
  }
  reset($event) {
    debugger
    this.query.query = new Drug();
    this.st.load($event);
  }

  // 导出费用统计
  exportDrugFeiYong() {
    this.drugService.exportDrugFeiYong( this.query.query.start, this.query.query.end, this.query.query.drugNameString);
  }
}
