import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LooksikListComponent } from './list/list.component';

const routes: Routes = [

  // { path: '', component: LooksikListComponent }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LooksikRoutingModule { }
