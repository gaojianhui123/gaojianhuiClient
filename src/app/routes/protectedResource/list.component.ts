import {ProtectedResourceService} from '../../services/ProtectedResourceService';
import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ProtectedResource} from '../../model/ProtectedResource';
import { NzModalService, NzTreeNode } from 'ng-zorro-antd';
import {QueryParam} from '../../model/page/QueryParam';
import {FormBuilder, FormGroup} from '@angular/forms';
import {SanyiPage} from '../../model/page/SanyiPage';
import {NzMessageService} from 'ng-zorro-antd';
import {systemconst} from '../../systemconst';
export interface TreeNodeInterface {
  id: number;
  name: string;
  age: number;
  level: number;
  expand: boolean;
  address: string;
  children?: TreeNodeInterface[];
}
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})

export class ListComponent  implements OnInit, AfterViewInit {
  icons = [];
  expandDataCache = {};
  queryParam: QueryParam<ProtectedResource> = new QueryParam<ProtectedResource>();
  contentPage: SanyiPage<ProtectedResource> = new SanyiPage<ProtectedResource>();
  protectedResource: ProtectedResource = new ProtectedResource();
  basicTableLoading = true;

  // 接收树形数据
  protectedResources: any;
  color: string;
  isVisible = false;
  isConfirmLoading = false;
  visible: boolean;          // 是否打开图标层级
  title1: string;
  // 表单验证
  validateForm: FormGroup;
  r: NzTreeNode;
  constructor(private protectedResourceService: ProtectedResourceService,
              private modalService: NzModalService, private messageService: NzMessageService,
              private fb: FormBuilder) {
    this.icons = systemconst.icons;
    this.queryParam.page = {currentPage: 1, sizePerPage: 1 };
  }
  @ViewChild('treeCom') treeCom;
  // defaultCheckedKeys = [ '1001', '1002' ];
  defaultSelectedKeys = [ '10011' ];
  // defaultExpandedKeys = [ '100', '1001' ];

  queryContents(reset: boolean = false) {
    if (reset) {
      this.queryParam.page.currentPage  = 1;
    }
    this.basicTableLoading = true;
    this.protectedResourceService.findProtectedResource(this.queryParam).subscribe( (result) => {
      this.protectedResources = result;
      console.log(result);
        this.protectedResources.forEach(item => {
        this.expandDataCache[ item.id ] = this.convertTreeToList(item);
      });
      this.basicTableLoading = false;
      if (!event) {
        console.log('共计查询' + result.totalElements + '条记录');
      }
    }, err => {
      console.log('查询失败！', '请联系管理员！' + err.message, 'error');

    });
  }
  ngOnInit(): void {
    this.queryContents();
    this.validateForm = this.fb.group({
      pid:           [ null, [] ],          // 树节点
      title:         [ null, [] ],                               // 姓名/标题
      url:           [ null, [] ],                               //  url
      tyle:          [ null, [] ],                               // 类型（按钮/菜单/访问地址）
      icon:          [ null, [] ],                               // 图标
      iconcolor:     [ null, [] ],                               // 图标颜色
      sortindex:     [ null, [] ],                               // 排序
      description:   [ null, [] ],                               // 备注
    });
  }
  ngAfterViewInit() {

  }

  collapse(array: TreeNodeInterface[], data: TreeNodeInterface, $event: boolean): void {
    if ($event === false) {
      if (data.children) {
        data.children.forEach(d => {
          const target = array.find(a => a.id === d.id);
          target.expand = false;
          this.collapse(array, target, false);
        });
      } else {
        return;
      }
    }
  }

  convertTreeToList(root: object): TreeNodeInterface[] {
    const stack = [];
    const array = [];
    const hashMap = {};
    stack.push({ ...root, level: 0, expand: false });
    while (stack.length !== 0) {
      const node = stack.pop();
      this.visitNode(node, hashMap, array);
      if (node.children) {
        for (let i = node.children.length - 1; i >= 0; i--) {
          stack.push({ ...node.children[ i ], level: node.level + 1, expand: false, parent: node });
        }
      }
    }

    return array;
  }

  visitNode(node: TreeNodeInterface, hashMap: object, array: TreeNodeInterface[]): void {
    if (!hashMap[ node.id ]) {
      hashMap[ node.id ] = true;
      array.push(node);
    }
  }

  /**
   * 模态框 弹出新增
   */
  showModal(): void {
    this.isVisible = true;
    this.title1 = '新增受限资源';
    // jQuery('.default').asIconPicker();
    this.protectedResource = new ProtectedResource();
  }

  /**
   * 弹出编辑
   * @param item
   */
  showModalEdit(item: any): void {
    this.isVisible = true;
    this.title1 = '受限资源修改';
    // jQuery('.default').asIconPicker('set', this.protectedResource.icon);
    this.protectedResourceService.findProtectedResourceById(item).subscribe( (result) => {
      this.protectedResource = result ;
    });
}

  /**
   * 删除
   * @param item
   */
  showModalDeleted(item: any ): void {
    // this.isVisible = true;
    this.modalService.confirm({
      nzTitle: '确定要删除 ' + item.title + ' 权限机构吗？',
      nzContent: '<b style="color: #ff0000;">删除后将不可恢复！</b>',
      nzOkText: '确定',
      nzOkType: 'danger',
      nzOnOk: () => {
          if (item.children) {
            this.messageService.error('删除失败!该数据存在下级数据，请先删除下级数据');
          } else {
            this.protectedResourceService.deletedProtectedResource(item).subscribe(res => {
              this.messageService.success('删除成功');
              this.queryContents();
            });
           }
      },
      nzCancelText: '取消',
      nzOnCancel: () => console.log('Cancel')
    });
  }


  /**
   *  保存
   * @constructor
   */
  handleOk(): void {
    // 表单验证
    // tslint:disable-next-line:forin
    for (const i in this.validateForm.controls) {
      this.validateForm.controls[i].markAsDirty();
      this.validateForm.controls[i].updateValueAndValidity();          // 更新值和有效性
    }
    if (this.validateForm.valid === true) {
      this.isConfirmLoading = true;
      this.protectedResourceService.saveProtectedResource(this.protectedResource).subscribe( (result) => {
        this.queryContents();
        this.isVisible = false;
        this.isConfirmLoading = false;
        if (result) {
          console.log(
            '保存成功！',
            '',
            'success'
          );
          // this.queryContents();
        } else {
          console.log(
            '保存失败！',
            '',
            'error'
          );
        }
      });
    }
   }

  handleCancel(): void {
    this.isVisible = false;
  }

// 打印 选中的上级 的 id
  onChange($event: string): void {
    // console.log($event);
  }
// 关闭图标层级
  clickMe(): void {
    this.visible = false;
  }
  change(value: boolean): void {
    // console.log(value);
  }


  clickCon(o: any): void {
    // console.log(o);
    this.protectedResource.icon = o.nzValue;
    this.visible = false;
  }

}
