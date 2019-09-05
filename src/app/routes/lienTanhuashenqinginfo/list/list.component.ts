import {TanhuashenqingService} from '../../../services/TanhuashenqingService';
import {LienPersonnelService} from '../../../services/LienPersonnelService';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import { Component, OnInit, ViewChild } from '@angular/core';
import {Tanhuashenqing} from '../../../model/Tanhuashenqing';
import { SanyiSort } from '../../../model/page/SanyiSort';
import {QueryParam} from '../../../model/page/QueryParam';
import {STColumn, STComponent, STData} from '@delon/abc';
import { _HttpClient, ModalHelper } from '@delon/theme';
import {environment} from '@env/environment.prod';
import { User } from '../../../model/User';
import {Router} from '@angular/router';
import { SFSchema } from '@delon/form';
import { LienPersonnel } from '../../../model/LienPersonnel';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-lien-tanhuashenqinginfo-list',
  templateUrl: './list.component.html',
})
export class TanhuashenqinginfoListComponent implements OnInit {
  currentUser: User;
  url = environment.SERVER_URL + `tanhuashenqing/findTanhuashenqing`;
  query: QueryParam<Tanhuashenqing> = new QueryParam<Tanhuashenqing>();
  searchSchema: SFSchema = {
    properties: {
      lpId: {
        type: 'string',
        title: '代号',
        ui: {
          width: 300,
          widget: 'select',
          showSearch: true,
          serverSearch: true,
          allowClear: true,
          asyncData: () => {
            const querySelect = new QueryParam<LienPersonnel>();
            querySelect.paging = false;
            return  this.lienPersonnelService.findLienPersonnels(querySelect).pipe(map(n => {
              n.content.map(a => {
                a.label = a.daiHao;
                a.value = a.id;
              });
              return n.content;
            }));
          },
          onSearch: (text) => {
            const querySelect1 = new QueryParam<LienPersonnel>();
            querySelect1.paging = false;
            querySelect1.query.daiHao = text;
            return  this.lienPersonnelService.findLienPersonnels(querySelect1).pipe(map(n => {
              n.content.map(a => {
                a.label = a.daiHao;
                a.value = a.id;
              });
              return n.content;
            })).toPromise();
          },
          dropdownMatchSelectWidth: false,
        }
      }
    }
  };
  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    {title: '编号', type : 'no'},
    {title: '代号', index: 'daiHao', sort: true},
    {title: '上报人姓名', index: 'tianbaoren'},
    {title: '性别',  index: 'lzSexName'},
    {title: '年龄', index: 'lzAge'},
    {title: '职级', index: 'lzZhiJiName'},
    {title: '进驻日期', type : 'date', index: 'lpTime',  dateFormat: 'YYYY-MM-DD'},
    {title: '谈话申请时间', type : 'date', index: 'tianBaoTime', dateFormat: 'YYYY-MM-DD'},
    { title: '操作区',
      buttons: [{ text: '编辑', click: (item: any) => this.goToEdit(item.id) },
                { text: '删除', click: (item: any) => this.goToDeleted(item) }
      ]
    }
  ];
  constructor(private http: _HttpClient, private modal: ModalHelper, private msgSrv: NzMessageService,
              private modalService: NzModalService, private lienPersonnelService: LienPersonnelService,
              private router: Router, private tanhuashenqingService: TanhuashenqingService) {
    this.currentUser = this.tanhuashenqingService.getCurrentUser();
  }
  // 通过response返回数据，预先处理业务需求
  processData = (data: STData[]) => {
    data.map( d => {
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
    data.map( d => {
      switch (d.lpZhiji) {
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
    return data; }
  ngOnInit() {
    // 修改排序方式
    const sanyiSort = new SanyiSort();
    sanyiSort.directionMethod = 'DESC';
    sanyiSort.sortName = 'daiHao';
    this.query.sort = sanyiSort;
  }
  add() {
    this.router.navigate(['/lienTanhuashenqinginfo/lienTanhuashenqinginfosave']);
  }
  // 编辑
  goToEdit(id: any) {
    this.router.navigate(['/lienTanhuashenqinginfo/lienTanhuashenqinginfosave', {id: id}]);
  }
  goToDeleted (item: any) {
    this.modalService.confirm({
      nzTitle: '确定要删除代号 ' + item.daihao + ' 谈话申请？',
      nzContent: '<b style="color: #ff0000;">删除后将不可恢复！</b>',
      nzOkText: '确定',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.tanhuashenqingService.deleteTanhuashenqing(item).subscribe((res) => {
          this.msgSrv.success('删除成功');
          this.st.reload();
        });
      },
      nzCancelText: '取消',
      nzOnCancel: () => console.log('Cancel')
    });
  }
  load(query) {
    const sanyiSort = new SanyiSort();
    sanyiSort.directionMethod = 'DESC';
    sanyiSort.sortName = 'tianBaoTime';
    this.query.sort = sanyiSort;
    this.st.load(query);
  }
  reset($event) {
    this.query.query = new Tanhuashenqing();
    // 修改排序方式
    const sanyiSort = new SanyiSort();
    sanyiSort.directionMethod = 'DESC';
    sanyiSort.sortName = 'tianBaoTime';
    this.query.sort = sanyiSort;
    this.query.query.bumen = this.currentUser.bumenId;
    this.st.load($event);
  }
}

