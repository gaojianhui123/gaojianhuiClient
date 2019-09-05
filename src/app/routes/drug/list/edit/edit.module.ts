import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {DrugService} from '../../../../services/DrugService';
import {EditRoutingModule} from './edit-routing.module';
import {SharedModule} from '@shared/shared.module';
import {EditComponent} from './edit.component';
import { NgModule } from '@angular/core';
import { DictionaryService } from '../../../../services/DictionaryService';

@NgModule({
  imports: [
    ReactiveFormsModule,
    EditRoutingModule,
    SharedModule
  ],
  declarations: [EditComponent],
  providers: [DrugService, DictionaryService]
})
export class EditModule { }
