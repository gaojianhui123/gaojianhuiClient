import { LienPersonnelService } from '../../../services/LienPersonnelService';
import { HealthService } from '../../../services/HealthService';
import { LienPersonnel } from '../../../model/LienPersonnel';
import { QueryParam } from '../../../model/page/QueryParam';
import { SanyiPage } from '../../../model/page/SanyiPage';
import { ActivatedRoute, Router } from '@angular/router';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { Component, OnInit } from '@angular/core';
import { Health } from '../../../model/Health';
import { User } from '../../../model/User';
import { SanyiSort } from '../../../model/page/SanyiSort';
@Component({
  selector: 'app-rule-list',
  templateUrl: './list.component.html',
})
export class RuleListComponent implements OnInit {
  editCache = {};
  id: any; // 接受路由中的参数id
  currentUser: User; // 当前用户
  isVisible = false; // 控制特殊情况录入弹框的显示
  selectId: string;
  editHealth: Health = new Health();
  healthQuery: QueryParam<Health> = new QueryParam<Health>();
  healthResult: SanyiPage<Health> = new SanyiPage<Health>();
  lienPersonnelQuery: QueryParam<LienPersonnel> = new QueryParam<LienPersonnel>();
  lienPersonnelResult: SanyiPage<LienPersonnel> = new SanyiPage<LienPersonnel>();
  specialCase: string; // 特殊情况备注临时属性
  disable = true;
  constructor(private http: _HttpClient, private modal: ModalHelper, private healthService: HealthService,
              private lienPersonnelService:  LienPersonnelService, private route: ActivatedRoute, private router: Router) {
    this.currentUser = this.healthService.getCurrentUser();
  }
  // 初始化
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.healthQuery.query.lpId = this.id;
    // 查询
    this.disable = false;
    this.healthQuery.query.status = '2'; // 常规体检的状态为2
    const sort = new SanyiSort();
    sort.directionMethod = 'ASC';
    sort.sortName = 'tiJianTime';
    this.healthQuery.sort = sort;
    this.healthService.findHealths(this.healthQuery).subscribe(res => {
      this.healthResult = res;
      if (res) {
        this.updateEditCache2();
      }
    });
    this.lienPersonnelQuery.paging = false;
    this.lienPersonnelQuery.query.outStatus = '0'; // 添加撤离状态为未撤离的留置人员列表
    this.lienPersonnelService.findLienPersonnels(this.lienPersonnelQuery).subscribe((res) => {
      this.lienPersonnelResult = res;
    });
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
  // 关闭特殊情况弹框
  handleCancel(): void {
    this.isVisible = false;
  }
  //  确定
  handleOk(): void {
    this.isVisible = false;
  }
}
