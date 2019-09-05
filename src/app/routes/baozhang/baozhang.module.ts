import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { BaozhangRoutingModule } from './baozhang-routing.module';
import { BaozhangListComponent } from './list/list.component';
import { BaozhangListEditComponent } from './list/edit/edit.component';
import { BaozhangListViewComponent } from './list/view/view.component';

// const COMPONENTS = [
//   BaozhangListComponent];
// const COMPONENTS_NOROUNT = [
//   BaozhangListEditComponent,
//   BaozhangListViewComponent];

@NgModule({
  imports: [
    SharedModule,
    BaozhangRoutingModule
  ],
  declarations: [
    // ...COMPONENTS,
    // ...COMPONENTS_NOROUNT
  ],
  entryComponents: []
  // COMPONENTS_NOROUNT
})
export class BaozhangModule { }
