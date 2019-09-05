import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BzspListComponent } from './list/list.component';

const routes: Routes = [

  { path: '', component: BzspListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BzspRoutingModule { }
