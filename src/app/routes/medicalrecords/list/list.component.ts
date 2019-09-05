import { HealthDrugRelateService } from '../../../services/HealthDrugRelateService';
import { LienPersonnelService } from '../../../services/LienPersonnelService';
import { DictionaryService } from '../../../services/DictionaryService';
import { HealthDrugRelate } from '../../../model/HealthDrugRelate';
import { HealthService } from '../../../services/HealthService';
import { LienPersonnel } from '../../../model/LienPersonnel';
import { QueryParam } from '../../../model/page/QueryParam';
import { SanyiPage } from '../../../model/page/SanyiPage';
import { SanyiSort } from '../../../model/page/SanyiSort';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { Dictionary } from '../../../model/Dictionary';
import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { User } from '../../../model/User';
import { NzInputDirective } from 'ng-zorro-antd/input/nz-input.directive';
import { Health } from '../../../model/Health';

@Component({
  selector: 'app-medicalrecords-list',
  templateUrl: './list.component.html',
})
export class MedicalrecordsListComponent implements OnInit {
  queryParam: QueryParam<HealthDrugRelate> = new QueryParam<HealthDrugRelate>();
  queryParamLS: QueryParam<HealthDrugRelate> = new QueryParam<HealthDrugRelate>();
  cqResult: SanyiPage<HealthDrugRelate> = new SanyiPage<HealthDrugRelate>();
  lsResult: SanyiPage<HealthDrugRelate> = new SanyiPage<HealthDrugRelate>();
  editCache: HealthDrugRelate = new HealthDrugRelate();
  editCacheLS: HealthDrugRelate = new HealthDrugRelate();
  selectValue: string;
  lienPersonnelQuery: QueryParam<LienPersonnel> = new QueryParam<LienPersonnel>();
  lienPersonnelResult: SanyiPage<LienPersonnel> = new SanyiPage<LienPersonnel>();
  lienPersonnelResultOut: SanyiPage<LienPersonnel> = new SanyiPage<LienPersonnel>();
  currentUser: User; // 当前用户
  dictionaryQuery: QueryParam<Dictionary> = new QueryParam<Dictionary>();
  yaopinResult: SanyiPage<Dictionary> = new SanyiPage<Dictionary>();
  jianchaResult: SanyiPage<Dictionary> = new SanyiPage<Dictionary>();
  yaopinyongfaResult: SanyiPage<Dictionary> = new SanyiPage<Dictionary>();
  danweiResult: SanyiPage<Dictionary> = new SanyiPage<Dictionary>(); // 单位规格字典列表
  pinciResult: SanyiPage<Dictionary> = new SanyiPage<Dictionary>(); // 单位规格字典列表
  disable = true;
  disables = true;
  //特殊情况 7月12号修改
  healthQuery: QueryParam<Health> = new QueryParam<Health>();
  healthResult: SanyiPage<Health> = new SanyiPage<Health>();
  isVisible = false; // 控制特殊情况录入弹框的显示
  selectId: string;
  specialCase: string;
  editHealth: Health = new Health();

  constructor(private http: _HttpClient, private modal: ModalHelper, private healthDrugRelateService: HealthDrugRelateService,
              private healthService: HealthService, private lienPersonnelService: LienPersonnelService,
              private dictionaryService: DictionaryService) {
    this.currentUser = this.healthService.getCurrentUser();
  }

  /**
   * 以下方法为长期用药tab 调用
   */
  startEdit(id: string): void {
    this.disable = true;
    this.editCache[id].edit = true;
  }

  cancelEdit(id: string): void {
    this.disable = false;
    const index = this.cqResult.content.findIndex(item => item.id === id);
    this.editCache[id] = {
      data: { ...this.cqResult.content[index] },
      edit: false,
    };
  }

  saveEdit(id: string): void {
    this.editCache[id].edit = false;
    this.editCache[id].data.yongyaoType = '0';
    this.healthDrugRelateService.saveHealthDrugRelate(this.editCache[id].data).subscribe(res => {
      this.findChangQi();
    });
    this.disable = false;
  }

  deletedEdit(id: string): void {
    this.editCache[id].edit = false;
    this.healthDrugRelateService.deleteHealthDrugRelate(this.editCache[id].data).subscribe(res => {
      this.findChangQi();
    });
    this.disable = false;
  }

