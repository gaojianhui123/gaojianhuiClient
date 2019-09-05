import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TanhuashenqinginfoListComponent } from './list/list.component';
import { TanhuashenqinginfoEditComponent } from './list/edit/edit.component';

const routes: Routes = [
  { path: '', component: TanhuashenqinginfoListComponent },
  { path: 'tanhuashenqinginfosave', component: TanhuashenqinginfoEditComponent }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListRoutingModule { }
