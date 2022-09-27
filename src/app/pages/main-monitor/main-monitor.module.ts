import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MainMonitorPageRoutingModule } from './main-monitor-routing.module';

import { MainMonitorPage } from './main-monitor.page';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@NgModule({
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MainMonitorPageRoutingModule
  ],
  declarations: [MainMonitorPage]
})
export class MainMonitorPageModule { }
