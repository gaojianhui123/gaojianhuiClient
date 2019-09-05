import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { LienpersonnelRoutingModule } from './lienpersonnel-routing.module';
import { LienpersonnelListComponent } from './list/list.component';
import { LienpersonnelListViewComponent } from './list/view/view.component';
import { FileUploadService } from '../../services/FileUploadService';
import { LienPersonnelEditComponent } from './list/edit/lienPersonnel-edit.component';

const COMPONENTS = [
  LienpersonnelListComponent
];
const COMPONENTS_NOROUNT = [
  LienPersonnelEditComponent,
  LienpersonnelListViewComponent,
];

@NgModule({
  imports: [
    SharedModule,
    LienpersonnelRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT,
  providers: [FileUploadService]
})
export class LienpersonnelModule { }
