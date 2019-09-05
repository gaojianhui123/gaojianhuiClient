import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { TalklistRoutingModule } from './talklist-routing.module';
import { TalklistListComponent } from './list/list.component';
import { TalklistListViewComponent } from './list/view/view.component';
import {TanhuashenqingService} from '../../services/TanhuashenqingService';
import {LienPersonnelService} from '../../services/LienPersonnelService';
import { BaozhangshenqingService } from '../../services/BaozhangshenqingService';

const COMPONENTS = [
  TalklistListComponent];
const COMPONENTS_NOROUNT = [
  TalklistListViewComponent];

@NgModule({
  imports: [
    SharedModule,
    TalklistRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  providers: [TanhuashenqingService, LienPersonnelService, BaozhangshenqingService],
  entryComponents: COMPONENTS_NOROUNT
})
export class TalklistModule { }
