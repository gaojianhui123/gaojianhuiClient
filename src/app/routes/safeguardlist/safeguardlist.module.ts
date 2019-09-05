import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { SafeguardlistRoutingModule } from './safeguardlist-routing.module';
import { SafeguardlistListComponent } from './list/list.component';
import { SafeguardlistListViewComponent } from './list/view/view.component';
import {LienPersonnelService} from '../../services/LienPersonnelService';

const COMPONENTS = [
  SafeguardlistListComponent];
const COMPONENTS_NOROUNT = [
  SafeguardlistListViewComponent];

@NgModule({
  imports: [
    SharedModule,
    SafeguardlistRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  providers: [
    LienPersonnelService
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class SafeguardlistModule { }
