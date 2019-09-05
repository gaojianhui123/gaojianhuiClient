import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { BzspRoutingModule } from './bzsp-routing.module';
import { BzspListComponent } from './list/list.component';
import { BzspListViewComponent } from './list/view/view.component';

const COMPONENTS = [
  BzspListComponent];
const COMPONENTS_NOROUNT = [
  BzspListViewComponent];

@NgModule({
  imports: [
    SharedModule,
    BzspRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class BzspModule { }
