import { EntranceGuardStaffDto } from '../../../../model/dto/entranceGuardStaffDto';
import { TanhuashenqingService } from '../../../../services/TanhuashenqingService';
import { HandlingPersonService } from '../../../../services/HandlingPersonService';
import { LienPersonnelService } from '../../../../services/LienPersonnelService';
import { DictionaryService } from '../../../../services/DictionaryService';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Tanhuashenqing } from '../../../../model/Tanhuashenqing';
import { CardInfoDtos } from '../../../../model/dto/CardInfoDtos';
import { LienPersonnel } from '../../../../model/LienPersonnel';
import { QueryParam } from '../../../../model/page/QueryParam';
import { NzI18nService, NzModalService } from 'ng-zorro-antd';
import { SanyiPage } from '../../../../model/page/SanyiPage';
import { Dictionary } from '../../../../model/Dictionary';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import { environment } from '@env/environment';
import { User } from '../../../../model/User';
import { forkJoin } from 'rxjs';
import { NgSelectConfig } from '@ng-select/ng-select';

@Component({
  selector: 'app-lien-tanhuashenqinginfo-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class TanhuashenqinginfoEditComponent implements OnInit {
  id: any;
  title1 = '新增谈话申请';
  validateForm: FormGroup;
  currentUser: User;
  renyuanxinxi = [];
  photourl = environment.photo_URL;
  lienPersonnelQuery: QueryParam<LienPersonnel> = new QueryParam<LienPersonnel>();
  lienPersonnels: Array<LienPersonnel> = new Array<LienPersonnel>();
  dictionaryueryParam: QueryParam<Dictionary> = new QueryParam<Dictionary>();
  dictionarycontentPage: SanyiPage<Dictionary> = new SanyiPage<Dictionary>();
  tanhuashenqing: Tanhuashenqing = new Tanhuashenqing();
  cardInfoDtoQuery: CardInfoDtos = new CardInfoDtos();
  isLoading = false;
  // 接收门禁系统中的人员列表
  entranceGuardStaffDtos: Array<EntranceGuardStaffDto> = new Array<EntranceGuardStaffDto>();
  // 接收门禁系统中的房门列表  后来改了 不获取立方的房门 改成输入字符串了
  // entranceGuardDoorDtos: Array<EntranceGuardDoorDto> = new Array<EntranceGuardDoorDto>();
  constructor(private modalService: NzModalService, private i18n: NzI18nService,
              private messageService: NzMessageService, private fb: FormBuilder,
              private router: Router, private route: ActivatedRoute, private handlingPersonService: HandlingPersonService,
              private lienPersonnelService: LienPersonnelService, private dictionaryService: DictionaryService,
              private tanhuashenqingService: TanhuashenqingService, private config: NgSelectConfig) {
    this.config.notFoundText = 'Custom not found';
    this.currentUser = this.tanhuashenqingService.getCurrentUser();
  }

  ngOnInit() {
    // 获取部门列表
    this.dictionaryueryParam.paging = false;
    this.dictionaryueryParam.query.dsId = '4028928b6781689b016782290b030001'; // 字典分类的 部门id
    // this.dictionaryService.findDictionary(this.dictionaryueryParam).subscribe( (res1) => {
    //   this.dictionarycontentPage = res1;
    // });
    // 获取门禁系统的人员列表
    // this.handlingPersonService.findMenjinStaffs(new EntranceGuardStaffDto()).subscribe((res2) => {
    //   // 过滤未删除的人员
    //   this.entranceGuardStaffDtos = res2.filter( staff => {
    //     return staff.isDeleted === '0';
    //   });
    // });
    forkJoin(this.dictionaryService.findDictionary(this.dictionaryueryParam),
      this.handlingPersonService.findMenjinStaffs(new EntranceGuardStaffDto())).subscribe(([res1, res2]) => {
      this.dictionarycontentPage = res1;
      // 过滤未删除的人员
      this.entranceGuardStaffDtos = res2.filter( staff => {
        return staff.isDeleted === '0';
      });
    });
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.title1 = '编辑谈话申请';
      // 获取文章
      this.tanhuashenqingService.findTanhuashenqingById(this.id).subscribe((result) => {
        this.tanhuashenqing = result;
        // console.log(this.tanhuashenqing);
        // this.selectBuMen();
      });
    }
    this.validateForm = this.fb.group({
      lpId:           [null, [Validators.required]],
      bumen:          [null, [Validators.required]],
      tianbaoren:     [null, [Validators.required]],
      tianBaoTime:    [null, [Validators.required]],
      renyuan:        [null, [Validators.required]]
      // renyuan1:        [null, [Validators.required]]
    });
  }
  // 选择人员之后做的change事件
  selectRenyuanChange() {
    this.renyuanxinxi = [];
    const xinxi = [];
    if (!this.tanhuashenqing.lifangStaffDto) {
      this.tanhuashenqing.lifangStaffDto = [];
    }
    this.tanhuashenqing.lifangStaffDto = new Array<EntranceGuardStaffDto>();
    this.tanhuashenqing.renyuan.forEach(r => {
      this.cardInfoDtoQuery.employeeId = r;
      const a1 = this.entranceGuardStaffDtos.filter( e => {
        return e.emplyId === r;
      });
      this.tanhuashenqing.lifangStaffDto = [...this.tanhuashenqing.lifangStaffDto, ...a1];
      this.handlingPersonService.findCardInfoDtos(this.cardInfoDtoQuery).subscribe(res => {
        xinxi.push(res);
        xinxi.sort((a, b) => a.employeeId - b.employeeId);
        this.renyuanxinxi = xinxi;
      });
    });
  }

  submitForm(): void {
    for (const i of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    // 需要在编辑的情况下 先对修改之前的人员进行解除人员权限
    // 再对修改之后的人员进行注册
    if (this.validateForm.valid === true) {
      this.tanhuashenqing.shenpiStatus = '0';
      this.tanhuashenqingService.saveTanhuashenqing(this.tanhuashenqing).subscribe((res) => {
        this.isLoading = false;
        if (res) {
          this.messageService.success('保存成功');
          this.router.navigate(['/lienTanhuashenqinginfo']);
        } else {
          this.messageService.error('保存失败');
        }
      });
    }
  }
  // 选择某个部门做的change操作
  selectBuMen() {
    if (this.tanhuashenqing.bumen) {
      this.isLoading = true;
      this.lienPersonnelQuery.paging = false;
      this.lienPersonnelQuery.query.cbDepartment = this.tanhuashenqing.bumen;
      this.lienPersonnelQuery.query.outStatus = '0'; // 未撤离
      this.lienPersonnelService.findLienPersonnels(this.lienPersonnelQuery).subscribe((res) => {
        this.lienPersonnels = res.content;
        if (this.lienPersonnels.filter( l => {
          return l.id === this.tanhuashenqing.lpId;
        }).length <= 0) {
          this.tanhuashenqing.lpId = null;
        }
        this.isLoading = false;
      });
    }
  }
  // 关闭按钮
  closed() {
    this.router.navigate(['/lienTanhuashenqinginfo']);
  }
}
