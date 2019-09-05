import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CateringListComponent } from './list/list.component';

const routes: Routes = [

  { path: '', component: CateringListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CateringRoutingModule { }
