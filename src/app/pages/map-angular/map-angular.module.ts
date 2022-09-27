import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapAngularPageRoutingModule } from './map-angular-routing.module';

import { MapAngularPage } from './map-angular.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapAngularPageRoutingModule
  ],
  declarations: [MapAngularPage]
})
export class MapAngularPageModule {}
