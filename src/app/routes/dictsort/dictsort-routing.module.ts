import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DictsortListComponent } from './list/list.component';
import { DictsortEditComponent } from './list/edit/edit.component';

const routes: Routes = [

  { path: '', component: DictsortListComponent },
  { path: 'dictsortsave', component: DictsortEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DictsortRoutingModule { }
