import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { DemomoduleRoutingModule } from './demomodule-routing.module';
import { DemomoduleListComponent } from './list/list.component';
import { DemomoduleListEditComponent } from './list/edit/edit.component';
import { DemomoduleListViewComponent } from './list/view/view.component';

const COMPONENTS = [
  DemomoduleListComponent];
const COMPONENTS_NOROUNT = [
  DemomoduleListEditComponent,
  DemomoduleListViewComponent];

@NgModule({
  imports: [
    SharedModule,
    DemomoduleRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class DemomoduleModule { }
