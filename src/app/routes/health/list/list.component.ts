import { LienPersonnelService } from '../../../services/LienPersonnelService';
import { HealthService } from '../../../services/HealthService';
import { LienPersonnel } from '../../../model/LienPersonnel';
import { QueryParam } from '../../../model/page/QueryParam';
import { SanyiPage } from '../../../model/page/SanyiPage';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { Component, OnInit } from '@angular/core';
import { Health } from '../../../model/Health';
import { User } from '../../../model/User';
import { SanyiSort } from '../../../model/page/SanyiSort';

@Component({
  selector: 'app-health-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.less'],
})
export class HealthListComponent implements OnInit {
  editCache = {};
  currentUser: User; // 当前用户
  isVisible = false; // 控制特殊情况录入弹框的显示
  selectId: string;
  selectValue = '0';
  editHealth: Health = new Health();
  healthQuery: QueryParam<Health> = new QueryParam<Health>();
  healthResult: SanyiPage<Health> = new SanyiPage<Health>();
  lienPersonnelQuery: QueryParam<LienPersonnel> = new QueryParam<LienPersonnel>();
  lienPersonnelResult: SanyiPage<LienPersonnel> = new SanyiPage<LienPersonnel>();
  specialCase: string; // 特殊情况备注临时属性
  disable = true;
  constructor(private http: _HttpClient, private modal: ModalHelper, private healthService: HealthService,
              private lienPersonnelService:  LienPersonnelService) {
              this.currentUser = this.healthService.getCurrentUser();
  }
  // 查询按钮
  findHealths() {
    this.disable = false;
    this.healthQuery.query.status = '2'; // 常规体检的状态为2
    const sort = new SanyiSort();
    sort.directionMethod = 'ASC';
    sort.sortName = 'tiJianTime';
    this.healthQuery.sort = sort;
    this.healthQuery.paging = false;
    this.healthService.findHealths(this.healthQuery).subscribe(res => {
      this.healthResult = res;
      if (res) {
        this.updateEditCache2();
      }
    });
  }

  ngOnInit() {
    debugger
    this.lienPersonnelQuery.paging = false;
  //  this.lienPersonnelQuery.query.outStatus = '0'; // 添加撤离状态为未撤离的留置人员列表
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
    this.ngOnInit();
  }
  // 编辑
  startEdit2(id: string): void {
    this.disable = true;
    this.editHealth[ id ].edit = true;
  }
  // 取消
  cancelEdit2(id: string): void {
    this.disable = false;
    const index = this.healthResult.content.findIndex(item => item.id === id);
    this.editHealth[ id ] = {
      data: { ...this.healthResult.content[ index ] },
      edit: false
    };
  }
  // 保存
  saveEdit2(id: string): void {
    this.editHealth[id].edit = false;
    this.editHealth[id].data.status = '2'; // 状态为2 说明是常规体检
    this.healthService.saveHealth(this.editHealth[id].data).subscribe(res => {
      this.findHealths();
    });
    this.disable = false;
  }
  // 更新数据
  updateEditCache2(): void {
    this.healthResult.content.forEach(item => {
      this.editHealth[ item.id ] = {
        edit: false,
        data: { ...item }
      };
    });
  }
  // 新增
  addRow(editRowTable2: any): void {
    editRowTable2._pageIndex = 1; // 新增的时候 跳转到第一页再新增
    const lingshiRow = new Health('null');
    lingshiRow.lpId = this.healthQuery.query.lpId;
    this.healthResult.content = [ lingshiRow , ...this.healthResult.content ];
    this.updateEditCache2();
    this.editHealth['null'].edit = true;
    this.disable = true;
  }
  // 删除
  deletedEdit2(id: string): void {
    console.log(this.editHealth[ id ].data);
    this.editHealth[ id ].edit = false;
    this.healthService.deleteHealth(this.editHealth[ id ].data).subscribe(res => {
      this.findHealths();
    });
    this.disable = false;
  }



  // 导出常规体检的生命体征
  exportTiZheng(lpId: any) {
    this.healthService.exportTiZheng(lpId);
  }
  // 导出常规体检的特殊情况
  exportSpecial(lpId: any) {
    this.healthService.exportSpecial(lpId);
  }
  // 打开特殊情况弹框
  writeTeShuQingKuang(id: any): void {
    this.selectId = id;
    this.specialCase = this.editHealth[id].data.specialCase;
    this.isVisible = true;
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
}
