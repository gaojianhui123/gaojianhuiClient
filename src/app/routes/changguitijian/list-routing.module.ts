import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ChangguitijianListComponent} from './list/list.component';
import { ChangguitijianEditComponent } from './list/edit/edit.component';
import { ChangguitijianViewComponent } from './list/view/view.component';

const routes: Routes = [
  { path: '', component: ChangguitijianListComponent },
  { path: 'changguitijianSave', component: ChangguitijianEditComponent },
  { path: 'changguitijianView', component: ChangguitijianViewComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListRoutingModule { }
