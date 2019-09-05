import {LienPersonnelService} from '../../../services/LienPersonnelService';
import {FeedbackService} from '../../../services/FeedbackService';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import { Component, OnInit, ViewChild } from '@angular/core';
import {LienPersonnel} from '../../../model/LienPersonnel';
import { SanyiSort } from '../../../model/page/SanyiSort';
import {QueryParam} from '../../../model/page/QueryParam';
import {STColumn, STComponent, STData} from '@delon/abc';
import { _HttpClient, ModalHelper } from '@delon/theme';
import {SFComponent, SFSchema} from '@delon/form';
import {Feedback} from '../../../model/Feedback';
import {environment} from '@env/environment';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-feedback-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class FeedbackListComponent implements OnInit {
  url = environment.SERVER_URL + `feedback/findFeedback`;
  queryParam: QueryParam<Feedback> = new QueryParam<Feedback>();
  query: QueryParam<LienPersonnel> = new QueryParam<LienPersonnel>();
  searchSchema: SFSchema = {
    properties: {
      lienPersonnelid: {
        type: 'string',
        title: '代号',
        ui: {
          width: 300,
          widget: 'select',
          showSearch: true,
          serverSearch: true,
          allowClear: true,
          asyncData: () => {
            this.query.paging = false;
            return  this.lienPersonnelService.findLienPersonnels(this.query).pipe(map(n => {
              n.content.map(a => {
                a.label = a.daiHao;
                a.value = a.id;
              });
              return n.content;
            }));
          },
          onSearch: (text) => {
            this.query.paging = false;
            this.query.query.daiHao = text;
            return  this.lienPersonnelService.findLienPersonnels(this.query).pipe(map(n => {
              n.content.map(a => {
                a.label = a.daiHao;
                a.value = a.id;
              });
              return n.content;
            })).toPromise();
          },
          dropdownMatchSelectWidth: false,
        }
      },
      fkTime: {
        type: 'string',
        title: '反馈日期',
        format: 'date',
        ui: {
          width: 300,
          widget: 'date',
        }
      },
    }
  };
  @ViewChild('st') st: STComponent;
  @ViewChild('sf') sf: SFComponent;
  columns: STColumn[] = [
    {title: '编号', type : 'no'},
    {title: '代号', index: 'daiHao', sort: true},
    {title: '姓名', index: 'lzName'},
    {title: '性别',  index: 'lzSexName'},
    {title: '年龄', index: 'lzAge'},
    {title: '职级', index: 'lzZhiJiName'},
    {title: '进驻日期', type : 'date', index: 'enterTime',  dateFormat: 'YYYY-MM-DD'},
    { title: '问题反馈时间', index: 'fkTime'},
    { title: '部门', index: 'department' },
    {
      title: '操作区',
      buttons: [
        { text: '编辑', type: 'static', click: (item: any) => (this.Edit(item.id)) },
        { text: '删除', type: 'static', click: (data: any) => (this.Delete(data)) },
        { text: '执纪审查安全工作改进建议单', type: 'static', click: (item: any) => (this.exportDaoChu(item)) },
      ]
    }
  ];
  constructor(private http: _HttpClient, private modal: ModalHelper, private messageService: NzMessageService,
              private modalService: NzModalService,  private router: Router, private lienPersonnelService: LienPersonnelService,
              private  feedbackService: FeedbackService ) { }
  ngOnInit() {
    // 修改排序方式
    const sanyiSort = new SanyiSort();
    sanyiSort.directionMethod = 'DESC';
    sanyiSort.sortName = 'fkTime';
    this.queryParam.sort = sanyiSort;
  }
  // 通过response返回数据，预先处理业务需求
  processData = (data: STData[]) => {
    data.map(d => {
      switch (d.lzSex) {
        case '1':
          d.lzSexName = '男';
          break;
        case '2':
          d.lzSexName = '女';
          break;
        default:
          d.lzSexName = '';
      }
    });
    data.map(d => {
      switch (d.lzZhiJi) {
        case '1':
          d.lzZhiJiName = '局级以上';
          break;
        case '2':
          d.lzZhiJiName = '局级';
          break;
        case '3':
          d.lzZhiJiName = '副局级';
          break;
        case '4':
          d.lzZhiJiName = '处级';
          break;
        case '5':
          d.lzZhiJiName = '副处级';
          break;
        case '6':
          d.lzZhiJiName = '科级';
          break;
        case '7':
          d.lzZhiJiName = '副科级';
          break;
        case '8':
          d.lzZhiJiName = '科级以下';
          break;
        default:
          d.lzZhiJiName = '';
      }
    });
    return data;
  }
  // 编辑
  Edit(id: any) {
    this.router.navigate(['/feedbacksave', {id: id}]);
  }
  // 删除
  Delete(data: any) {
    console.log(data);
    this.modalService.confirm({
      // nzTitle     : '确定要删除 ' + data.controlNo + ' 办案人员吗？',
      nzTitle     : '确定要删除此条问题反馈吗？',
      nzContent   : '<b style="color: #ff0000;">删除后将不可恢复！</b>',
      nzOkType    : 'danger',
      nzOnOk      : () => {
        this.feedbackService.deleteFeedback(data).subscribe(res => {
          this.messageService.success('删除成功');
          this.st.reload();
        });
      },
      nzCancelText: '取消',
      nzOnCancel  : () => console.log('Cancel')
    });
  }
  // 导出执纪审查点安全工作改进建议单
  exportDaoChu(item: any): void {
    this.feedbackService.exportDaoChu(item.id);
  }
  // 重置按钮
  reset($event) {
    this.queryParam.query = new Feedback();
    // 修改排序方式
    const sanyiSort = new SanyiSort();
    sanyiSort.directionMethod = 'DESC';
    sanyiSort.sortName = 'fkTime';
    this.queryParam.sort = sanyiSort;
    this.st.load($event);
  }

}
