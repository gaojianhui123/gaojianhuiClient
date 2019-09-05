import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { STColumn, STComponent, STData } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { environment } from '@env/environment';
import { QueryParam } from '../../../model/page/QueryParam';
import { Dictsort } from '../../../model/Dictsort';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import {DictsortService} from '../../../services/DictsortService';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dictsort-list',
  templateUrl: './list.component.html',
})
export class DictsortListComponent implements OnInit {
  url = environment.SERVER_URL + `dictsort/findDictsort`;
  query: QueryParam<Dictsort> = new QueryParam<Dictsort>();
  searchSchema: SFSchema = {
    properties: {
      dictsortName: {
        type: 'string',
        title: '分类名称',
        ui: {
          width: 300,
        }
      }
    }
  };
  @ViewChild('st') st: STComponent;
  columns: STColumn[] = [
    { title: '序号', type: 'no' },
    { title: '分类名称', index: 'dictsortName' },
    { title: '是否自用', type: 'badge', index: 'isOwnerString', render: 'custom' },
    {
      title: '操作区',
      buttons: [
        // { text: '查看', click: (item: any) => `/form/${item.id}` },
        // { text: '编辑', type: 'modal', component: DictsortListEditComponent,
        //   click: ((record: , modal?: any, instance?: STComponent) => any},
        {
          text: '编辑', click: (item: any) =>
            this.goToEdit(item.id)
        },
        {
          text: '删除', click: (item: any) =>
            this.goToDeleted(item)
        }
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
  constructor(private http: _HttpClient, private modal: ModalHelper,
              public dictsortService: DictsortService, private msgSrv: NzMessageService,
              private modalService: NzModalService, private router: Router) {
  }

  // 初始化
  ngOnInit() {
  }

  // 新增
  add() {
    this.router.navigate(['/dictsort/dictsortsave']);
  }

  // 编辑
  goToEdit(id: any) {
    this.router.navigate(['/dictsort/dictsortsave', {id: id}]);
  }

  // 删除
  goToDeleted(item: any) {
    this.modalService.confirm({
      nzTitle: '确定要删除 ' + item.dictsortName + ' 分类名称？',
      nzContent: '<b style="color: #ff0000;">删除后将不可恢复！</b>',
      nzOkText: '确定',
      nzOkType: 'danger',
      nzOnOk: () => {
        this.dictsortService.deleteDictsort(item).subscribe((res) => {
          this.msgSrv.success('删除成功');
          this.st.reload();
        });
      },
      nzCancelText: '取消',
      nzOnCancel: () => console.log('Cancel')
    });
  }
  reset($event) {
    this.query.query = new Dictsort();
    this.st.load($event);
  }

}
