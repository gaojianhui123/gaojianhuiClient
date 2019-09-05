import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BaozhangshenqingListComponent } from './list/list.component';
import { BaozhangshenqinginfoEditComponent } from './list/edit/edit.component';

const routes: Routes = [
  { path: '', component: BaozhangshenqingListComponent },
  { path: 'baozhangshenqinginfosave', component: BaozhangshenqinginfoEditComponent }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListRoutingModule { }
