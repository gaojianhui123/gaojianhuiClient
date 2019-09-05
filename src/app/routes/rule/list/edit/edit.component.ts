import {Component, OnInit} from '@angular/core';
import {NzMessageService, NzModalService, NzI18nService} from 'ng-zorro-antd';
import {ModalHelper} from '@delon/theme';
import {HealthService} from '../../../../services/HealthService';
import {HealthDrugRelate} from '../../../../model/HealthDrugRelate';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Health} from '../../../../model/Health';
import {LienPersonnel} from '../../../../model/LienPersonnel';
import {Dictionary} from '../../../../model/Dictionary';
import {ActivatedRoute, Router} from '@angular/router';
import {LienPersonnelService} from '../../../../services/LienPersonnelService';
import {HealthDrugRelateService} from '../../../../services/HealthDrugRelateService';
import {DictionaryService} from '../../../../services/DictionaryService';
import {QueryParam} from '../../../../model/page/QueryParam';
import {SanyiPage} from '../../../../model/page/SanyiPage';

@Component({
  selector: 'app-rule-list-edit',
  templateUrl: './edit.component.html',
})
export class RuleListEditComponent implements OnInit {
  isAdd = true;
  title1 = '常规体检查看';
  // 来接收药品使用临时数组
  healthDrugRelateList: Array<HealthDrugRelate> = new Array<HealthDrugRelate>(); // 长期用药
  healthDrugRelateLists: Array<HealthDrugRelate> = new Array<HealthDrugRelate>(); // 临时用药
  healthDrugRelate: HealthDrugRelate = new HealthDrugRelate();
  validateForm: FormGroup;
  health: Health = new Health();
  optionLienPersonnel: Array<LienPersonnel> = new Array<LienPersonnel>();
  isLoading = false;
  isVisible = false;
  isLoading1 = false;
  id: string;
  editCache = {};
  title = '用药情况录入';
  optionYaopin: Array<Dictionary> = new Array<Dictionary>();
  constructor(private modalService: NzModalService, private i18n: NzI18nService,
              private messageService: NzMessageService, private fb: FormBuilder, private healthService: HealthService,
              private router: Router, private route: ActivatedRoute, private lienPersonnelService: LienPersonnelService,
              private healthDrugRelateService: HealthDrugRelateService, private modal: ModalHelper,
              private dictionaryService: DictionaryService) {}
  ngOnInit() {
    this.loadMore();
    this.loadMore1();
    this.healthDrugRelate.yongyaoType = '0';
    const healthId = this.route.snapshot.paramMap.get('hid');
    this.id = this.route.snapshot.paramMap.get('id');
    if (healthId) {
      this.title1 = '常规体检查看';
      // 获取文章
      this.healthService.getHealthById(healthId).subscribe((result) => {
        this.health = result;
        const query = new QueryParam<HealthDrugRelate>();
        query.paging = false;
        query.query.healthId = this.health.id;
        query.query.yongyaoType = '0';
        if (query.query.yongyaoType === '0') {
          this.healthDrugRelateService.findHealthDrugRelate(query).subscribe((res) => {
            console.log(res);
            this.healthDrugRelateList = res.content;
            // this.healthDrugRelateLists = res.content;
            this.updateEditCache();
            // this.updateEditCaches();
            console.log(this.healthDrugRelateList);
          });
        }
        query.query.yongyaoType = '1';
        if (query.query.yongyaoType === '1') {
          this.healthDrugRelateService.findHealthDrugRelate(query).subscribe((res) => {
            console.log(res);
            this.healthDrugRelateLists = res.content;
            this.updateEditCaches();
            console.log(this.healthDrugRelateLists);
          });
        }
      });
    }
  }

  // 遍历长期用药数组
  updateEditCache(): void {
    this.healthDrugRelateList.forEach(item => {
      if (!this.editCache[item.id]) {
        this.editCache[item.id] = {
          edit: false,
          data: { ...item },
        };
      }
    });
  }
  // 遍历临时用药数组
  updateEditCaches(): void {
    this.healthDrugRelateLists.forEach(item => {
      if (!this.editCache[item.id]) {
        this.editCache[item.id] = {
          edit: false,
          data: { ...item },
        };
      }
    });
  }
  loadMore(): void {
    const lienPersonnelQuery = new QueryParam<LienPersonnel>();
    let lienPersonnelsorts = new SanyiPage<LienPersonnel>();
    lienPersonnelQuery.paging = false;
    this.isLoading = true;
    this.lienPersonnelService.findLienPersonnels(lienPersonnelQuery).subscribe((res) => {
      lienPersonnelsorts = res;
      this.isLoading = false;
      this.optionLienPersonnel = lienPersonnelsorts.content;
    });
  }
  // 编辑药品用量
  goToEdit(data: any) {
    this.isVisible = true;
    this.isAdd = false;
    this.healthDrugRelate = data;
  }
  // 药品数组
  loadMore1(): void {
    const dictionaryQuery = new QueryParam<Dictionary>();
    dictionaryQuery.paging = false;
    dictionaryQuery.query.dsId = '4028928a6763235301676329ed7b0000';
    this.isLoading1 = true;
    this.dictionaryService.findDictionary(dictionaryQuery).subscribe((res) => {
      this.isLoading = false;
      this.optionYaopin = res.content;
    });
  }
  // 关闭模态框
  handleCancel(): void {
    this.isVisible = false;
  }
}
