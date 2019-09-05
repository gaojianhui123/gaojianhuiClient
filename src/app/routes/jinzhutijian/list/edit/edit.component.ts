import {LienPersonnelService} from '../../../../services/LienPersonnelService';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HealthService} from '../../../../services/HealthService';
import {LienPersonnel} from '../../../../model/LienPersonnel';
import {QueryParam} from '../../../../model/page/QueryParam';
import {NzI18nService, NzModalService} from 'ng-zorro-antd';
import {SanyiPage} from '../../../../model/page/SanyiPage';
import {ActivatedRoute, Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {Health} from '../../../../model/Health';
import {NzMessageService} from 'ng-zorro-antd';
import { User } from '../../../../model/User';

@Component({
  selector: 'app-jinzhutijian-edit',
  templateUrl: './edit.component.html'
})
export class JinzhutijianListEditComponent implements OnInit {
  title1 = '进驻体检录入';
  validateForm: FormGroup;
  currentUser: User;
  health: Health = new Health();
  lienPersonnelQuery:  QueryParam<LienPersonnel> = new QueryParam<LienPersonnel>();
  lienPersonnelsorts: SanyiPage<LienPersonnel> = new SanyiPage<LienPersonnel>();
  isLoading = false;
  constructor(private modalService: NzModalService, private i18n: NzI18nService,
              private messageService: NzMessageService, private fb: FormBuilder, private healthService: HealthService,
              private router: Router, private route: ActivatedRoute, private lienPersonnelService: LienPersonnelService) {
              this.currentUser = this.lienPersonnelService.getCurrentUser();
  }
  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.title1 = '进驻体检编辑';
      // 获取文章
      this.healthService.getHealthById(id).subscribe((result) => {
        this.health = result;
      });
    }

    this.validateForm = this.fb.group({
      lpId                   : [ null, [ Validators.required ] ],
      lzSex                  : [ null, [] ],
      lzAge                  : [ null, [] ],
      checkHealth            : [ null, [] ],
      historyMedical         : [ null, [] ],
      tiWen                  : [ null, [] ],
      doctor                 : [ null, [] ],
      xueYa                  : [ null, [] ],
      xinLv                  : [ null, [] ],
      xueTang                : [ null, [] ],
      xinDianTu              : [ null, [] ],
      doctorYiJian           : [ null, [] ],
      tiJianTime             : [ null, [] ],
      // fuZeRen                : [ null, [] ],
      // fuZeRenTel             : [ null, [] ],
      gaoXueYa               : [ null, [] ],
      hushi               : [ null, [] ]
    });
    this.loadMore();
  }
  loadMore(): void {
    this.lienPersonnelQuery.paging = false;
    this.isLoading = true;
    if (this.currentUser.yihurenyuan) {
      this.lienPersonnelQuery.query.yihurenyuan = this.currentUser.yihurenyuan;
    }
    this.lienPersonnelQuery.query.outStatus = '0'; // 添加没撤离条件
    this.lienPersonnelService.findLienPersonnels(this.lienPersonnelQuery).subscribe((res) => {
      this.isLoading = false;
      this.lienPersonnelsorts = res;
    });
  }
  changeOption(lpId: any) {
    this.lienPersonnelService.findLienPersonnelById(lpId).subscribe( (res) => {
      let lienPersonnel = new LienPersonnel();
      if (res) {
        lienPersonnel = res;
        if (lienPersonnel.lzSex === '1') {
          this.health.lzSex = '男';
        } else if (lienPersonnel.lzSex === '2') {
          this.health.lzSex = '女';
        } else {
          this.health.lzSex = '';
        }
        this.health.lzAge = lienPersonnel.lzAge;
      }
    });
  }
  submitForm(): void {
    this.health.status = '1';
    for (const i of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }

    if (this.validateForm.valid === true) {
      if (this.health.checkHealth && this.health.checkHealth.length > 500) { // 体格检查长度校验 不能大于500
        this.messageService.error('体格检查长度不能超出500字！');return;
      }
      if (this.health.historyMedical && this.health.historyMedical.length > 500) { // 以往病史长度校验 不能大于500
        this.messageService.error('以往病史长度不能超出500字！');return;
      }
      if (this.health.xinDianTu && this.health.xinDianTu.length > 500) { // 心电图长度校验 不能大于500
        this.messageService.error('心电图长度不能超出500字！');return;
      }
      if (this.health.doctorYiJian && this.health.doctorYiJian.length > 500) { // 医生意见长度校验 不能大于500
        this.messageService.error('医生意见长度不能超出500字！');return;
      }
      this.healthService.saveJinZhuTiJian(this.health).subscribe((res) => {
        this.isLoading = false;
        if (res) {
          this.messageService.success('保存成功');
          this.router.navigate(['/jinzhutijian']);
        } else {
          this.messageService.error('保存失败');
        }
      });
    }
  }
  // 关闭按钮
  closed() {
    this.router.navigate(['/jinzhutijian']);
  }
}
