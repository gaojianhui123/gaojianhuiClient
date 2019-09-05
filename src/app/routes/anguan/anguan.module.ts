import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { AnguanRoutingModule } from './anguan-routing.module';
import { AnguanListComponent } from './list/list.component';
import { AnguanListEditComponent } from './list/edit/edit.component';
import { AnguanListViewComponent } from './list/view/view.component';

const COMPONENTS = [
  AnguanListComponent];
const COMPONENTS_NOROUNT = [
  AnguanListEditComponent,
  AnguanListViewComponent];

@NgModule({
  imports: [
    SharedModule,
    AnguanRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class AnguanModule { }
