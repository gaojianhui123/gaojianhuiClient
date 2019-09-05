import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { TanhuaRoutingModule } from './tanhua-routing.module';
import { TanhuaListComponent } from './list/list.component';
import { TanhuaListEditComponent } from './list/edit/edit.component';
import { TanhuaListViewComponent } from './list/view/view.component';

// const COMPONENTS = [
//   TanhuaListComponent];
// const COMPONENTS_NOROUNT = [
//   TanhuaListEditComponent,
//   TanhuaListViewComponent];

@NgModule({
  imports: [
    SharedModule,
    TanhuaRoutingModule
  ],
  declarations: [
    // ...COMPONENTS,
    // ...COMPONENTS_NOROUNT
  ],
  entryComponents: []
  // COMPONENTS_NOROUNT
})
export class TanhuaModule { }
