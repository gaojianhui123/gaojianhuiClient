import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UsermanageComponent} from './usermanage.component';

const routes: Routes = [
    { path: '', component: UsermanageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsermanageRoutingModule { }
