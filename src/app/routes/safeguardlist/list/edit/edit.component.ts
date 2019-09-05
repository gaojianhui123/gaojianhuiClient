import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import {ActivatedRoute, Router} from '@angular/router';
import {LienPersonnelService} from '../../../../services/LienPersonnelService';
import {BaozhangshenqingService} from '../../../../services/BaozhangshenqingService';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Baozhangshenqing} from '../../../../model/Baozhangshenqing';
import {LienPersonnel} from '../../../../model/LienPersonnel';
import {QueryParam} from '../../../../model/page/QueryParam';
import {SanyiPage} from '../../../../model/page/SanyiPage';
import {Dictionary} from '../../../../model/Dictionary';
import {DictionaryService} from '../../../../services/DictionaryService';

@Component({
  selector: 'app-safeguardlist-list-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  record: any = {};
  i: any;
  title1 = '';
  validateForm: FormGroup;
  baozhangshenqing: Baozhangshenqing = new Baozhangshenqing();
  lienPersonnelquery: QueryParam<LienPersonnel> = new QueryParam<LienPersonnel>();
  lienPersonnelcontentPage: SanyiPage<LienPersonnel> = new SanyiPage<LienPersonnel>();
  currentUser: any;
  dictionaryueryParam: QueryParam<Dictionary> = new QueryParam<Dictionary>();
  dictionarycontentPage: SanyiPage<Dictionary> = new SanyiPage<Dictionary>();
  isLoading = false;
  constructor(
    private msgSrv: NzMessageService,
    public http: _HttpClient,
    private router: Router, private route: ActivatedRoute,
    private lienPersonnelService: LienPersonnelService,
    private baozhangshenqingService: BaozhangshenqingService,
    private messageService: NzMessageService, private fb: FormBuilder,
    private dictionaryService: DictionaryService,
  ) {
    this.currentUser = this.baozhangshenqingService.getCurrentUser();
  }

  ngOnInit(): void {
    this.dictionaryueryParam.query.dsId = '4028928b6781689b016782290b030001';
    this.dictionaryueryParam.query.id = this.currentUser.bumenId;
    this.dictionaryService.findDictionary(this.dictionaryueryParam).subscribe((result) => {
      this.dictionarycontentPage = result;
      console.log(this.dictionarycontentPage);
    });
    this.baozhangshenqing.bumen = this.currentUser.bumenId;
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.title1 = '保障信息查看';
      this.baozhangshenqingService.findBaozhangshenqingById(id).subscribe((result) => {
        console.log(result);
        this.baozhangshenqing = result;
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
    this.lienPersonnelService.findLienPersonnels(this.lienPersonnelquery).subscribe((res) => {
      console.log(res);
      this.lienPersonnelcontentPage = res;
    });
  }


}
