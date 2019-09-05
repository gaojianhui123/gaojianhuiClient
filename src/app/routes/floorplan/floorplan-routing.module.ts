import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FloorplanListComponent } from './list/list.component';

const routes: Routes = [

  { path: '', component: FloorplanListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FloorplanRoutingModule { }
