import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomHeaderComponent } from './custom-header/custom-header.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { PipesModule } from '../pipes/pipes.module';
import { FormsModule } from '@angular/forms';
import { CustomCalendarComponent } from './custom-calendar/custom-calendar.component';

@NgModule({
  declarations: [
    CustomHeaderComponent,
    MenuComponent,
    CustomCalendarComponent,
  ],
  exports: [
    CustomHeaderComponent,
    MenuComponent,
    CustomCalendarComponent
  ],
  imports: [CommonModule, IonicModule, RouterModule, PipesModule, FormsModule],
})
export class ComponentsModule { }
