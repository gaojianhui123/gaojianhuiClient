import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BananinfoEditComponent } from './list/edit/edit.component';
import { BananinfoListComponent } from './list/list.component';

const routes: Routes = [
  { path: '', component: BananinfoListComponent},
  { path: 'bananinfosave', component: BananinfoEditComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListRoutingModule { }
