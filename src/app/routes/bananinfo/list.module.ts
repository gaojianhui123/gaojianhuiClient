import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ListRoutingModule } from './list-routing.module';
import {DictsortService} from '../../services/DictsortService';
import { BananinfoEditComponent } from './list/edit/edit.component';
import { BananinfoListViewComponent } from './list/view/view.component';
import { BananinfoListComponent } from './list/list.component';
import { LienpersonnelModule } from '../lienpersonnel/lienpersonnel.module';

const COMPONENTS = [
  BananinfoListComponent
];
const COMPONENTS_NOROUNT = [
  BananinfoEditComponent,
  BananinfoListViewComponent
];
@NgModule({
  imports: [
    SharedModule,
    ListRoutingModule,
    LienpersonnelModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: [
    ...COMPONENTS_NOROUNT
  ],
  providers: [DictsortService]
})
export class ListModule { }
