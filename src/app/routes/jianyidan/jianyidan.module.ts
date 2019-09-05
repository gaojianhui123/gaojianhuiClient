import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { JianyidanRoutingModule } from './jianyidan-routing.module';
import { JianyidanListComponent } from './list/list.component';
import { JianyidanListEditComponent } from './list/edit/edit.component';
import { JianyidanListViewComponent } from './list/view/view.component';

const COMPONENTS = [
  JianyidanListComponent];
const COMPONENTS_NOROUNT = [
  JianyidanListEditComponent,
  JianyidanListViewComponent];

@NgModule({
  imports: [
    SharedModule,
    JianyidanRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class JianyidanModule { }
