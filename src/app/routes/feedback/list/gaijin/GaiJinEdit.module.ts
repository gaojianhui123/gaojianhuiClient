import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '@shared/shared.module';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {FeedbackService} from '../../../../services/FeedbackService';
import { GaiJinEditComponent } from './GaiJinEdit.component';
import { GaiJinEditRoutingModule } from './GaiJinEdit-routing.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    GaiJinEditRoutingModule,
    SharedModule,
  ],
  declarations: [GaiJinEditComponent],
  providers: [FeedbackService]
})
export class GaiJinEditModule { }
