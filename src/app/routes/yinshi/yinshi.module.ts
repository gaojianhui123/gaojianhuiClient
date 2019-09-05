import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { YinshiRoutingModule } from './yinshi-routing.module';
import { YinshiListComponent } from './list/list.component';
import { YinshiListEditComponent } from './list/edit/edit.component';
import { YinshiListViewComponent } from './list/view/view.component';
import {CateringService} from '../../services/CateringService';

// const COMPONENTS = [
//   YinshiListComponent];
// const COMPONENTS_NOROUNT = [
//   YinshiListEditComponent,
//   YinshiListViewComponent];

@NgModule({
  imports: [
    SharedModule,
    YinshiRoutingModule
  ],
  declarations: [
    // ...COMPONENTS,
    // ...COMPONENTS_NOROUNT
  ],
  providers: [CateringService],
  entryComponents: []
  // COMPONENTS_NOROUNT
})
export class YinshiModule { }
