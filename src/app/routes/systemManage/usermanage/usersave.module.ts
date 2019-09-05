import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {UsersaveRoutingModule} from './usersave-routing.module';
import {UsersaveComponent} from './usersave.component';
import {SystemService} from '../../../services/SystemService';
import {FileUploadService} from '../../../services/FileUploadService';
import {RoleService} from '../../../services/RoleService';
import {SharedModule} from '@shared/shared.module';
import {DictionaryService} from '../../../services/DictionaryService';
@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      UsersaveRoutingModule,
      NgZorroAntdModule,
      SharedModule,
    ],
    declarations: [
      UsersaveComponent,
    ],
    providers: [SystemService, FileUploadService, RoleService, DictionaryService]
})
export class UsersaveModule {

}
