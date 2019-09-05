import { NgModule } from '@angular/core';
import { ReactiveFormsModule} from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';
import { RoleService } from '../../services/RoleService';
import { SystemService } from '../../services/SystemService';
import { StatisticRoutingModule } from './statistic-routing.module';
import { StatisticComponent } from './statistic.component';
import { NgxEchartsModule } from 'ngx-echarts';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    ColorPickerModule,
    ReactiveFormsModule,
    StatisticRoutingModule,
    NgxEchartsModule
  ],
  declarations: [StatisticComponent],
  providers: [RoleService, SystemService]
})
export class StatisticModule { }
