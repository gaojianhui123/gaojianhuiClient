import { Routes, RouterModule } from '@angular/router';
import {EditComponent} from './edit.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
    { path: '', component: EditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditRoutingModule { }
