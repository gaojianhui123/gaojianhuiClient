import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {AlertModule} from 'ngx-bootstrap';
import {NurseService} from '../../../../services/NurseService';
import {CateringService} from '../../../../services/CateringService';
import {EditComponent} from './edit.component';
import {EditRoutingModule} from './edit-routing.module';
import {LienPersonnelService} from '../../../../services/LienPersonnelService';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    EditRoutingModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    AlertModule.forRoot(),
  ],
  declarations: [EditComponent ],
  providers: [NurseService, CateringService, LienPersonnelService]
})
export class EditModule { }
