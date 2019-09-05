import { StatistictanhuaRoutingModule } from './statistictanhua-routing.module';
import { StatistictanhuaComponent } from './statistictanhua.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SystemService } from '../../services/SystemService';
import { RoleService } from '../../services/RoleService';
import { ColorPickerModule } from 'ngx-color-picker';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { CommonModule } from '@angular/common';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { NurseService } from '../../services/NurseService';

@NgModule({
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    NgxEchartsModule,
    NgZorroAntdModule,
    ColorPickerModule,
    ReactiveFormsModule,
    StatistictanhuaRoutingModule,
  ],
  declarations: [StatistictanhuaComponent],
  providers: [RoleService, SystemService, NurseService]
})
export class StatistictanhuaModule { }
