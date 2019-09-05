import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ListRoutingModule } from './list-routing.module';
import {HealthService} from '../../services/HealthService';
import { JinzhutijianListViewComponent } from './list/view/view.component';
import { JinzhutijianListComponent } from './list/list.component';
import { JinzhutijianListEditComponent } from './list/edit/edit.component';


@NgModule({
  imports: [
    SharedModule,
    ListRoutingModule
  ],
  declarations: [
    JinzhutijianListComponent,
    JinzhutijianListViewComponent,
    JinzhutijianListEditComponent
  ],
  entryComponents: [JinzhutijianListViewComponent, JinzhutijianListEditComponent],
  providers: [HealthService]
})
export class ListModule { }
