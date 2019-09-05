import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { FeedbackRoutingModule } from './feedback-routing.module';
import { FeedbackListComponent } from './list/list.component';
import { FeedbackListViewComponent } from './list/view/view.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {FeedbackService} from '../../services/FeedbackService';

const COMPONENTS = [
  FeedbackListComponent];
const COMPONENTS_NOROUNT = [
  FeedbackListViewComponent];

@NgModule({
  imports: [
    NgZorroAntdModule,
    SharedModule,
    FeedbackRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  providers: [FeedbackService],
  entryComponents: COMPONENTS_NOROUNT
})
export class FeedbackModule { }
