import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ListRoutingModule } from './list-routing.module';
import {DictsortService} from '../../services/DictsortService';
import { ChangguitijianListComponent } from './list/list.component';
import { ChangguitijianEditComponent } from './list/edit/edit.component';
import { ChangguitijianViewComponent } from './list/view/view.component';
const COMPONENTS = [
  ChangguitijianListComponent
];
const COMPONENTS_NOROUNT = [
  ChangguitijianEditComponent,
  ChangguitijianViewComponent
];

@NgModule({
  imports: [
    SharedModule,
    ListRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT,
  providers: [DictsortService]
})
export class ListModule { }
