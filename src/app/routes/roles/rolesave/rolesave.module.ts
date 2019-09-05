import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NzTreeService} from 'ng-zorro-antd';
import {RolesaveRoutingModule} from './rolesave-routing.module';
import {RolesaveComponent} from './rolesave.component';
import {RoleService} from '../../../services/RoleService';
import {SystemService} from '../../../services/SystemService';
import {ProtectedResourceService} from '../../../services/ProtectedResourceService';
import {SharedModule} from '@shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule,
    CommonModule,
    FormsModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    RolesaveRoutingModule,
    SharedModule
  ],
  declarations: [RolesaveComponent],
  providers: [RoleService, SystemService, ProtectedResourceService, NzTreeService]
})
export class RolesaveModule { }
