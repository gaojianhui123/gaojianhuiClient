import {DrugService} from '../../../../services/DrugService';
import {ActivatedRoute, Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';
import {NzModalService} from 'ng-zorro-antd';
import {Drug} from '../../../../model/Drug';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { QueryParam } from '../../../../model/page/QueryParam';
import { Dictionary } from '../../../../model/Dictionary';
import { DictionaryService } from '../../../../services/DictionaryService';

@Component({
  selector: 'app-drug-save',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  drugForm: FormGroup;
  // 药品对象
  drug: Drug = new Drug();
  title = '录入';
  dictionaryPersonnel: Array<Dictionary> = new Array<Dictionary>();
  isLoading = false;
  constructor(private modalService: NzModalService, private drugService: DrugService,
              private msgSrv: NzMessageService, private router: Router, private route: ActivatedRoute,
              private fb: FormBuilder, private dictionaryService: DictionaryService) {
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.drugForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [ s: string ]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.drugForm.controls.password.value) {
      return { confirm: true, error: true };
    }
  }

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }
  ngOnInit() {
    this.drugForm = this.fb.group({
      drugName            : [ null, [ Validators.required  ] ],
      drugTotalCount      : [ null, [ Validators.required  ] ],
      unit                : [ null, [ Validators.required  ] ],
      price               : [ null, [ Validators.required  ] ],
      doctor              : [ null, [ Validators.required  ] ],
      guige               : [ null, [ ] ],
      remark              : [ null, [ ] ],
      rukuTime            : [ null, [ Validators.required  ] ]
    });
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.title = '编辑';
      this.drugService.getDrugById(id).subscribe( (res) => {
        console.log(res);
        this.drug = res;
      });
    }
    this.loadMore();
  }
  loadMore(): void {
    const dictionaryQuery = new QueryParam<Dictionary>();
    dictionaryQuery.paging = false;
    dictionaryQuery.query.dsId = '4028928a6763235301676329ed7b0000';
    this.isLoading = true;
    this.dictionaryService.findDictionary(dictionaryQuery).subscribe((res) => {
      if (res) {
        this.isLoading = false;
        this.dictionaryPersonnel = res.content;
      }
    });
  }
  // 保存
  save(): void {
    console.log(this.drug);
    for (const i of Object.keys(this.drugForm.controls)) {
      this.drugForm.controls[ i ].markAsDirty();
      // 更新值且校验数据
      this.drugForm.controls[ i ].updateValueAndValidity();
    }
    if (this.drugForm.valid) {
      this.drugService.saveDrug(this.drug).subscribe( (res) => {
        this.msgSrv.success('保存成功');
        this.router.navigate(['/drug']);
      });
    }
  }
  // 关闭按钮
  closed() {
    this.router.navigate(['/drug']);
  }


}
