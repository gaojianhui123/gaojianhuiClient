import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SafeguardlistListComponent } from './list/list.component';

const routes: Routes = [

  { path: '', component: SafeguardlistListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SafeguardlistRoutingModule { }
