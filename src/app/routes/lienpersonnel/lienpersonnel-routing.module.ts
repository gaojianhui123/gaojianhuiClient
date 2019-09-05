import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LienpersonnelListComponent } from './list/list.component';
import { LienPersonnelEditComponent } from './list/edit/lienPersonnel-edit.component';

const routes: Routes = [

  { path: '', component: LienpersonnelListComponent },
  { path: 'lienpersonnelEdit', component: LienPersonnelEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LienpersonnelRoutingModule { }
