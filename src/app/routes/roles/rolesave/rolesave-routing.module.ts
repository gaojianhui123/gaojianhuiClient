import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {RolesaveComponent} from './rolesave.component';

const routes: Routes = [
    { path: '', component: RolesaveComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RolesaveRoutingModule { }
