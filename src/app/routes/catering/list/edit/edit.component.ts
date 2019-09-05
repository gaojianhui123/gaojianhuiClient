import {LienPersonnelService} from '../../../../services/LienPersonnelService';
import {CateringService} from '../../../../services/CateringService';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NurseService} from '../../../../services/NurseService';
import {LienPersonnel} from '../../../../model/LienPersonnel';
import {QueryParam} from '../../../../model/page/QueryParam';
import {SanyiPage} from '../../../../model/page/SanyiPage';
import {ActivatedRoute, Router} from '@angular/router';
import {Catering} from '../../../../model/Catering';
import {  NzMessageService } from 'ng-zorro-antd';
import { Component, OnInit} from '@angular/core';
import { _HttpClient } from '@delon/theme';
import * as moment from 'moment';


@Component({
selector: 'app-catering-list-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
  title1: string;
  validateForm: FormGroup;
  catering: Catering = new Catering();
  isLoading = false;
  lienPersonnelquery: QueryParam<LienPersonnel> = new QueryParam<LienPersonnel>();
  lienPersonnelcontentPage: SanyiPage<LienPersonnel> = new SanyiPage<LienPersonnel>();
  constructor(private msgSrv: NzMessageService, public http: _HttpClient,
              private cateringService: CateringService, private lienPersonnelService: LienPersonnelService,
              private fb: FormBuilder, private router: Router, private route: ActivatedRoute,
  private nurseService: NurseService, private messageService: NzMessageService) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.title1 = '修改信息';
      // 获取文章
      this.cateringService.findCateringById(id).subscribe((result) => {
        this.catering = result;
      });
    } else {
      this.title1 = '录入信息';
      this.catering.cateringMenu = '0';
    }
    this.lienPersonnelquery.paging = false;
    this.lienPersonnelService.findLienPersonnels(this.lienPersonnelquery).subscribe((res) => {
      this.lienPersonnelcontentPage = res;
      this.lienPersonnelcontentPage.content = this.lienPersonnelcontentPage.content.filter( (lp) => lp.outTime === null);
    });
    this.validateForm = this.fb.group({
      cateringMenu            : [ null, [ Validators.required ] ],
      cookingMan       : [ null, [] ],
      packingMan       : [ null, [] ],
      deliveryMan       : [ null, [] ],
      remarks       : [ null, [] ],
      breakfast       : [ null, [] ],
      lunch       : [ null, [] ],
      dinner       : [ null, [] ],
      specificbreakfast       : [ null, [] ],
      specificlunch       : [ null, [] ],
      specificdinner       : [ null, [] ],
      riqi : [ null, [] ],
      receiveMan: [ null, [] ],
      lienPersonnelid: [ null, [] ],
      cookingMans       : [ null, [] ],
      packingMans       : [ null, [] ],
      deliveryMans       : [ null, [] ],
      receiveMans: [ null, [] ],
      cookingManTwo: [ null, [] ],                     // 做餐人
      cookingManThree: [ null, [] ],                   // 做餐人
      packingManTwo: [ null, [] ],                     // 打包人
      packingManThree: [ null, [] ],                     // 打包人
      deliveryManTwo: [ null, [] ],                     // 送餐人
      deliveryManThree: [ null, [] ],                  // 送餐人
      receiveManTwo: [ null, [] ],                     // 接餐人
      receiveManThree: [ null, [] ],                   // 接餐人
    });
  }

  submitForms(): void {

    for (const i of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }
      this.catering.riqi = moment(this.catering.riqi).format('YYYY-MM-DD').toString();
    if (this.validateForm.valid === true) {
      this.cateringService.saveCatering(this.catering).subscribe((result) => {
        this.isLoading = false;
        if (result) {
          this.messageService.success('保存成功！');
          this.router.navigate(['/catering']);
        } else {
          this.messageService.error('保存失败！');
        }
      });
    }
  }
  // 关闭按钮
  closed() {
    this.router.navigate(['/catering']);
  }
}
