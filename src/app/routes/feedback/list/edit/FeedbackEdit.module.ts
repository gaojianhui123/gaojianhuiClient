import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '@shared/shared.module';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {FeedbackService} from '../../../../services/FeedbackService';
import {FeedbackEditComponent} from './FeedbackEdit.component';
import {FeedbackEditRoutingModule} from './FeedbackEdit-routing.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    FeedbackEditRoutingModule,
    SharedModule,
  ],
  declarations: [FeedbackEditComponent],
  providers: [FeedbackService]
})
export class FeedbackEditModule { }
