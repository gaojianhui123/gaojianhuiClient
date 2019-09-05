import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemomoduleListComponent } from './list/list.component';

const routes: Routes = [

  { path: 'list', component: DemomoduleListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemomoduleRoutingModule { }
