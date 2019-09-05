import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JianyidanListComponent } from './list/list.component';

const routes: Routes = [

  { path: '', component: JianyidanListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JianyidanRoutingModule { }
