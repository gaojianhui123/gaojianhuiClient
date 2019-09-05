import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { LooksikRoutingModule } from './looksik-routing.module';
import {NurseService} from '../../services/NurseService';

// const COMPONENTS = [
//   LooksikListComponent];
// const COMPONENTS_NOROUNT = [
//   LooksikListEditComponent,
//   LooksikListViewComponent];

@NgModule({
  imports: [
    SharedModule,
    // LooksikRoutingModule
  ],
  declarations: [
    // ...COMPONENTS,
    // ...COMPONENTS_NOROUNT
  ],
  entryComponents: [],
  // COMPONENTS_NOROUNT,
  providers: [NurseService]
})
export class LooksikModule { }
