import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { MedicalrecordsRoutingModule } from './medicalrecords-routing.module';
import { MedicalrecordsListComponent } from './list/list.component';
import { MedicalrecordsListEditComponent } from './list/edit/edit.component';
import { MedicalrecordsListViewComponent } from './list/view/view.component';

const COMPONENTS = [
  MedicalrecordsListComponent];
const COMPONENTS_NOROUNT = [
  MedicalrecordsListEditComponent,
  MedicalrecordsListViewComponent];

@NgModule({
  imports: [
    SharedModule,
    MedicalrecordsRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class MedicalrecordsModule { }
