import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DictionaryListComponent } from './list/list.component';
import { DictionaryListEditComponent } from './list/edit/edit.component';

const routes: Routes = [

  { path: '', component: DictionaryListComponent },
  { path: 'dictionarysave', component: DictionaryListEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DictionaryRoutingModule { }
