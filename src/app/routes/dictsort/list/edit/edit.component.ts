import {ActivatedRoute, Router} from '@angular/router';
import {Component, OnInit} from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';
import {NzModalService} from 'ng-zorro-antd';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Dictsort} from '../../../../model/Dictsort';
import {DictsortService} from '../../../../services/DictsortService';

@Component({
  selector: 'app-dictsort-edit',
  templateUrl: './edit.component.html'
})
export class DictsortEditComponent implements OnInit {
  dictsortForm: FormGroup;
  // 字典分类对象
  dictsort: Dictsort = new Dictsort();
  title = '录入';
  constructor(private modalService: NzModalService, private dictsortService: DictsortService,
              private msgSrv: NzMessageService, private router: Router, private route: ActivatedRoute,
              private fb: FormBuilder) {
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.dictsortForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [ s: string ]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.dictsortForm.controls.password.value) {
      return { confirm: true, error: true };
    }
  }

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }
  ngOnInit() {
    this.dictsortForm = this.fb.group({
      dictsortName            : [ null, [ Validators.required  ] ],
      isOwner      : [ null, [ Validators.required  ] ],
      // unit                : [ null, [ Validators.required  ] ],
      // price               : [ null, [ Validators.required  ] ],
      // doctor              : [ null, [ Validators.required  ] ],
      // remark              : [ null, [ ] ],
      // rukuTime            : [ null, [ Validators.required  ] ]
      // checkPassword    : [ null, [ Validators.required, this.confirmationValidator ] ],
      // agree            : [ false ]
    });
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.title = '编辑';
      this.dictsortService.getDictsortById(id).subscribe( (res) => {
        this.dictsort = res;
      });
    }
  }
  // 保存
  save(): void {
    for (const i of Object.keys(this.dictsortForm.controls)) {
      this.dictsortForm.controls[ i ].markAsDirty();
      // 更新值且校验数据
      this.dictsortForm.controls[ i ].updateValueAndValidity();
    }
    if (this.dictsortForm.valid) {
      this.dictsortService.saveDictsort(this.dictsort).subscribe( (res) => {
        this.msgSrv.success('保存成功');
        this.router.navigate(['/dictsort']);
      });
    }
  }
  // 关闭按钮
  closed() {
    this.router.navigate(['/dictsort']);
  }


}
