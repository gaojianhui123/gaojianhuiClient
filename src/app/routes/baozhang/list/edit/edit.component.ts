import { Component, OnInit } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';
import {BaozhangshenqingService} from '../../../../services/BaozhangshenqingService';
import { QueryParam } from '../../../../model/page/QueryParam';
import { Dictionary } from '../../../../model/Dictionary';
import { DictionaryService } from '../../../../services/DictionaryService';
import { LienPersonnelService } from '../../../../services/LienPersonnelService';
import { LienPersonnel } from '../../../../model/LienPersonnel';

@Component({
  selector: 'app-baozhang-list-edit',
  templateUrl: './edit.component.html',
})
export class BaozhangListEditComponent implements OnInit {
  dictionaryueryParam: QueryParam<Dictionary> = new QueryParam<Dictionary>();
  lizhiParam: QueryParam<LienPersonnel> = new QueryParam<LienPersonnel>();
  record: any = {};
  i: any;
  l: any;
  modalTitle: string;
  ids: string;
  schema: SFSchema = {
    properties: {
      bumen: { type: 'string', title: '部门', readOnly: true },
      tianBaoTime: { type: 'string', title: '填报日期', readOnly: true},
      lpName: { type: 'string', title: '被调查人编号', readOnly: true},
      chengbanbumen: { type: 'string', title: '案件承办部门', readOnly: true},
      matter: { type: 'string', title: '申请事项及具体需求', readOnly: true },
      apply: { type: 'string', title: '呈批情况',  readOnly: true },
      remark: { type: 'string', title: '备注',  readOnly: true },
    }
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: { span: 12 },
    },
    $matter: {
      widget: 'textarea',
      autosize: { minRows: 3, maxRows: 6 },
      grid: { span: 24 },
    },
    $apply: {
      widget: 'textarea',
      autosize: { minRows: 3, maxRows: 6 },
      grid: { span: 24 },
    },
    $remark: {
      widget: 'textarea',
      autosize: { minRows: 3, maxRows: 6 },
      grid: { span: 24 },
    },
  };


  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
    private baozhangshenqingService: BaozhangshenqingService,
    private dictionaryService: DictionaryService,
    private lienPersonnelService: LienPersonnelService,
  ) {
  }

  ngOnInit(): void {
    if (this.record.id) {
      this.modalTitle = '查看详情';
      this.baozhangshenqingService.findBaozhangshenqingById(this.record.id).subscribe(res => {
        if (res.bumen && this.record.lpId) {
          this.dictionaryService.getDictionaryById(this.i.bumen).subscribe( (bumen) => {
            this.lienPersonnelService.findLienPersonnelById(this.record.lpId).subscribe( (lp) => {
              if (lp) {
                res.lpName = lp.daiHao;
              }
              if (bumen) {
                res.bumen = bumen.dicName;
              }
              this.i = res;
            });
          });
        } else if (this.record.lpId) {
          this.lienPersonnelService.findLienPersonnelById(this.record.lpId).subscribe( (lp) => {
            if (lp) {
              res.lpName = lp.daiHao;
            }
            this.i = res;
          });
        } else {
          this.i = res;
        }
      });
    }
  }

  save(value: any) {
    this.http.post(`/user/${this.record.id}`, value).subscribe(res => {
      this.msgSrv.success('保存成功');
      this.modal.close(true);
    });
  }

  close() {
    this.modal.destroy();
  }
}
