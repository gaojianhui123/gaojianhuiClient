import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserinforComponent } from './userinfor.component';

const routes: Routes = [
  { path: '', component: UserinforComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserinforRoutingModule { }
