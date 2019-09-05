import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { RuleRoutingModule } from './rule-routing.module';

// const COMPONENTS = [
//   RuleListComponent];
// const COMPONENTS_NOROUNT = [
//   RuleListEditComponent,
//   RuleListViewComponent];

@NgModule({
  imports: [
    SharedModule,
    RuleRoutingModule
  ],
  declarations: [
    // ...COMPONENTS,
    // ...COMPONENTS_NOROUNT
  ],
  entryComponents: []
  // COMPONENTS_NOROUNT
})
export class RuleModule { }
