import {Component, OnInit, ViewChild} from '@angular/core';
import {NzModalRef, NzMessageService} from 'ng-zorro-antd';
import {_HttpClient} from '@delon/theme';
import {SFSchema, SFUISchema} from '@delon/form';
import {TanhuashenqingService} from '../../../../services/TanhuashenqingService';
import {Dictionary} from '../../../../model/Dictionary';
import {DictionaryService} from '../../../../services/DictionaryService';
import {map} from 'rxjs/operators';
import {QueryParam} from '../../../../model/page/QueryParam';
import {HandlingPersonService} from '../../../../services/HandlingPersonService';

@Component({
  selector: 'app-tanhua-list-edit',
  templateUrl: './edit.component.html',
})
export class TanhuaListEditComponent implements OnInit {
  tanhua: any = {};
  i: any;
  obj = {};
  modalTitle: string;
  dictionaryueryParam: QueryParam<Dictionary> = new QueryParam<Dictionary>();
  ids = [];
  schema: SFSchema = {
    properties: {
      bumen: {
        type: 'string', title: '部门', readOnly: true,
        ui: {
          widget: 'select',
          showSearch: true,
          serverSearch: true,
          allowClear: true,
          asyncData: () => {
            this.dictionaryueryParam.query.dsId = '4028928b6781689b016782290b030001';
            this.dictionaryueryParam.query.id = this.i.bumen;
            return this.dictionaryService.getDictionaryById(this.dictionaryueryParam.query.id).pipe(map(res => {
              res.label = res.dicName;
              res.value = res.id;
              console.log(res);
              return [res];
            }));
          },
          dropdownMatchSelectWidth: false,
        }
      },
      tianbaoren: {type: 'string', title: '填报人', readOnly: true},
      tianBaoTime: {type: 'string', title: '填报日期', readOnly: true},
      renyuan: {
        type: 'string', title: '人员', readOnly: true,
        ui: {
          widget: 'select',
          showSearch: true,
          serverSearch: true,
          allowClear: true,
          mode: 'tags',
          asyncData: () => {
            return this.handlingPersonService.findHandlingPersonByIds(this.i.renyuan).pipe(map(value => {
              return value.map( v => {
                v.value = v.id;
                v.label = v.title;
                return v;
              });
            }));
          },
          dropdownMatchSelectWidth: false,
        }
      },
    },
    required: ['owner', 'callNo', 'href', 'description'],
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: {span: 12},
    },
  };

  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
    private tanhuashenqingService: TanhuashenqingService,
    private dictionaryService: DictionaryService,
    private handlingPersonService: HandlingPersonService,
  ) {
  }

  ngOnInit(): void {
    console.log(this.tanhua.id);
    if (this.tanhua.id) {
      this.modalTitle = '查看';
      this.tanhuashenqingService.findTanhuashenqingById(this.tanhua.id).subscribe(res => {
        console.log(res);
        this.i = res;
      });
    }
  }

  close() {
    this.modal.destroy();
  }
}
