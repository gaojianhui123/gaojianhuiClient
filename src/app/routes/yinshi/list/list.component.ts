import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import {STColumn, STComponent, STData} from '@delon/abc';
import { SFSchema } from '@delon/form';
import {environment} from '@env/environment';
import {QueryParam} from '../../../model/page/QueryParam';
import {YinshiListEditComponent} from './edit/edit.component';
import {LienPersonnelCaterDto} from '../../../model/LienPersonnelCaterDto';
import {ActivatedRoute, Router} from '@angular/router';
import {CateringService} from '../../../services/CateringService';
import {Catering} from '../../../model/Catering';
import {YinshiListViewComponent} from './view/view.component';

@Component({
  selector: 'app-yinshi-list',
  templateUrl: './list.component.html',
})
export class YinshiListComponent implements OnInit {
  url1 = environment.SERVER_URL + `catering/findCatering`;
  url = environment.SERVER_URL + `lienPersonnel/selectLienPersonnelJoinCater`;
  // 特殊菜单
  queryParam: QueryParam<LienPersonnelCaterDto> = new QueryParam<LienPersonnelCaterDto>();
  // 常规菜单
  queryCater: QueryParam<Catering> = new QueryParam();
  id: string;
  // 特殊餐饮过滤
  searchSchema: SFSchema = {
    properties: {
      riqi: {
        type: 'string',
        title: '录入日期',
        format: 'date',
        ui: {
          width: 300
        }
      }
    }
  };
  // 特殊餐饮列表
  @ViewChild('st') st: STComponent;
  @ViewChild('sf') sf: STComponent;
  columns: STColumn[] = [
    { title: '编号', type: 'no' },
    { title: ' 菜单类型',  index: 'cateringMenuName' },
    { title: '做餐人', index: 'cookingMan' },
    { title: ' 打包人',  index: 'packingMan' },
    { title: '送餐人', index: 'deliveryMan' },
    {
      title: '操作区',
      buttons: [
        { text: '查看详情', click: (item: any) => ( this.view(item) )},
      ]
    }
  ];
  // 常规餐饮过滤
  searchSchema1: SFSchema = {
    properties: {
      riqi: {
        type: 'string',
        title: '录入日期',
        format: 'date',
        ui: {
          width: 300
        }
      }
    }
  };
  // 常规餐饮列表
  @ViewChild('st1') st1: STComponent;
  @ViewChild('sf1') sf1: STComponent;
  columns1: STColumn[] = [
    { title: '编号', type: 'no' },
    { title: ' 菜单类型',  index: 'cateringMenuName' },
    { title: '做餐人', index: 'cookingMan' },
    { title: ' 打包人',  index: 'packingMan' },
    { title: '送餐人', index: 'deliveryMan' },
    {
      title: '操作区',
      buttons: [
        { text: '查看详情', click: (item: any) => ( this.viewChangGui(item) )},
      ]
    }
  ];
  constructor(private http: _HttpClient,
              private modal: ModalHelper,
              private router: Router,
              private cateringService: CateringService,
              private route: ActivatedRoute) { }
  processData = (data: STData[]) => {
    console.log(data);
    data.map( d => {
      switch (d.cateringMenu) {
        case '0' :
          d.cateringMenuName = '常规菜单';
          break;
        case '1':
          d.cateringMenuName = '特殊菜单';
          break;
      }
    });
    return data; }
  processData1 = (data: STData[]) => {
    console.log(data);
    data.map( d => {
      switch (d.cateringMenu) {
        case '0' :
          d.cateringMenuName = '常规菜单';
          break;
        case '1':
          d.cateringMenuName = '特殊菜单';
          break;
      }
    });
    return data;
  }
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.queryCater.query.cateringMenu = '0';
    this.queryParam.query.id = this.id ;
  }
  // 查看特殊
  view(item: any) {
    console.log(item);
    this.modal.createStatic(YinshiListEditComponent, { record: { id: item.caterId } }).subscribe(() => this.st.reload());
  }
  // 查看常规
  viewChangGui(item: any) {
    console.log(item);
    this.modal.createStatic(YinshiListViewComponent, { record: { id: item.id } }).subscribe(() => this.st1.reload());
  }
  // 重置特殊菜单
  load1($event) {
    this.queryParam.query = $event;
    this.queryParam.query.id = this.id;
    this.st.load($event);
  }
  resete($event) {
    this.queryParam.query = new LienPersonnelCaterDto();
    // this.queryCater.query.cateringMenu = '1';
    this.queryParam.query.id = this.id;
    this.st.load($event);
  }
  // 重置常规菜单
  load($event) {
    this.queryCater.query = $event;
    this.queryCater.query.lienPersonnelid = this.id;
    this.st1.load($event);
  }
  reset($event) {
    this.queryCater.query = new Catering();
    this.queryCater.query.cateringMenu = '0';
    this.queryCater.query.lienPersonnelid = this.id;
    this.st1.load($event);
  }
}
