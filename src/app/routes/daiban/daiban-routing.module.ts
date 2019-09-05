import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DaibanListComponent } from './list/list.component';
import {DaibanListEditComponent} from './list/edit/edit.component';

const routes: Routes = [

  { path: '', component: DaibanListComponent },
  { path: 'save', component: DaibanListEditComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DaibanRoutingModule { }
