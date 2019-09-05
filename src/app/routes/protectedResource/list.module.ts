import {NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import {ListComponentRoutingModule} from './list-routing.module';
import {ListComponent} from './list.component';
import {ProtectedResourceService} from '../../services/ProtectedResourceService';
import {ColorPickerModule} from 'ngx-color-picker';
import {SharedModule} from '@shared/shared.module';
@NgModule({
    imports: [
      CommonModule,
      FormsModule,
      ListComponentRoutingModule,
      NgZorroAntdModule,
      ReactiveFormsModule,
      ColorPickerModule,
      SharedModule,
    ],
    declarations: [
      ListComponent,
    ],
    providers: [ProtectedResourceService]
})
export class ListModule {

}
