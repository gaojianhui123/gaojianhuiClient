import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ListRoutingModule } from './list-routing.module';
import {TanhuashenqingService} from '../../services/TanhuashenqingService';
import {LienPersonnelService} from '../../services/LienPersonnelService';
import { TanhuashenqinginfoListViewComponent } from './list/view/view.component';
import { TanhuashenqinginfoListComponent } from './list/list.component';
import { TanhuashenqinginfoEditComponent } from './list/edit/edit.component';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  imports: [
    SharedModule,
    NgSelectModule,
    ListRoutingModule
  ],
  declarations: [
    TanhuashenqinginfoListComponent,
    TanhuashenqinginfoEditComponent,
    TanhuashenqinginfoListViewComponent
  ],
  entryComponents: [TanhuashenqinginfoListViewComponent, TanhuashenqinginfoEditComponent],
  providers: [TanhuashenqingService, LienPersonnelService]
})
export class ListModule { }
