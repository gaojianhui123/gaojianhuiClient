import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaozhangListComponent } from './list/list.component';

const routes: Routes = [

  { path: 'list', component: BaozhangListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BaozhangRoutingModule { }
