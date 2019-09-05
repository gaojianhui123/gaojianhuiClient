import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import {HandlingPersonEditComponent} from './HandlingPersonEdit.component';

const routes: Routes = [
    { path: '', component: HandlingPersonEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HandlingPersonEditRoutingModule { }
