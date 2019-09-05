import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {EditRoutingModule} from './edit-routing.module';
import {SharedModule} from '@shared/shared.module';
import {EditComponent} from './edit.component';
import { NgModule } from '@angular/core';
import {LienPersonnelService} from '../../../../services/LienPersonnelService';
import {BaozhangshenqingService} from '../../../../services/BaozhangshenqingService';

@NgModule({
  imports: [
    ReactiveFormsModule,
    EditRoutingModule,
    SharedModule
  ],
  declarations: [EditComponent],
  providers: [LienPersonnelService, BaozhangshenqingService]
})
export class EditModule { }
