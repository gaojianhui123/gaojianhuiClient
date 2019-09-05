import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedbackListComponent } from './list/list.component';

const routes: Routes = [

  { path: '', component: FeedbackListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedbackRoutingModule { }
