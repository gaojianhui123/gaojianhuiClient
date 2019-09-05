import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { CateringRoutingModule } from './catering-routing.module';
import { CateringListComponent } from './list/list.component';
import { CateringListViewComponent } from './list/view/view.component';
import {CateringService} from '../../services/CateringService';

const COMPONENTS = [
  CateringListComponent];
const COMPONENTS_NOROUNT = [
  CateringListViewComponent];

@NgModule({
  imports: [
    SharedModule,
    CateringRoutingModule,
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  providers: [
    CateringService
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class CateringModule { }
