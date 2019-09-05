import {Component, OnInit, ViewChild} from '@angular/core';
import {NzModalService} from 'ng-zorro-antd';
import {FormBuilder} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd';
import {ActivatedRoute, Router} from '@angular/router';
import {NzFormatEmitEvent} from 'ng-zorro-antd';
import {NzTreeService} from 'ng-zorro-antd';
import { forkJoin } from 'rxjs';
import {NzTreeNode} from 'ng-zorro-antd';
import {QueryParam} from '../../../model/page/QueryParam';
import {ProtectedResource} from '../../../model/ProtectedResource';
import {SanyiPage} from '../../../model/page/SanyiPage';
import {ProtectedResourceService} from '../../../services/ProtectedResourceService';
import {RoleService} from '../../../services/RoleService';
import {Role} from '../../../model/Role';

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
  selector: 'app-rolesave',
  templateUrl: './rolesave.component.html',
  styleUrls: ['./rolesave.component.css']
})
export class RolesaveComponent implements OnInit {
  queryParamP: QueryParam<ProtectedResource> = new QueryParam<ProtectedResource>();
  contentPageP: SanyiPage<ProtectedResource> = new SanyiPage<ProtectedResource>();
  protectedR: ProtectedResource = new ProtectedResource();
  protectedResourceTree: any; // 接收树形数据
  basicTableLoading = true;
  expandDataCache = {};
  role: Role = new Role();
  title1: string ;
  constructor(private protectedResourceService: ProtectedResourceService, private modalService: NzModalService, private  nzTreeService: NzTreeService,
              private messageService: NzMessageService, private fb: FormBuilder,
              private roleService: RoleService, private router: Router, private route: ActivatedRoute ) {

  }
  @ViewChild('treeCom') treeCom;
  selectedKeys = [];

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.title1 = '编辑角色';
      // 同时执行查当前对象和树数据
      forkJoin(this.roleService.findRoleById(id), this.protectedResourceService.findProtectedResource(this.queryParamP)).subscribe(([res1, res2]) => {
        this.role = res1;
        this.selectedKeys = this.role.protectedResources.map(node => node.id);
        this.selectedNode(res2);
        this.protectedResourceTree = res2;
        this.protectedResourceTree.forEach(item => {
          this.expandDataCache[ item.id ] = this.convertTreeToList(item);
        });
      });
    } else {
      this.title1 = '新增角色';
      this.selectTrees();
    }
  }
  // 查询权限树
  selectTrees(reset: boolean = false) {
    if (reset) {
      this.queryParamP.page.currentPage  = 1;
    }
    this.protectedResourceService.findProtectedResource(this.queryParamP).subscribe( (res) => {

      this.protectedResourceTree = res;
      this.protectedResourceTree.forEach(item => {
        this.expandDataCache[ item.id ] = this.convertTreeToList(item);
      });
    });
  }

  selectedNode( protectedResources: ProtectedResource[]) {
    protectedResources.forEach( p => {
      if (this.selectedKeys.findIndex(key => key === p.id) >= 0) {
        p.selected = true;
      }
      if (p.children) {
        this.selectedNode(p.children);
      } else {
        p.isLeaf = true;
      }
    });

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
  submitForm() {
    // var allselect = [];
    // this.treeCom.getCheckedNodeList().forEach(node =>{
    //   allselect.push(node);
    //   // allselect.concat(this.children(node));
    //   // this.children(node).forEach(a=> {
    //   //   allselect.push(a);
    //   // })
    //   // console.log(this.children(node));
    // });
    // this.treeCom.getHalfCheckedNodeList().forEach(node => {
    //   allselect.push(node);
    // })
    this.role.protectedResources = this.treeCom.getSelectedNodeList().map(node => node.origin);
    this.roleService.saveRole(this.role).subscribe(res => {
      console.log(res);
      if (res) {
        console.log(
          '保存成功！',
          '',
          'success'
        );
        this.router.navigate(['/role']);
      } else {
        console.log(
          '保存失败！',
          '',
          'error'
        );
      }
    });
  }
  // 关闭按钮
  closed() {
    this.router.navigate(['/role']);
  }


}
