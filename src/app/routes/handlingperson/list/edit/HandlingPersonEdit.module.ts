import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '@shared/shared.module';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {HandlingPersonService} from '../../../../services/HandlingPersonService';
import {FileUploadService} from '../../../../services/FileUploadService';
import {FileUploadModule} from 'ng2-file-upload';
import {HandlingPersonEditComponent} from './HandlingPersonEdit.component';
import {HandlingPersonEditRoutingModule} from './HandlingPersonEdit-routing.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgZorroAntdModule,
    CommonModule,
    FormsModule,
    NgZorroAntdModule,
    ReactiveFormsModule,
    HandlingPersonEditRoutingModule,
    SharedModule,
    FileUploadModule,
  ],
  declarations: [HandlingPersonEditComponent],
  providers: [HandlingPersonService,  FileUploadService]
})
export class HandlingPersonEditModule { }
