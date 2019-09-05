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

@Component({
  selector: 'app-tanhuashenqinginfo-edit',
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
  lienPersonnels: SanyiPage<LienPersonnel> = new SanyiPage<LienPersonnel>();
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
              private tanhuashenqingService: TanhuashenqingService) {
    this.currentUser = this.tanhuashenqingService.getCurrentUser();
  }

  ngOnInit() {
    this.tanhuashenqing.bumen = this.currentUser.bumenId;
    this.dictionaryueryParam.paging = false;
    this.dictionaryueryParam.query.dsId = '4028928b6781689b016782290b030001';
    this.dictionaryueryParam.query.id = this.currentUser.bumenId;
    forkJoin(this.dictionaryService.findDictionary(this.dictionaryueryParam),
      this.handlingPersonService.findMenjinStaffs(new EntranceGuardStaffDto())).subscribe(([res1, res2]) => {
      this.dictionarycontentPage = res1;
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
      });
    } else {
      // 新增的部门就是当前用户的bumenId属性
      if (this.currentUser.bumenId) {
        this.tanhuashenqing.bumen = this.currentUser.bumenId;
      }
    }
    this.validateForm = this.fb.group({
      lpId: [null, [Validators.required]],
      bumen: [null, [Validators.required]],
      tianbaoren: [null, [Validators.required]],
      tianBaoTime: [null, [Validators.required]],
      renyuan: [null, [Validators.required]],
      renyuanObject: [null, []]
    });
    this.loadMore();
  }

  loadMore(): void {
    this.lienPersonnelQuery.paging = false;
    this.lienPersonnelQuery.query.cbDepartment = this.currentUser.bumenId;
    this.isLoading = true;
    this.lienPersonnelService.findLienPersonnels(this.lienPersonnelQuery).subscribe((res) => {
      this.lienPersonnels = res;
      this.lienPersonnels.content = this.lienPersonnels.content.filter((lp) => lp.outTime === null);
      this.isLoading = false;
    });
  }

  // 选择人员之后做的change事件
  selectRenyuanChange() {
    this.renyuanxinxi = [];
    const xinxi = [];
    if (!this.tanhuashenqing.lifangStaffDto) {
      this.tanhuashenqing.lifangStaffDto = [];
    }
    this.tanhuashenqing.renyuan.forEach(r => {
      this.cardInfoDtoQuery.employeeId = r;
      const a1 = this.entranceGuardStaffDtos.filter( e => {
        return e.emplyId === r;
      });
      this.tanhuashenqing.lifangStaffDto = [...this.tanhuashenqing.lifangStaffDto, ...a1];
      this.handlingPersonService.findCardInfoDtos(this.cardInfoDtoQuery).subscribe(res => {
        xinxi.push(res);
        xinxi.sort((a, b) => a.employeeId - b.employeeId); // 按照人员编号进行升序排序
        this.renyuanxinxi = xinxi;
      });
    });
  }

  submitForm(): void {
    this.tanhuashenqing.bumen = this.currentUser.bumenId;
    for (const i of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();
    }
    // 需要在编辑的情况下 先对修改之前的人员进行解除人员权限
    // 再对修改之后的人员进行注册
    if (this.validateForm.valid === true) {
      // if (this.id) {
      //   // 解除人员权限
      //   this.tanhuashenqingService.unregisteruserDoorArea(this.tanhuashenqingOld).subscribe();
      // }
      this.tanhuashenqing.shenpiStatus = '0';
      this.tanhuashenqingService.saveTanhuashenqing(this.tanhuashenqing).subscribe((res) => {
        this.isLoading = false;
        if (res) {
          this.messageService.success('保存成功');
          this.router.navigate(['/tanhuashenqinginfo']);
        } else {
          this.messageService.error('保存失败');
        }
      });
    }
  }

  // 关闭按钮
  closed() {
    this.router.navigate(['/tanhuashenqinginfo']);
  }
}
