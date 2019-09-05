import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MedicalrecordsListComponent } from './list/list.component';

const routes: Routes = [

  { path: '', component: MedicalrecordsListComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicalrecordsRoutingModule { }
