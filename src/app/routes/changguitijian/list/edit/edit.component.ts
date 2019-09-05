import { HealthDrugRelateService } from '../../../../services/HealthDrugRelateService';
import { LienPersonnelService } from '../../../../services/LienPersonnelService';
import { DictionaryService } from '../../../../services/DictionaryService';
import { HealthDrugRelate } from '../../../../model/HealthDrugRelate';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HealthService } from '../../../../services/HealthService';
import { LienPersonnel } from '../../../../model/LienPersonnel';
import { QueryParam } from '../../../../model/page/QueryParam';
import { NzI18nService, NzModalService } from 'ng-zorro-antd';
import { SanyiPage } from '../../../../model/page/SanyiPage';
import { Dictionary } from '../../../../model/Dictionary';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Health } from '../../../../model/Health';
import { NzMessageService } from 'ng-zorro-antd';
import { User } from '../../../../model/User';
import { ModalHelper } from '@delon/theme';
import * as moment from 'moment';

@Component({
  selector: 'app-changguitijian-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.less'],
})
export class ChangguitijianEditComponent implements OnInit {
  aa: any;
  yyType: string;
  currentUser: User;
  isAdd = true;
  title1 = '常规体检录入';
  lienPersonnelQuery: QueryParam<LienPersonnel> = new QueryParam<LienPersonnel>();
  lienPersonnelsorts: SanyiPage<LienPersonnel> = new SanyiPage<LienPersonnel>();
  // 来接收药品使用临时数组
  healthDrugRelateList: Array<HealthDrugRelate> = new Array<HealthDrugRelate>();  // 长期用药
  healthDrugRelateLists: Array<HealthDrugRelate> = new Array<HealthDrugRelate>(); // 临时用药
  healthDrugRelate: HealthDrugRelate = new HealthDrugRelate();
  validateForm: FormGroup;
  health: Health = new Health();
  isLoading = false;
  isVisible = false;
  isLoading1 = false;
  validateForm1: FormGroup;
  title = '用药记录';
  optionYaopin: Array<Dictionary> = new Array<Dictionary>();
  editCache = {};

  constructor(private modalService: NzModalService, private i18n: NzI18nService,
              private messageService: NzMessageService, private fb: FormBuilder, private healthService: HealthService,
              private router: Router, private route: ActivatedRoute, private lienPersonnelService: LienPersonnelService,
              private healthDrugRelateService: HealthDrugRelateService, private modal: ModalHelper,
              private dictionaryService: DictionaryService) {
              this.currentUser = this.lienPersonnelService.getCurrentUser();
  }
  ngOnInit() {
    this.loadMore();
    this.loadMore1();
    const healthId = this.route.snapshot.paramMap.get('id');
    if (healthId) {
      // 初始化时默认为长期用药
      this.healthDrugRelate.yongyaoType = '0';
      this.title1 = '常规体检编辑';
      // 根据体检ID获取体检对象
      this.healthService.getHealthById(healthId).subscribe((result) => {
        this.health = result;
        const query = new QueryParam<HealthDrugRelate>();
        query.paging = false;
        query.query.healthId = this.health.id;
        query.query.yongyaoType = '0';
        if (query.query.yongyaoType === '0') {
          this.healthDrugRelateService.findHealthDrugRelate(query).subscribe((res) => {
            this.healthDrugRelateList = res.content;
            // this.healthDrugRelateLists = res.content;
            this.updateEditCache();
            // this.updateEditCaches();
          });
        }
        query.query.yongyaoType = '1';
        if (query.query.yongyaoType === '1') {
          this.healthDrugRelateService.findHealthDrugRelate(query).subscribe((res) => {
            this.healthDrugRelateLists = res.content;
            this.updateEditCaches();
          });
        }
      });
    }

    this.validateForm = this.fb.group({
      lpId: [null, [Validators.required]],
      tiWen: [null, [Validators.required]],
      doctor: [null, [Validators.required]],
      xueYa: [null, [Validators.required]],
      gaoXueYa: [null, [Validators.required]],
      xinLv: [null, [Validators.required]],
      tiJianTime: [null, [Validators.required]],
      specialCase: [null, [Validators.required]],
      // shiDuan: [null, [Validators.required]],
      xueTang: [null, [Validators.required]],
      weight: [null, []],
      aa: [null, []],
    });
    this.validateForm1 = this.fb.group({
      dId: [null, [Validators.required]],
      yongliang: [null, [Validators.required]],
      danwei: [null, [Validators.required]],
      remark: [null, []],
      // kaishiTime: [null, [Validators.required]],
      // jieshuTime: [null, []],
      // pinci: [null, [Validators.required]],
    });
  }
  // 新建时查询留置人长期用药记录
  selectDrug(): void {
    if (this.health.lpId) {
      this.healthDrugRelate.yongyaoType = '0';
      const query = new QueryParam<HealthDrugRelate>();
      query.paging = false;
      query.query.lpId = this.health.lpId;
      // query.query.healthId = this.health.id;
      query.query.yongyaoType = '0';
      this.healthDrugRelateService.findHealthDrugRelate(query).subscribe((res) => {
        this.healthDrugRelateList = res.content;
        this.updateEditCache();
      });
    }
  }
 // 长期用药编辑
  startEdit(key: string): void {
    this.editCache[key].edit = true;
  }
  // 临时用药编辑
  startLinshi(key: string): void {
    this.editCache[key].edit = true;
  }
  cancelEdit(key: string): void {
    this.editCache[key].edit = false;
  }
  // 长期用药保存
  saveEdit(data: any): void {
    data.data.yongyaoType = '0'; // 长期用药
    if (data.data.jieshuTime) {
      data.data.jieshuTime = moment(data.data.jieshuTime).format('YYYY-MM-DD').toString();
    }
    if (data.data.kaishiTime) {
      data.data.kaishiTime = moment(data.data.kaishiTime).format('YYYY-MM-DD').toString();
    }
    data.data.lpId = this.health.lpId;
    this.dictionaryService.getDictionaryById(data.data.dId).subscribe(res => {
      data.data.drugName = res.dicName;
      const index = this.healthDrugRelateList.findIndex(item => item.id === data.data.id);
      Object.assign(this.healthDrugRelateList[index], this.editCache[data.data.id].data);
      this.editCache[data.data.id].edit = false;
    });
  }
  // 临时用药保存
  saveLinshi(data: any): void {
    data.data.yongyaoType = '1'; // 临时用药
    if (data.data.kaishiTime) {
      data.data.kaishiTime = moment(data.data.kaishiTime).format('YYYY-MM-DD').toString();
    }
    this.dictionaryService.getDictionaryById(data.data.dId).subscribe(res => {
      data.data.drugName = res.dicName;
      const index = this.healthDrugRelateLists.findIndex(item => item.id === data.data.id);
      Object.assign(this.healthDrugRelateLists[index], this.editCache[data.data.id].data);
      this.editCache[data.data.id].edit = false;
    });
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
    this.lienPersonnelQuery.paging = false;
    this.isLoading = true;
    this.lienPersonnelService.findLienPersonnels(this.lienPersonnelQuery).subscribe((res) => {
      this.lienPersonnelsorts = res;
      this.lienPersonnelsorts.content = this.lienPersonnelsorts.content.filter( (lp) =>
        lp.yihurenyuan === this.currentUser.yihurenyuan && lp.outTime === null);
      this.isLoading = false;
    });
  }

