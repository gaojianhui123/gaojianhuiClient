import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NurseListComponent } from './list/list.component';
import { NurseListEditComponent } from './list/edit/save.component';

const routes: Routes = [

  { path: '', component: NurseListComponent },
  { path: 'nurseSave', component: NurseListEditComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NurseRoutingModule { }
