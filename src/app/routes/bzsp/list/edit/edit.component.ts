import {Component, OnInit, ViewChild} from '@angular/core';
import {NzI18nService, NzModalService} from 'ng-zorro-antd';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd';
import {ActivatedRoute, Router} from '@angular/router';
import {LienPersonnelService} from '../../../../services/LienPersonnelService';
import {BaozhangshenqingService} from '../../../../services/BaozhangshenqingService';
import {Baozhangshenqing} from '../../../../model/Baozhangshenqing';
import { LienPersonnel } from '../../../../model/LienPersonnel';
import { QueryParam } from '../../../../model/page/QueryParam';
import { SanyiPage } from '../../../../model/page/SanyiPage';
import {Dictionary} from '../../../../model/Dictionary';
import {DictionaryService} from '../../../../services/DictionaryService';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  title1 = '保障申请';
  validateForm: FormGroup;
  baozhangshenqing: Baozhangshenqing = new Baozhangshenqing();
  optionLP: Array<LienPersonnel> = new Array<LienPersonnel>();
  currentUser: any;
  dictionaryueryParam: QueryParam<Dictionary> = new QueryParam<Dictionary>();
  dictionarycontentPage: SanyiPage<Dictionary> = new SanyiPage<Dictionary>();
  isLoading = false;
  constructor(private modalService: NzModalService, private i18n: NzI18nService,
              private messageService: NzMessageService, private fb: FormBuilder,
              private router: Router, private route: ActivatedRoute,
              private dictionaryService: DictionaryService,
              private lienPersonnelService: LienPersonnelService, private baozhangshenqingService: BaozhangshenqingService) {
    this.currentUser = this.baozhangshenqingService.getCurrentUser();

  }
  ngOnInit() {
        this.dictionaryueryParam.query.dsId = '4028928b6781689b016782290b030001';
        this.dictionaryueryParam.query.id = this.baozhangshenqing.bumen;
        this.dictionaryueryParam.paging = false;
        this.dictionaryService.findDictionary(this.dictionaryueryParam).subscribe((result) => {
          this.dictionarycontentPage = result;
          console.log(this.dictionarycontentPage);
        });
    // this.baozhangshenqing.bumen = this.currentUser.bumenId;
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.title1 = '保障申请编辑';
      // 获取文章
      this.baozhangshenqingService.findBaozhangshenqingById(id).subscribe((result) => {
        console.log(result);
        this.baozhangshenqing = result;
        // this.dictionaryueryParam.query.dsId = '4028928b6781689b016782290b030001';
        // this.dictionaryueryParam.query.id = this.baozhangshenqing.bumen;
        // this.dictionaryueryParam.paging = false;
        // this.dictionaryService.findDictionary(this.dictionaryueryParam).subscribe((res) => {
        //   this.dictionarycontentPage = res;
        //   console.log(this.dictionarycontentPage);
        // });
      });
    }
    this.validateForm = this.fb.group({
      lpId            : [ null, [ Validators.required ] ],
      bumen            : [ null, [ Validators.required ] ],
      matter            : [ null, [ Validators.required ] ],
      tianBaoTime            : [ null, [ Validators.required ] ],
      chengbanbumen            : [ null, [ Validators.required ] ],
      apply            : [ null, [ Validators.required ] ],
      remark            : [ null, [ Validators.required ] ],
    });
    this.loadMore();
  }
  loadMore(): void {
    const lienPersonnelQuery = new QueryParam<LienPersonnel>();
    let lienPersonnels = new SanyiPage<LienPersonnel>();
    lienPersonnelQuery.paging = false;
    this.isLoading = true;
    this.lienPersonnelService.findLienPersonnels(lienPersonnelQuery).subscribe((res) => {
      lienPersonnels = res;
      this.isLoading = false;
      this.optionLP = lienPersonnels.content;
    });
  }
  // 审批同意
  tongyi(): void {
    console.log(this.baozhangshenqing);
    this.baozhangshenqingService.tongyi(this.baozhangshenqing).subscribe(res => {
      this.isLoading = false;
          if (res) {
            this.messageService.success('审批成功');
            this.router.navigate(['/bzsp']);
          } else {
            this.messageService.error('审批失败');
          }
    });
  }
  // 审批拒绝
  jujue(): void {
    this.baozhangshenqingService.jujue(this.baozhangshenqing).subscribe(res => {
      this.isLoading = false;
      if (res) {
        this.messageService.success('审批成功');
        this.router.navigate(['/bzsp']);
      } else {
        this.messageService.error('审批失败');
      }
    });
  }
}
