import {LienPersonnelService} from '../../../services/LienPersonnelService';
import {environment} from '../../../../environments/environment';
import {Tanhuashenqing} from '../../../model/Tanhuashenqing';
import { Component, OnInit, ViewChild } from '@angular/core';
import {LienPersonnel} from '../../../model/LienPersonnel';
import {QueryParam} from '../../../model/page/QueryParam';
import { SanyiSort } from '../../../model/page/SanyiSort';
import {STColumn, STComponent, STData} from '@delon/abc';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { User } from '../../../model/User';
import { SFSchema } from '@delon/form';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import { TanhuashenqingService } from '../../../services/TanhuashenqingService';
import { DictionaryService } from '../../../services/DictionaryService';
import { Dictionary } from '../../../model/Dictionary';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { getResponseURL } from '@angular/http/src/http_utils';
import { parseHttpResponse } from 'selenium-webdriver/http';
import { isIE } from 'ngx-bootstrap/positioning/utils/isIE';


@Component({
  selector: 'app-talklist-list',
  templateUrl: './list.component.html',
})
export class TalklistListComponent implements OnInit {
  currentUser: User;
  url = environment.SERVER_URL + `tanhuashenqing/talklist`;
  queryParam: QueryParam<Tanhuashenqing> = new QueryParam<Tanhuashenqing>();
  query: QueryParam<LienPersonnel> = new QueryParam<LienPersonnel>();
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
            this.query.paging = false;
            this.query.query.outStatus="0";
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
            this.query.query.outStatus="0";
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
      bumen: {
        type: 'string',
        title: '谈话单位',
        ui: {
          width: 300,
          widget: 'select',
          showSearch: true,
          serverSearch: true,
          allowClear: true,
          asyncData: () => {
            const untilQuery = new QueryParam<Dictionary>();
            untilQuery.query.dsId = '4028928b6781689b016782290b030001';
            untilQuery.paging = false;
            return  this.dictionaryService.findDictionary(untilQuery).pipe(map(n => {
              n.content.map(a => {
                a.label = a.dicName;
                a.value = a.id;
              });
              return n.content;
            }));
          },
          onSearch: (text) => {
            const untilQuery = new QueryParam<Dictionary>();
            untilQuery.query.dicName = text;
            untilQuery.query.dsId = '4028928b6781689b016782290b030001';
            untilQuery.paging = false;
            return  this.dictionaryService.findDictionary(untilQuery).pipe(map(n => {
              n.content.map(a => {
                a.label = a.dicName;
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
    { title: '编号', type: 'no' },
    { title: '代号',  index: 'daiHao', sort: true },
    { title: '谈话单位',  index: 'bumenString', sort: true },
    { title: '填报日期', index: 'tianBaoTime' },
    { title: '审批状态', index: 'shenpiStatusName' },
    { title: '操作区', buttons: [
      {text: '查看', click: (item: any) => this.goToView(item)},
      {text: '导出', click: (item: any) => this.goExport(item.id)}
        ] }
  ];
  processData = (data: STData[]) => {
    data.map( d => {
      switch (d.cuoShiType) {
        case '0':
          d.cuoShiTypeName = '留置';
          break;
        case '1':
          d.cuoShiTypeName = '监拘';
          break;
      }
    });
    data.map( d => {
      switch (d.shenpiStatus) {
        case '0':
          d.shenpiStatusName = '未审批';
          break;
        case '1':
          d.shenpiStatusName = '已审批';
          break;
        default:
          d.shenpiStatusName = '未发起谈话';
      }
    });
    return data;
  }
  constructor(private http: _HttpClient, private modal: ModalHelper, private router: Router,
              private  lienPersonnelService: LienPersonnelService, private  tanhuashenqingService: TanhuashenqingService,
              private  dictionaryService: DictionaryService ,private modalService: NzModalService,private message: NzMessageService) {
    this.currentUser = this.lienPersonnelService.getCurrentUser();
  }
  ngOnInit() {
    this.query.query.kanhuLiLiang = this.currentUser.kanhuId;
    // 修改排序方式
    const sanyiSort = new SanyiSort();
    sanyiSort.directionMethod = 'DESC';
    sanyiSort.sortName = 'daiHao';
    this.queryParam.sort = sanyiSort;
    if (this.currentUser.kanhuId) {
      this.queryParam.query.kanhuLiLiang = this.currentUser.kanhuId;
    }
  }
  // 查看
  goToView(item: any) {
    this.router.navigate(['/talklist/talklistView', {id: item.id}]);
  }
  // 导出
  goExport(id: any) {
    this.tanhuashenqingService.lienTanhuashenqinginExport(id);
  }
  isdisabled=0;

  exportTanHuaAll(){
    this.modalService.confirm({
      nzTitle: '导出数据需要较长时间请耐心等待',
      nzContent: '<b style="color: #ff0000;">确定导出所有数据？</b>',
      nzOkText: '确定',
      nzOnOk: () => {
        this.isdisabled=1;
        const id = this.message.loading('数据正在下载，在此期间请勿重复点击导出和关闭浏览器', { nzDuration: 0 }).messageId;

        this.tanhuashenqingService.exportTanHuaAll(this.currentUser.kanhuId).subscribe((result) => {
          this.message.remove(id);
          this.isdisabled=0;
          var blob = new Blob([result],{type:"application/vnd.ms-excel"})

          var fileName = "纪律审查备案表汇总.xls";
          var u = navigator.userAgent;
          //判断IE
          if(u.indexOf('Trident') > -1){
            window.navigator.msSaveOrOpenBlob(blob,fileName);
          }else {
            var objectUrl = URL.createObjectURL(blob);
            var a = document.createElement("a");
            document.body.appendChild(a);
            a.setAttribute('style', 'display:none');
            a.setAttribute('href', objectUrl);
            a.setAttribute('download', "纪律审查备案表汇总");
            a.click();
            debugger;
            URL.revokeObjectURL(objectUrl);
          }
        });

      },
      nzCancelText: '取消',
      nzOnCancel: () => console.log('Cancel')
    });

  }
  // 查询按钮
  load(queryParam) {
    this.queryParam.query.kanhuLiLiang = this.currentUser.kanhuId;
    // 修改排序方式
    const sanyiSort = new SanyiSort();
    sanyiSort.directionMethod = 'ASC';
    sanyiSort.sortName = 'shenpiStatus';
    this.queryParam.sort = sanyiSort;
    this.st.load(queryParam);
  }
  // 重置按钮
  reset($event) {
    this.queryParam.query = new Tanhuashenqing();
    // 修改排序方式
    const sanyiSort = new SanyiSort();
    sanyiSort.directionMethod = 'ASC';
    sanyiSort.sortName = 'shenpiStatus';
    this.queryParam.sort = sanyiSort;
    this.queryParam.query.kanhuLiLiang = this.currentUser.kanhuId;
    this.st.load($event);
  }
}
