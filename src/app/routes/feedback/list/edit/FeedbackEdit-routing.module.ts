import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import {FeedbackEditComponent} from './FeedbackEdit.component';

const routes: Routes = [
    { path: '', component: FeedbackEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeedbackEditRoutingModule { }
