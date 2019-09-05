import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { DaibanRoutingModule } from './daiban-routing.module';
import { DaibanListComponent } from './list/list.component';
import { DaibanListEditComponent } from './list/edit/edit.component';
import { DaibanListViewComponent } from './list/view/view.component';
import { LienPersonnelService } from '../../services/LienPersonnelService';

const COMPONENTS = [
  DaibanListEditComponent,
  DaibanListComponent];
const COMPONENTS_NOROUNT = [
  DaibanListViewComponent];

@NgModule({
  imports: [
    SharedModule,
    DaibanRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT,
  ],
  providers: [LienPersonnelService],
  entryComponents: COMPONENTS_NOROUNT
})
export class DaibanModule { }
