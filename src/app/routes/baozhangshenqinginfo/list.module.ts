import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { ListRoutingModule } from './list-routing.module';
import {DictsortService} from '../../services/DictsortService';
import {BaozhangshenqingService} from '../../services/BaozhangshenqingService';
import {LienPersonnelService} from '../../services/LienPersonnelService';
import { BaozhangshenqingListComponent } from './list/list.component';
import { BaozhangshenqinginfoEditComponent } from './list/edit/edit.component';
import { BaozhangshenqinginfoListViewComponent } from './list/view/view.component';


@NgModule({
  imports: [
    SharedModule,
    ListRoutingModule
  ],
  declarations: [
    BaozhangshenqingListComponent,
    BaozhangshenqinginfoEditComponent,
    BaozhangshenqinginfoListViewComponent
  ],
  entryComponents: [BaozhangshenqinginfoEditComponent, BaozhangshenqinginfoListViewComponent],
  providers: [DictsortService, BaozhangshenqingService, LienPersonnelService]
})
export class ListModule { }