  // 编辑药品用量
  goToEdit(data: any) {
    this.isVisible = true;
    this.isAdd = false;
    this.healthDrugRelate = data;
  }

  // 药品用量录入
  add() {
    if (this.healthDrugRelate.yongyaoType === '0') {
      // this.healthDrugRelate = new HealthDrugRelate();
      const healthDrugRelate = new HealthDrugRelate();
      const id_: string = Math.random().toString();
      healthDrugRelate.id = id_;
      this.healthDrugRelateList.push(healthDrugRelate);
      this.editCache[id_] = {
        edit: true,
        data: { ...healthDrugRelate },
      };
    } else if (this.healthDrugRelate.yongyaoType === '1') {
      // this.healthDrugRelate = new HealthDrugRelate();
      const healthDrugRelate = new HealthDrugRelate();
      const id_: string = Math.random().toString();
      healthDrugRelate.id = id_;
      this.healthDrugRelateLists.push(healthDrugRelate);
      this.editCache[id_] = {
        edit: true,
        data: { ...healthDrugRelate },
      };
    }
  }

  // 删除长期用药记录
  goToDeleted(data: HealthDrugRelate): void {
    const dataSet = this.healthDrugRelateList.filter((d) => d.id !== data.id);
    this.healthDrugRelateList = dataSet;
    if (data.id) {
      this.healthDrugRelateService.deleteHealthDrugRelate(data).subscribe();
    }
  }
  // 删除临时用药记录
  goToDeleteds(data: HealthDrugRelate): void {
    const dataSet = this.healthDrugRelateLists.filter((d) => d.id !== data.id);
    this.healthDrugRelateLists = dataSet;
    if (data.id) {
      this.healthDrugRelateService.deleteHealthDrugRelate(data).subscribe();
    }
  }

  // 保存体检
  submitForm(): void {
    this.health.status = '2';
    // this.health.tiJianTime = moment(this.health.tiJianTime).format('YYYY-MM-DD').toString();
    if (this.healthDrugRelate.yongyaoType === '0') {
      this.health.healthDrugRelateList = this.healthDrugRelateList;  // 长期用药
    } else if (this.healthDrugRelate.yongyaoType === '1') {
      this.health.healthDrugRelateList = this.healthDrugRelateLists; // 临时用药
    }
    for (const i of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    if (this.validateForm.valid === true) {
      this.healthService.saveHealth(this.health).subscribe((res) => {
        this.isLoading = false;
        if (res) {
          this.messageService.success('保存成功');
          this.router.navigate(['/changguitijian']);
        } else {
          this.messageService.error('保存失败');
        }
      });
    }
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

  // 关闭按钮
  closed() {
    this.router.navigate(['/changguitijian']);
  }
  // 关闭模态框
  handleCancel(): void {
    this.isVisible = false;
  }
}
