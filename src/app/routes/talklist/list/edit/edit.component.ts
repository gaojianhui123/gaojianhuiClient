import { EntranceGuardStaffDto } from '../../../../model/dto/entranceGuardStaffDto';
import {TanhuashenqingService} from '../../../../services/TanhuashenqingService';
import {HandlingPersonService} from '../../../../services/HandlingPersonService';
import {LienPersonnelService} from '../../../../services/LienPersonnelService';
import {NzMessageService, NzModalService, NzI18nService} from 'ng-zorro-antd';
import {DictionaryService} from '../../../../services/DictionaryService';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { CardInfoDtos } from '../../../../model/dto/CardInfoDtos';
import {Tanhuashenqing} from '../../../../model/Tanhuashenqing';
import {LienPersonnel} from '../../../../model/LienPersonnel';
import {QueryParam} from '../../../../model/page/QueryParam';
import {SanyiPage} from '../../../../model/page/SanyiPage';
import {Dictionary} from '../../../../model/Dictionary';
import {ActivatedRoute, Router} from '@angular/router';
import { Component, OnInit} from '@angular/core';
import { environment } from '@env/environment';

@Component({
  selector: 'app-talklist-list-edit',
  templateUrl: './edit.component.html',
})
export class EditComponent implements OnInit {
  record: any = {};
  i: any = [];
  title1 = '';
  photourl = environment.photo_URL;
  renyuanxinxi: any = [];
  validateForm: FormGroup;
  tanhuashenqing: Tanhuashenqing = new Tanhuashenqing();
  isLoading = false;
  lienPersonnelquery: QueryParam<LienPersonnel> = new QueryParam<LienPersonnel>();
  lienPersonnelcontentPage: SanyiPage<LienPersonnel> = new SanyiPage<LienPersonnel>();
  currentUser: any;
  // 查部门
  dictionaryueryParam: QueryParam<Dictionary> = new QueryParam<Dictionary>();
  dictionarycontentPage: SanyiPage<Dictionary> = new SanyiPage<Dictionary>();
  entranceGuardStaffDtos: Array<EntranceGuardStaffDto> = new Array<EntranceGuardStaffDto>();
  // 接收门禁系统中的房门列表 该需求了 不从立方系统获取了 直接填的是字符串了
  // entranceGuardDoorDtos: Array<EntranceGuardDoorDto> = new Array<EntranceGuardDoorDto>();
  cardInfoDtoQuery: CardInfoDtos = new CardInfoDtos();
  constructor(private modalService: NzModalService, private i18n: NzI18nService, private handlingPersonService: HandlingPersonService,
              private messageService: NzMessageService, private fb: FormBuilder, private dictionaryService: DictionaryService,
              private router: Router, private route: ActivatedRoute,
              private lienPersonnelService: LienPersonnelService, private tanhuashenqingService: TanhuashenqingService) {
    this.currentUser = this.lienPersonnelService.getCurrentUser();
  }

  ngOnInit() {
    this.tanhuashenqing.bumen = this.currentUser.bumenId;
    /**
     * 获取所有部门
     */
    this.dictionaryueryParam.query.dsId = '4028928b6781689b016782290b030001';
    this.dictionaryueryParam.query.id = this.currentUser.bumenId;
    this.dictionaryueryParam.paging = false;
    this.dictionaryService.findDictionary(this.dictionaryueryParam).subscribe((result) => {
      this.dictionarycontentPage = result;
    });
    // 查所有办案人员（调用门禁系统的人员列表）
    this.handlingPersonService.findMenjinStaffs(new EntranceGuardStaffDto()).subscribe((res1) => {
      this.entranceGuardStaffDtos = res1;
    });
    /**
     * 获取所有留置人员数据
     */
    this.lienPersonnelquery.paging = false;
    this.lienPersonnelService.findLienPersonnels(this.lienPersonnelquery).subscribe((res1) => {
      this.lienPersonnelcontentPage = res1;
    });
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.title1 = '谈话信息查看';
      this.tanhuashenqingService.findTanhuashenqingById(id).subscribe((result) => {
        this.tanhuashenqing = result;
        if (this.tanhuashenqing.renyuan) {
          this.tanhuashenqing.renyuan.forEach(r => {
            this.cardInfoDtoQuery.employeeId = r;
            this.handlingPersonService.findCardInfoDtos(this.cardInfoDtoQuery).subscribe( res => {
                this.renyuanxinxi.push(res);
            });
          });
        }
      });
    }
    this.validateForm = this.fb.group({
      lpId            : [ null, [ Validators.required ] ],
      bumen            : [ null, [ Validators.required ] ],
      tianbaoren            : [ null, [ Validators.required ] ],
      tianBaoTime            : [ null, [ Validators.required ] ],
      renyuan            : [ null, [ Validators.required ] ],
      shenpiYijian: [ null, [ Validators.required ] ],
      doorId            : [ null, [ Validators.required ] ],
    });
  }


}