  updateEditCache(): void {
    this.cqResult.content.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item },
      };
    });
  }


  /**
   * 以下方法为临时用药tab 调用
   */
  startEdit2(id: string): void {
    this.disables = true;
    this.editCacheLS[id].edit = true;
  }

  cancelEdit2(id: string): void {
    this.disables = false;
    const index = this.lsResult.content.findIndex(item => item.id === id);
    this.editCacheLS[id] = {
      data: { ...this.lsResult.content[index] },
      edit: false,
    };
  }

  saveEdit2(id: string): void {
    this.editCacheLS[id].edit = false;
    this.editCacheLS[id].data.yongyaoType = '1';
    this.healthDrugRelateService.saveHealthDrugRelate(this.editCacheLS[id].data).subscribe(res => {
      this.findLinShi();
    });
    this.disables = false;
  }

  deletedEdit2(id: string): void {
    this.editCacheLS[id].edit = false;
    this.healthDrugRelateService.deleteHealthDrugRelate(this.editCacheLS[id].data).subscribe(res => {
      this.findLinShi();
    });
    this.disables = false;
  }

  updateEditCache2(): void {
    this.lsResult.content.forEach(item => {
      this.editCacheLS[item.id] = {
        edit: false,
        data: { ...item },
      };
    });
  }
  // 更新数据
  updateEditCache3(): void {
    this.healthResult.content.forEach(item => {
      this.editHealth[ item.id ] = {
        edit: false,
        data: { ...item }
      };
    });
  }
  // 初始化
  ngOnInit() {
    this.selectValue = '0';
    this.findDaihao(); // 获取留置人代号数据
    this.findYaoPin(); // 获取药品字典数据
    this.findYaoPinYongFa(); // 获取用法字典数据
    this.findDanWeiGuiGe(); // 获取单位规格字典数据
    this.findPinCi(); // 获取频次字典数据
    this.findJianCha(); // 获取频次字典数据


  }

  // 查询按钮
  chaxun() {
    this.findChangQi(); // 长期用药记录
    this.findLinShi(); // 临时用药记录
    this.findHealths();//获取health表数据
  }

  // 查长期用药列表
  findChangQi() {
    this.disable = false;
    this.queryParam.paging = false;
    this.queryParam.query.yongyaoType = '0'; // 长期用药状态为 0
    debugger;
    this.healthDrugRelateService.findHealthDrugRelate(this.queryParam).subscribe(res => {
      this.cqResult = res;
      if (res) {
        this.updateEditCache();
      }
    });
  }

  // 查临时用药列表
  findLinShi() {
    this.disables = false;
    this.queryParam.paging = false;
    this.queryParam.query.yongyaoType = '1'; // 临时用药状态为 1
    debugger;
    this.healthDrugRelateService.findHealthDrugRelate(this.queryParam).subscribe(res => {
      this.lsResult = res;
      if (res) {
        this.updateEditCache2();
      }
    });
  }

  //查询health表
  findHealths() {
    this.disable = false;
    this.healthQuery.query.status = '2'; // 特殊情况的状态为3
    const sort = new SanyiSort();
    sort.directionMethod = 'ASC';
    sort.sortName = 'tiJianTime';
    this.healthQuery.sort = sort;
    this.healthQuery.paging = false;
    this.healthQuery.query.lpId= this.queryParam.query.lpId;
    debugger;
    this.healthService.findHealths(this.healthQuery).subscribe(res => {
      this.healthResult = res;
      if (res) {
        debugger;
        this.updateEditCache3();
      }
    });
  }

  // 获取留置人代号数据
  findDaihao() {
    this.lienPersonnelQuery.paging = false;
    if (this.selectValue == '0') {
      this.lienPersonnelQuery.query.outStatus = '0'; // 未撤离
    } else {
      this.lienPersonnelQuery.query.outStatus = '1'; // 撤离
    }
    if (this.currentUser.yihurenyuan) {
      this.lienPersonnelQuery.query.yihurenyuan = this.currentUser.yihurenyuan;
    }
    this.lienPersonnelService.findLienPersonnels(this.lienPersonnelQuery).subscribe((res) => {
      this.lienPersonnelResult = res;
    });
  }

  change() {
    debugger;
    if (this.selectValue == '0') {
      this.selectValue = '1';
    } else if (this.selectValue == '1') {
      this.selectValue = '0';
    }
    this.findDaihao();
  }

  // 获取药品字典数据
  findYaoPin() {
    this.dictionaryQuery.paging = false;
    this.dictionaryQuery.query.dsId = '4028928a6763235301676329ed7b0000';
    const sort = new SanyiSort();
    sort.sortName = 'dicIndex';
    sort.directionMethod = 'ASC';
    this.dictionaryQuery.sort = sort;
    this.dictionaryService.findDictionary(this.dictionaryQuery).subscribe(res => {
      this.yaopinResult = res;
    });
  }

  // 获取检查化验字典数据
  findJianCha() {
    this.dictionaryQuery.paging = false;
    this.dictionaryQuery.query.dsId = 'b2b2b2386bbb74df016bbbf069930004';
    const sort = new SanyiSort();
    sort.sortName = 'dicIndex';
    sort.directionMethod = 'ASC';
    this.dictionaryQuery.sort = sort;
    this.dictionaryService.findDictionary(this.dictionaryQuery).subscribe(res => {
      this.jianchaResult = res;
    });
  }

  // 获取药品用法字典规格
  findYaoPinYongFa() {
    const sort = new SanyiSort();
    sort.sortName = 'dicIndex';
    sort.directionMethod = 'ASC';
    this.dictionaryQuery.sort = sort;
    this.dictionaryQuery.paging = false;
    this.dictionaryQuery.query.dsId = '4028098169747302016975fa09fe0002';
    this.dictionaryService.findDictionary(this.dictionaryQuery).subscribe(res => {
      this.yaopinyongfaResult = res;
    });
  }

  // 获取规格字典数据
  findDanWeiGuiGe() {
    const sort = new SanyiSort();
    sort.sortName = 'dicIndex';
    sort.directionMethod = 'ASC';
    this.dictionaryQuery.sort = sort;
    this.dictionaryQuery.paging = false;
    this.dictionaryQuery.query.dsId = '402881e5697a0f5001697a2c4c2c0000';
    this.dictionaryService.findDictionary(this.dictionaryQuery).subscribe(res => {
      this.danweiResult = res;
    });
  }

  // 获取频次字典数据
  findPinCi() {
    const sort = new SanyiSort();
    sort.sortName = 'dicIndex';
    sort.directionMethod = 'ASC';
    this.dictionaryQuery.sort = sort;
    this.dictionaryQuery.paging = false;
    this.dictionaryQuery.query.dsId = '402881e5697a0f5001697a2d0f770002';
    this.dictionaryService.findDictionary(this.dictionaryQuery).subscribe(res => {
      this.pinciResult = res;
    });
  }

  // 长期用药新增一条
  addRow(editRowTable: any): void {
    editRowTable._pageIndex = 1; // 新增的时候 跳转到第一页再新增
    const lingshiRow = new HealthDrugRelate('null');
    lingshiRow.lpId = this.queryParam.query.lpId;
    this.cqResult.content = [lingshiRow, ...this.cqResult.content];
    this.updateEditCache();
    this.editCache['null'].edit = true;
    this.disable = true;
  }

  // 临时用药新增一条
  addRowLS(editRowTableLS: any): void {
    editRowTableLS._pageIndex = 1; // 新增的时候 跳转到第一页再新增
    const lingshiRowLS = new HealthDrugRelate('null');
    lingshiRowLS.lpId = this.queryParam.query.lpId;
    this.lsResult.content = [lingshiRowLS, ...this.lsResult.content];
    this.updateEditCache2();
    this.editCacheLS['null'].edit = true;
    this.disables = true;
  }

  // 导出常规体检的长期用药 或者 临时用药 记录
  exportYongYao(lpId: any, yongyaoTyoe: any) {
    this.healthService.exportYongYao(lpId, yongyaoTyoe);
  }

  // 打开特殊情况弹框
  writeTeShuQingKuang(id: any): void {
    this.selectId = id;
    this.specialCase = this.editHealth[id].data.specialCase;
    this.isVisible = true;
  }
  // 编辑
  startEdit3(id: string): void {
    this.disable = true;
    this.editHealth[ id ].edit = true;
  }
  // 取消
  cancelEdit3(id: string): void {
    this.disable = false;
    const index = this.healthResult.content.findIndex(item => item.id === id);
    this.editHealth[ id ] = {
      data: { ...this.healthResult.content[ index ] },
      edit: false
    };
  }
  // 保存
  saveEdit3(id: string): void {
    this.editHealth[id].edit = false;
    this.editHealth[id].data.status = '2'; // 状态为2 说明是常规体检
    this.healthService.saveHealth(this.editHealth[id].data).subscribe(res => {
      this.findHealths();
    });
    this.disable = false;
  }
  // 新增
  addRow3(editRowTable2: any): void {
    editRowTable2._pageIndex = 1; // 新增的时候 跳转到第一页再新增
    const lingshiRow = new Health('null');
    lingshiRow.lpId = this.healthQuery.query.lpId;
    this.healthResult.content = [ lingshiRow , ...this.healthResult.content ];
    this.updateEditCache3();
    this.editHealth['null'].edit = true;
    this.disable = true;
  }
  // 删除
  deletedEdit3(id: string): void {
    console.log(this.editHealth[ id ].data);
    this.editHealth[ id ].edit = false;
    this.healthService.deleteHealth(this.editHealth[ id ].data).subscribe(res => {
      this.findHealths();
    });
    this.disable = false;
  }
  //  确定
  handleOk(): void {
    this.editHealth[this.selectId].data.specialCase = this.specialCase;
    this.isVisible = false;
    this.editHealth[this.selectId].edit = false;
    this.healthService.saveHealth(this.editHealth[ this.selectId ].data).subscribe(res => {
      this.findHealths();
    });
    this.disable = false;
  }
  // 关闭特殊情况弹框
  handleCancel(): void {
    this.isVisible = false;
  }
  // 导出常规体检的特殊情况
  exportSpecial(lpId: any) {
    this.healthService.exportSpecial(lpId);
  }
}
