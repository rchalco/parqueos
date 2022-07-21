import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { MenuComponent } from './components/menu/menu.component';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  enabledMenu = false;
  constructor() {}

  initMenu() {
    this.enabledMenu = true;
  }
  disabledMenu() {
    this.enabledMenu = false;
  }
}
