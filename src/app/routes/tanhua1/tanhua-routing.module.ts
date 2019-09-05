import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TanhuaListComponent } from './list/list.component';

const routes: Routes = [

  { path: 'list', component: TanhuaListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TanhuaRoutingModule { }
