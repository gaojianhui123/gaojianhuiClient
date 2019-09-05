import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {SystemService} from '../../../services/SystemService';
import {FileUploadService} from '../../../services/FileUploadService';
import {RoleService} from '../../../services/RoleService';
import {SharedModule} from '@shared/shared.module';
import {DictionaryService} from '../../../services/DictionaryService';
import { UserinforComponent } from './userinfor.component';
import { UserinforRoutingModule } from './userinfor-routing.module';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    UserinforRoutingModule,
    NgZorroAntdModule,
    SharedModule,
  ],
  declarations: [
    UserinforComponent,
  ],
  providers: [SystemService, FileUploadService, RoleService, DictionaryService]
})
export class UserinforModule {

}
