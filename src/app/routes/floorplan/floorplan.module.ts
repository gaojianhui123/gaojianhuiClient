import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { FloorplanRoutingModule } from './floorplan-routing.module';
import { FloorplanListComponent } from './list/list.component';
import { FloorplanListEditComponent } from './list/edit/edit.component';
import { FloorplanListViewComponent } from './list/view/view.component';

const COMPONENTS = [
  FloorplanListComponent];
const COMPONENTS_NOROUNT = [
  FloorplanListEditComponent,
  FloorplanListViewComponent];

@NgModule({
  imports: [
    SharedModule,
    FloorplanRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class FloorplanModule { }
