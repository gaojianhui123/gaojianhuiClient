import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { DictionaryRoutingModule } from './dictionary-routing.module';
import { DictionaryListComponent } from './list/list.component';
import {DictionaryService} from '../../services/DictionaryService';
import {DictsortService} from '../../services/DictsortService';
import { DictionaryListViewComponent } from './list/view/view.component';
import { DictionaryListEditComponent } from './list/edit/edit.component';

const COMPONENTS = [
  DictionaryListComponent,
  DictionaryListEditComponent,
  DictionaryListViewComponent
];
const COMPONENTS_NOROUNT = [
  DictionaryListEditComponent,
  DictionaryListViewComponent
];

@NgModule({
  imports: [
    SharedModule,
    DictionaryRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  providers: [DictionaryService, DictsortService],
  entryComponents: COMPONENTS_NOROUNT
})
export class DictionaryModule { }
