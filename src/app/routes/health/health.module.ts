import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { HealthRoutingModule } from './health-routing.module';
import { HealthListComponent } from './list/list.component';
import { HealthListEditComponent } from './list/edit/edit.component';
import { HealthListViewComponent } from './list/view/view.component';
import { DictsortService } from '../../services/DictsortService';
import { HealthService } from '../../services/HealthService';

const COMPONENTS = [
  HealthListComponent];
const COMPONENTS_NOROUNT = [
  HealthListEditComponent,
  HealthListViewComponent];

@NgModule({
  imports: [
    SharedModule,
    HealthRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  providers: [DictsortService, HealthService],
  entryComponents: COMPONENTS_NOROUNT
})
export class HealthModule { }
