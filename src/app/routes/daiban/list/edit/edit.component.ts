import {BaozhangshenqingService} from '../../../../services/BaozhangshenqingService';
import { EntranceGuardStaffDto } from '../../../../model/dto/entranceGuardStaffDto';
import {TanhuashenqingService} from '../../../../services/TanhuashenqingService';
import {HandlingPersonService} from '../../../../services/HandlingPersonService';
import {LienPersonnelService} from '../../../../services/LienPersonnelService';
import {DictionaryService} from '../../../../services/DictionaryService';
import { CardInfoDtos } from '../../../../model/dto/CardInfoDtos';
import {Tanhuashenqing} from '../../../../model/Tanhuashenqing';
import {LienPersonnel} from '../../../../model/LienPersonnel';
import {QueryParam} from '../../../../model/page/QueryParam';
import {SanyiPage} from '../../../../model/page/SanyiPage';
import {Dictionary} from '../../../../model/Dictionary';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd';
import {environment} from '@env/environment';
import { _HttpClient } from '@delon/theme';
import {forkJoin} from 'rxjs';

@Component({
  selector: 'app-daiban-list-edit',
  templateUrl: './edit.component.html',
})
export class DaibanListEditComponent implements OnInit {
  record: any = {};
  i: any;
  dis = false;
  apiurl = environment.SERVER_URL;
  renyuanxinxi: any = [];
  validateForm: FormGroup;
  isLoading = false;
  photourl = environment.photo_URL;
  tanhuashenqing: Tanhuashenqing = new Tanhuashenqing();
  cardInfoDtoQuery: CardInfoDtos = new CardInfoDtos();
  // 门禁系统里的人员列表
  entranceGuardStaffDtos: Array<EntranceGuardStaffDto> = new Array<EntranceGuardStaffDto>();
  // 接收门禁系统中的房门列表  改了不在立方系统中获取了
  // entranceGuardDoorDtos: Array<EntranceGuardDoorDto> = new Array<EntranceGuardDoorDto>();
  lienPersonnelquery: QueryParam<LienPersonnel> = new QueryParam<LienPersonnel>();
  lienPersonnelcontentPage: SanyiPage<LienPersonnel> = new SanyiPage<LienPersonnel>();
  currentUser: any;
  dictionaryueryParam: QueryParam<Dictionary> = new QueryParam<Dictionary>();
  dictionarycontentPage: SanyiPage<Dictionary> = new SanyiPage<Dictionary>();
  constructor(
    private msgSrv: NzMessageService,
    private tanhuashenqingService: TanhuashenqingService,
    public http: _HttpClient, private fb: FormBuilder,
    private router: Router, private route: ActivatedRoute,
    private lienPersonnelService: LienPersonnelService,
    private handlingPersonService: HandlingPersonService,
    private messageService: NzMessageService,
    private dictionaryService: DictionaryService,
    private baozhangshenqingService: BaozhangshenqingService
  ) {this.currentUser = this.baozhangshenqingService.getCurrentUser(); }

  ngOnInit(): void {

    this.dictionaryueryParam.query.dsId = '4028928b6781689b016782290b030001';
    this.dictionaryueryParam.query.id = this.currentUser.bumenId;
    // 查所有办案人员（调用门禁系统的人员列表） 初始化
    forkJoin(this.dictionaryService.findDictionary(this.dictionaryueryParam),
      this.lienPersonnelService.findLienPersonnels(this.lienPersonnelquery),
      this.handlingPersonService.findMenjinStaffs(new EntranceGuardStaffDto())).subscribe(([res1, res2, res3]) => {
      this.dictionarycontentPage = res1;
      this.lienPersonnelcontentPage = res2;
      this.entranceGuardStaffDtos = res3;
    });
    this.tanhuashenqing.bumen = this.currentUser.bumenId;
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.tanhuashenqingService.findTanhuashenqingById(id).subscribe((result) => {
        this.tanhuashenqing = result;
        if (this.tanhuashenqing.renyuan) {
          this.tanhuashenqing.renyuan.forEach(r => {
            this.cardInfoDtoQuery.employeeId = r;
            this.handlingPersonService.findCardInfoDtos(this.cardInfoDtoQuery).subscribe( res => {
              this.renyuanxinxi.push(res);
              // @ts-ignore
              this.renyuanxinxi.sort((a, b) => a.employeeId - b.employeeId);
            });
          });
        }
      });
    }
    this.validateForm = this.fb.group({
      lpId            : [ null, [] ],
      bumen            : [ null, [] ],
      tianbaoren            : [ null, [] ],
      tianBaoTime            : [ null, [] ],
      renyuan            : [ null, [] ],
      // doorId            : [ null, [] ],
      shenpiYijian: [ null, [] ],
    });
  }
// 同意
  submitForm(): void {
    for (const i of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }
    if (this.validateForm.valid === true) {
      this.isLoading = true;
      // this.tanhuashenqing.shenpiStatus = '1';
      this.tanhuashenqingService.saveTanhuashenqingTongyi(this.tanhuashenqing).subscribe((res) => {
        this.isLoading = false;
        if (res) {
          this.messageService.success('保存成功');
          this.router.navigate(['/daiban']);
        } else {
          this.messageService.error('保存失败');
        }
      });
    }
  }
  //  拒绝
  submitFormDeny(): void {
    for (const i of Object.keys(this.validateForm.controls)) {
      this.validateForm.controls[ i ].markAsDirty();
      this.validateForm.controls[ i ].updateValueAndValidity();
    }
    if (this.validateForm.valid === true) {
      this.isLoading = true;
      // this.tanhuashenqing.shenpiStatus = '2';
      this.tanhuashenqingService.saveTanhuashenqingJujue(this.tanhuashenqing).subscribe((res) => {
        this.isLoading = false;
        if (res) {
          this.messageService.success('保存成功');
          this.router.navigate(['/daiban']);
        } else {
          this.messageService.error('保存失败');
        }
      });
    }
  }

}
