import {DictionaryService} from '../../../services/DictionaryService';
import {DictsortService} from '../../../services/DictsortService';
import {NzMessageService, NzModalService} from 'ng-zorro-antd';
import { Component, OnInit, ViewChild } from '@angular/core';
import {QueryParam} from '../../../model/page/QueryParam';
import {STColumn, STComponent, STData} from '@delon/abc';
import { _HttpClient, ModalHelper } from '@delon/theme';
import {Dictionary} from '../../../model/Dictionary';
import { environment } from '@env/environment';
import { SFSchema } from '@delon/form';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dictionary-list',
  templateUrl: './list.component.html',
})
export class DictionaryListComponent implements OnInit {
  url = environment.SERVER_URL + `dictionary/findDictionarys`;
  query: QueryParam<Dictionary> = new QueryParam<Dictionary>();
  searchSchema: SFSchema = {
    properties: {
      sortName: {
        type: 'string',
        title: '字典分类',
        ui: {
          width: 300,
        }
      },
      dicName: {
        type: 'string',
        title: '字典名称',
        ui: {
          width: 300,
        }
      }
    }
  };
  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    { title: '序号', type: 'no'},
    { title: '所属分类', index: 'sortName'},
    // { title: '排序', index: 'dicIndex'},
    { title: '字典名称', index: 'dicName'},
    { title: '拼音码', index: 'dicPyCode'},
    { title: '是否自用',  index: 'isOwnerString'},
    {
      title: '操作区',
      buttons: [
        {text: '编辑', click: (item: any) => this.goToEdit(item.id)},
        {text: '删除', click: (item: any) => this.goToDeleted(item)}
      ]
    }
  ];
// 对数据进行修改显示
  processData = (data: STData[]) => {
    data.map( d => {
      if (d.isOwner === 0) {
        d.isOwnerString = '是';
      } else if (d.isOwner === 1) {
        d.isOwnerString = '否';
      } else {
        d.isOwnerString = '';
      }
    });
    return data;
  }
  constructor(private http: _HttpClient, private modal: ModalHelper, private router: Router,
              private modalService: NzModalService, private msgSrv: NzMessageService,
              private dictionaryService: DictionaryService, private dictsortService: DictsortService
  ) { }

  ngOnInit() { }

  // 新增
  add() {
    this.router.navigate(['/dictionary/dictionarysave']);
  }

  // 编辑
  goToEdit(id: any) {
    this.router.navigate(['/dictionary/dictionarysave', {id: id}]);
  }

  // 删除
  goToDeleted(item: any) {
    this.modalService.confirm({
      nzTitle: '确定要删除 ' + item.dictsortName + ' 分类名称？',
      nzContent: '<b style="color: #ff0000;">删除后将不可恢复！</b>',
      nzOkText: '确定',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.dictionaryService.deleteDictionary(item).subscribe((res) => {
          this.msgSrv.success('删除成功');
          this.st.reload();
        });
      },
      nzCancelText: '取消',
      nzOnCancel: () => console.log('Cancel')
    });
  }
  reset($event) {
    this.query.query = new Dictionary();
    this.st.load($event);
  }

}
