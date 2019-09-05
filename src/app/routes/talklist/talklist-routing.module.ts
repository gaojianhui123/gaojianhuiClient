import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TalklistListComponent } from './list/list.component';
import { TalklistListViewComponent } from './list/view/view.component';

const routes: Routes = [

  { path: '', component: TalklistListComponent },
  { path: 'talklistView', component: TalklistListViewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TalklistRoutingModule { }
