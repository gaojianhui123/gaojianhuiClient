import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JinzhutijianListComponent } from './list/list.component';
import { JinzhutijianListEditComponent } from './list/edit/edit.component';

const routes: Routes = [
  { path: '', component: JinzhutijianListComponent },
  { path: 'jinzhutijianSave', component: JinzhutijianListEditComponent }
  ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListRoutingModule { }
