import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { HandlingpersonRoutingModule } from './handlingperson-routing.module';
import { HandlingpersonListComponent } from './list/list.component';
import { HandlingpersonListViewComponent } from './list/view/view.component';
import {HandlingPersonService} from '../../services/HandlingPersonService';
import {NgZorroAntdModule} from 'ng-zorro-antd';

const COMPONENTS = [
  HandlingpersonListComponent];
const COMPONENTS_NOROUNT = [
  HandlingpersonListViewComponent];

@NgModule({
  imports: [
    NgZorroAntdModule,
    SharedModule,
    HandlingpersonRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  providers: [HandlingPersonService],
  entryComponents: COMPONENTS_NOROUNT
})
export class HandlingpersonModule { }
