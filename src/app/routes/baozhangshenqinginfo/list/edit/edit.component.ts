import {BaozhangshenqingService} from '../../../../services/BaozhangshenqingService';
import {LienPersonnelService} from '../../../../services/LienPersonnelService';
import {DictionaryService} from '../../../../services/DictionaryService';
import {Baozhangshenqing} from '../../../../model/Baozhangshenqing';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { LienPersonnel } from '../../../../model/LienPersonnel';
import { QueryParam } from '../../../../model/page/QueryParam';
import { SanyiPage } from '../../../../model/page/SanyiPage';
import {NzI18nService, NzModalService} from 'ng-zorro-antd';
import {Dictionary} from '../../../../model/Dictionary';
import {ActivatedRoute, Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';
import * as moment from 'moment';

@Component({
  selector: 'app-baozhangshenqinginfo-edit',
  templateUrl: './edit.component.html'
})
export class BaozhangshenqinginfoEditComponent implements OnInit {
  title1 = '保障申请录入';
  validateForm: FormGroup;
  currentUser: any;
  baozhangshenqing: Baozhangshenqing = new Baozhangshenqing();
  dictionaryueryParam: QueryParam<Dictionary> = new QueryParam<Dictionary>();
  dictionarycontentPage: SanyiPage<Dictionary> = new SanyiPage<Dictionary>();
  lienPersonnelQuery: QueryParam<LienPersonnel> = new QueryParam<LienPersonnel>();
  lienPersonnels: SanyiPage<LienPersonnel> = new SanyiPage<LienPersonnel>();
  isLoading = false;
  constructor(private modalService: NzModalService, private i18n: NzI18nService,
              private messageService: NzMessageService, private fb: FormBuilder,
              private router: Router, private route: ActivatedRoute, private dictionaryService: DictionaryService,
              private lienPersonnelService: LienPersonnelService, private baozhangshenqingService: BaozhangshenqingService) {
              this.currentUser = this.baozhangshenqingService.getCurrentUser();
  }
  ngOnInit() {
    this.dictionaryueryParam.query.dsId = '4028928b6781689b016782290b030001';
    this.dictionaryueryParam.query.id = this.currentUser.bumenId;
    this.baozhangshenqing.bumen = this.currentUser.bumenId;
    this.dictionaryueryParam.paging = false;
    this.dictionaryService.findDictionary(this.dictionaryueryParam).subscribe((result) => {
      this.dictionarycontentPage = result;
    });
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.title1 = '保障申请编辑';
      // 获取文章
      this.baozhangshenqingService.findBaozhangshenqingById(id).subscribe((result) => {
        this.baozhangshenqing = result;
      });
    }
    this.validateForm = this.fb.group({
      lpId            : [ null, [ Validators.required ] ],
      bumen            : [ null, [  ] ],
      matter            : [ null, [ Validators.required ] ],
      tianBaoTime            : [ null, [ Validators.required ] ],
      chengbanbumen            : [ null, [ Validators.required ] ],
      apply            : [ null, [ Validators.required ] ],
      remark            : [ null, [ ] ],
    });
    this.loadMore();
  }
  loadMore(): void {
    this.lienPersonnelQuery.paging = false;
    this.lienPersonnelQuery.query.cbDepartment = this.currentUser.bumenId;
    this.isLoading = true;
    this.lienPersonnelService.findLienPersonnels(this.lienPersonnelQuery).subscribe((res) => {
      this.lienPersonnels = res;
      // 只获取没撤离的留置人数据
      this.lienPersonnels.content = this.lienPersonnels.content.filter( (lp) =>  lp.outTime === null );
      this.isLoading = false;
    });
  }
  submitForm(): void {
    this.baozhangshenqing.bumen = this.currentUser.bumenId;
    for (const i of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }
    if (this.validateForm.valid === true) {
      this.baozhangshenqing.tianBaoTime = moment(this.baozhangshenqing.tianBaoTime).format('YYYY-MM-DD').toString();
      this.baozhangshenqing.bumen = this.currentUser.bumenId;
      this.baozhangshenqingService.saveBaozhangshenqing(this.baozhangshenqing).subscribe((res) => {
        this.isLoading = false;
        if (res) {
          this.messageService.success('保存成功');
          this.router.navigate(['/baozhangshenqinginfo']);
        } else {
          this.messageService.error('保存失败');
        }
      });
    }
  }
  // 关闭按钮
  closed() {
    this.router.navigate(['/baozhangshenqinginfo']);
  }
}
