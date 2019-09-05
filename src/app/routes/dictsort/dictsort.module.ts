import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { DictsortRoutingModule } from './dictsort-routing.module';
import { DictsortListComponent } from './list/list.component';
import {DictsortService} from '../../services/DictsortService';
import { DictsortListViewComponent } from './list/view/view.component';
import { DictsortEditComponent } from './list/edit/edit.component';

const COMPONENTS = [
  DictsortListComponent,
];
const COMPONENTS_NOROUNT = [
  DictsortListViewComponent,
  DictsortEditComponent
];

@NgModule({
  imports: [
    SharedModule,
    DictsortRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT,
  providers: [DictsortService]
})
export class DictsortModule { }
