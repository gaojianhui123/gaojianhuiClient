import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RoleRoutingModule} from './role-routing.module';
import {RoleComponent} from './role.component';
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
    RoleRoutingModule,
    SharedModule
  ],
  declarations: [RoleComponent],
  providers: [RoleService, SystemService, ProtectedResourceService]
})
export class RoleModule { }
