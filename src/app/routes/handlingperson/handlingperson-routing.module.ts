import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HandlingpersonListComponent } from './list/list.component';

const routes: Routes = [

  { path: '', component: HandlingpersonListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HandlingpersonRoutingModule { }
