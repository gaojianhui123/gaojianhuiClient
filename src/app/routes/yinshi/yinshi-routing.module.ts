import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { YinshiListComponent } from './list/list.component';

const routes: Routes = [

  { path: '', component: YinshiListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class YinshiRoutingModule { }
