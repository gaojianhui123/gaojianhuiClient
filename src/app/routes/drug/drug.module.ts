import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { DrugRoutingModule } from './drug-routing.module';
import {DrugService} from '../../services/DrugService';
import {DrugListComponent} from './list/list.component';
import {DrugListViewComponent} from './list/view/view.component';

const COMPONENTS = [
  DrugListComponent];
const COMPONENTS_NOROUNT = [
  DrugListViewComponent];
const COMPONENTS_PROVIDERS = [
  DrugService
];
@NgModule({
  imports: [
    SharedModule,
    DrugRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  providers: [
  ...COMPONENTS_PROVIDERS
  ],

  entryComponents: COMPONENTS_NOROUNT
})
export class DrugModule { }
