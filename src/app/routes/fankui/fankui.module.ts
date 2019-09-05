import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';

// const COMPONENTS = [
//   FankuiListComponent];
// const COMPONENTS_NOROUNT = [
//   FankuiListEditComponent,
//   FankuiListViewComponent];

@NgModule({
  imports: [
    SharedModule,
    // FankuiRoutingModule
  ],
  declarations: [
    // ...COMPONENTS,
    // ...COMPONENTS_NOROUNT
  ],
  entryComponents: []
})
export class FankuiModule { }
