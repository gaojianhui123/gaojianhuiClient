import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {DictionaryService} from '../../../../services/DictionaryService';
import {Dictionary} from '../../../../model/Dictionary';
import {ActivatedRoute, Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';
import {NzModalService} from 'ng-zorro-antd';
import {Dictsort} from '../../../../model/Dictsort';
import {DictsortService} from '../../../../services/DictsortService';
import {QueryParam} from '../../../../model/page/QueryParam';
import {SanyiPage} from '../../../../model/page/SanyiPage';

@Component({
  selector: 'app-dictionarylist-edit',
  templateUrl: './edit.component.html'
})
export class DictionaryListEditComponent implements OnInit {
  dictionaryForm: FormGroup;
  // 字典对象
  dictionary: Dictionary = new Dictionary();
  // 字典分类下拉数组
  optionDictsort = Array<Dictsort>();
  isLoading = false;
  title = '录入';
  constructor(private modalService: NzModalService, private dictionaryService: DictionaryService,
              private msgSrv: NzMessageService, private router: Router, private route: ActivatedRoute,
              private fb: FormBuilder, private dictsortService: DictsortService) {
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.dictionaryForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [ s: string ]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.dictionaryForm.controls.password.value) {
      return { confirm: true, error: true };
    }
  }

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }
  ngOnInit() {

    this.dictionaryForm = this.fb.group({
      dsId                    : [ null, [ Validators.required  ] ],
      dicIndex                : [ null, [] ],
      dicName                 : [ null, [ Validators.required  ] ],
      // dicPyCode               : [ null, [ Validators.required  ] ],
      dicMemo                 : [ null, [] ],
      isOwner                 : [ null, [ Validators.required  ] ],
    });
    this.loadMore();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.title = '编辑';
      this.dictionaryService.getDictionaryById(id).subscribe( (res) => {
        this.dictionary = res;
      });
    }
  }
  loadMore(): void {
    const dictsortQuery = new QueryParam<Dictsort>();
    let dictsorts = new SanyiPage<Dictsort>();
    dictsortQuery.paging = false;
    this.isLoading = true;
    this.dictsortService.findDictsort(dictsortQuery).subscribe((res) => {
      dictsorts = res;
      this.isLoading = false;
      this.optionDictsort = dictsorts.content;
    });
  }
  // 保存
  save(): void {
    for (const i of Object.keys(this.dictionaryForm.controls)) {
      this.dictionaryForm.controls[ i ].markAsDirty();
      // 更新值且校验数据
      this.dictionaryForm.controls[ i ].updateValueAndValidity();
    }
    if (this.dictionaryForm.valid) {
      this.dictionaryService.saveDictionary(this.dictionary).subscribe( (res) => {
        this.msgSrv.success('保存成功');
        this.router.navigate(['/dictionary']);
      });
    }
  }
  // 关闭按钮
  closed() {
    this.router.navigate(['/dictionary']);
  }




}
