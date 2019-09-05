import { LienPersonnelService } from '../../../services/LienPersonnelService';
import { FeedbackService } from '../../../services/FeedbackService';
import { JianyidanListEditComponent } from './edit/edit.component';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { Component, OnInit, ViewChild } from '@angular/core';
import { LienPersonnel } from '../../../model/LienPersonnel';
import { QueryParam } from '../../../model/page/QueryParam';
import { STColumn, STComponent, STData } from '@delon/abc';
import { ActivatedRoute, Router } from '@angular/router';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { SFComponent, SFSchema } from '@delon/form';
import { Feedback } from '../../../model/Feedback';
import { environment } from '@env/environment';
import { User } from '../../../model/User';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-jianyidan-list',
  templateUrl: './list.component.html',
})
export class JianyidanListComponent implements OnInit {
  currentUser: User;
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
            return this.lienPersonnelService.findLienPersonnels(this.query).pipe(map(n => {
              n.content.map(a => {
                a.label = a.daiHao;
                a.value = a.id;
              });
              return n.content;
            }));
          },
          onSearch: (text) => {
            this.query.query.daiHao = text;
            return this.lienPersonnelService.findLienPersonnels(this.query).pipe(map(n => {
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
    }
  };
  @ViewChild('st') st: STComponent;
  @ViewChild('sf') sf: SFComponent;
  columns: STColumn[] = [
    { title: '编号', type: 'no' },
    { title: '代号', index: 'daiHao', sort: true },
    { title: '姓名', index: 'lzName' },
    { title: '性别', index: 'lzSexName' },
    { title: '年龄', index: 'lzAge' },
    { title: '职级', index: 'lzZhiJiName' },
    { title: '进驻日期', type: 'date', index: 'enterTime', dateFormat: 'YYYY-MM-DD' },
    {
      title: '操作区',
      buttons: [
        { text: '查看', type: 'static', click: (item: any) => (this.chakan(item)) },
        { text: '改进情况反馈', type: 'static', click: (item: any) => (this.GaiJin(item)) },
      ]
    }
  ];

  constructor(private http: _HttpClient, private modal: ModalHelper, private messageService: NzMessageService,
              private modalService: NzModalService, private router: Router, private feedbackService: FeedbackService,
              private lienPersonnelService: LienPersonnelService, private route: ActivatedRoute ) {
    this.currentUser = this.lienPersonnelService.getCurrentUser();
  }

  ngOnInit() {
    // const idl = this.route.snapshot.paramMap.get('idl');
    this.queryParam.query.bumenid = this.currentUser.bumenId;

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
  // 改进情况反馈
  GaiJin(item) {
    this.router.navigate(['/gaijinsave', {idl: item.id}]);
  }
  // 查看问题反馈
  chakan(item) {
    // console.log(item);
    this.modal.createStatic(JianyidanListEditComponent, { feedback: { id: item.id } }).subscribe(() => this.st.reload());
  }
  // load(queryParam) {
  //   this.queryParam.query.bumenid = this.currentUser.bumenId;
  //   this.st.load(queryParam);
  // }
  reset($event) {
    this.queryParam.query = new Feedback();
    this.queryParam.query.bumenid = this.currentUser.bumenId;
    this.st.load($event);
  }
}
