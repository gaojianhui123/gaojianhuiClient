import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { GaiJinEditComponent } from './GaiJinEdit.component';

const routes: Routes = [
  { path: '', component: GaiJinEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GaiJinEditRoutingModule { }
