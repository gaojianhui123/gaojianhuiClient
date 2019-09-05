import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UsermanageComponent} from './usermanage.component';
import {UsermanageRoutingModule} from './usermanage-routing.module';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {FormsModule} from '@angular/forms';
import {SystemService} from '../../../services/SystemService';
import {SharedModule} from '@shared/shared.module';

@NgModule({
  imports: [
    FormsModule,
    NgZorroAntdModule,
    CommonModule,
    UsermanageRoutingModule,
    SharedModule,
  ],
  declarations: [UsermanageComponent],
  providers: [SystemService]
})
export class UsermanageModule { }
