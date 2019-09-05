import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FankuiListComponent } from './list/list.component';

const routes: Routes = [

  { path: 'list', component: FankuiListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FankuiRoutingModule { }
