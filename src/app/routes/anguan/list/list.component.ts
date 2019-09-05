import {LienPersonnelService} from '../../../services/LienPersonnelService';
import { Component, OnInit, ViewChild } from '@angular/core';
import {NurseService} from '../../../services/NurseService';
import {LienPersonnel} from '../../../model/LienPersonnel';
import {QueryParam} from '../../../model/page/QueryParam';
import { SanyiSort } from '../../../model/page/SanyiSort';
import { STColumn, STColumnBadge, STComponent, STData } from '@delon/abc';
import { _HttpClient, ModalHelper } from '@delon/theme';
import {environment} from '@env/environment.prod';
import { NzMessageService } from 'ng-zorro-antd';
import {Router} from '@angular/router';
import { SFSchema } from '@delon/form';
import * as moment from 'moment';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-anguan-list',
  templateUrl: './list.component.html',
})
export class AnguanListComponent implements OnInit {
  url = environment.SERVER_URL + `lienPersonnel/findLienPersonnels`;
  query: QueryParam<LienPersonnel> = new QueryParam<LienPersonnel>();
  isShowTalkSafe = false; // 初始化讯问及安全情况日报 导出时选择日期的弹框影藏标识
  isShowTalkTime = false; // 初始化基地讯问时间表 导出时选择日期的弹框影藏标识
  talkSafeRiqi: string; // 初始化  讯问及安全情况日报 的日期属性
  talkTimeRiqi: string; // 初始化  基地讯问时间表 的日期属性
  searchSchema: SFSchema = {
    properties: {
      daiHao: {
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
                a.value = a.daiHao;
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
                a.value = a.daiHao;
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
    { title: '预警',  render: 'yujing'},
    {title: '代号', index: 'daiHao', sort: true},
    {title: '姓名', index: 'lzName'},
    {title: '性别',  index: 'lzSexName'},
    {title: '年龄', index: 'lzAge'},
    {title: '职级', index: 'lzZhiJiName'},
    {title: '进驻日期', type : 'date', index: 'enterTime',  dateFormat: 'YYYY-MM-DD'},
    {title: '撤离日期', type : 'date', index: 'outTime', dateFormat: 'YYYY-MM-DD'},
    {
      title: '操作区',
      buttons: [
        { text: '查看详情', click: (item: any) => this.view(item) },
        { text: '问题反馈', click: (item: any) => this.question(item) },
        { text: '留置期限即将届满提醒函', type: 'static', click: (item: any) => (this.exportTiXing(item)) }
      ]
    }
  ];


  constructor(private http: _HttpClient, private modal: ModalHelper, private router: Router,
              private lienPersonnelService: LienPersonnelService,
              private nurseService: NurseService, private messageService: NzMessageService) { }

  ngOnInit() {
    // 修改排序方式
    const sanyiSort = new SanyiSort();
    sanyiSort.directionMethod = 'DESC';
    sanyiSort.sortName = 'enterTime';
    this.query.sort = sanyiSort;
  }
  // 通过response返回数据，预先处理业务需求
  processData = (data: STData[]) => {
    data.map( d => {
      // console.log('看这里吧', d.enterTime, d.lzQiXian);
      switch (d.lzQiXian) {
        case '1':
          // 3个月
          // console.log(d.enterTime);
          // 看一下加完3个月之后 和当前时间比较 如果大于当前时间则说明是不需要预警 如果小于当前时间 则需要预警
          // console.log(moment(d.enterTime).add(35, 'months'));
          if (moment(d.enterTime).add(2, 'months') < moment()) {
            d.yujing =  '!';
          }
          break;
        case '2':
          // 6个月
          if (moment(d.enterTime).add(5, 'months') < moment()) {
            d.yujing =  '!';
          }
          break;
        case '3':
          // 1年
          if (moment(d.enterTime).add(11, 'months') < moment()) {
            d.yujing =  '!';
          }
          break;
        case '4':
          // 3年
          if (moment(d.enterTime).add(35, 'months') < moment()) {
            d.yujing =  '!';
          }
          break;
        default:
          d.yujing =  '';
          break;
      }
    });
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
  view(item: any) {
    this.router.navigate(['/lienpersonnelDetail', {id: item.id}]);

  }
  // 问题反馈
  question(item) {
    this.router.navigate(['/feedbacksave', {ids: item.id}]);
  }
  // 打开对话框 讯问及安全情况日报
  exportTalkSafe() {
      this.isShowTalkSafe = true;
  }
  // 关闭对话框  讯问及安全情况日报
  handleCancel(): void {
    this.isShowTalkSafe = false;
  }
  // 点击确定按钮
  handleOk(): void {
    if (this.talkSafeRiqi) {
      this.isShowTalkSafe = false;
      this.nurseService.exportTalkSafe(this.talkSafeRiqi);
      this.talkSafeRiqi = null;
    } else {
      this.messageService.error('请选择日期！');
    }
  }
  // 对话框选择的日期change事件
  onChange(result: Date): void {
    if (result) {
      this.talkSafeRiqi = moment(result).format('YYYY-MM-DD').toString();
    }
  }
  // 导出基地讯问时间表
  exportTalkTime(): void {
    this.isShowTalkTime = true;
  }
  // 关闭对话框  基地讯问时间表
  handleCancel1(): void {
    this.isShowTalkTime = false;
  }
  // 点击确定按钮 基地讯问时间表
  handleOk1(): void {
    if (this.talkTimeRiqi) {
      this.isShowTalkTime = false;
      this.nurseService.exportTalkTime(this.talkTimeRiqi);
      this.talkTimeRiqi = null;
    } else {
      this.messageService.error('请选择日期！');
    }
  }
  // 对话框选择的日期change事件
  onChange1(result: Date): void {
    if (result) {
      this.talkTimeRiqi = moment(result).format('YYYY-MM-DD').toString();
    }
  }
  // 导出留置期限即将届满提醒函
  exportTiXing(item: any): void {
    this.lienPersonnelService.exportTiXing(item.id);
  }
  // 导出在点留置人信息一览表
  zaiDianExport(status: string) {
    this.lienPersonnelService.exportLiuZhiRen(status); // 传0 说明是导出在点人员列表
  }
  // 重置按钮
  reset($event) {
    this.query.query = new LienPersonnel();
    // 修改排序方式
    const sanyiSort = new SanyiSort();
    sanyiSort.directionMethod = 'DESC';
    sanyiSort.sortName = 'enterTime';
    this.query.sort = sanyiSort;
    this.st.load($event);
  }
}
