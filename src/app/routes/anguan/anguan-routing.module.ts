import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnguanListComponent } from './list/list.component';

const routes: Routes = [

  { path: '', component: AnguanListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnguanRoutingModule { }
