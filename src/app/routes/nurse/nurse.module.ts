import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { NurseRoutingModule } from './nurse-routing.module';
import { NurseListComponent } from './list/list.component';
import { NurseListViewComponent } from './list/view/view.component';
import {NurseService} from '../../services/NurseService';
import { NurseListEditComponent } from './list/edit/save.component';
import { LienPersonnelTanHuaRelateService } from '../../services/LienPersonnelTanHuaRelateService';

const COMPONENTS = [
  NurseListEditComponent,
  NurseListComponent
];
const COMPONENTS_NOROUNT = [
  NurseListViewComponent];
const COMPONENTS_PROVIDERS = [
  NurseService,
  LienPersonnelTanHuaRelateService
];
@NgModule({
  imports: [
    SharedModule,
    NurseRoutingModule
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
export class NurseModule { }
