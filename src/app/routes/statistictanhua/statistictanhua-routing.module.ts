import { StatistictanhuaComponent } from './statistictanhua.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: '', component: StatistictanhuaComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StatistictanhuaRoutingModule { }
