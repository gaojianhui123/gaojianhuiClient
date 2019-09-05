import { Component } from '@angular/core';
import {SettingsService} from '@delon/theme';

@Component({
  selector: 'layout-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent {
  public message: string;
  constructor(
    public settings: SettingsService) {
  }

}
