import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { MapaParqueoPageRoutingModule } from './mapa-parqueo-routing.module';

import { MapaParqueoPage } from './mapa-parqueo.page';
import { GoogleMapsModule } from '@angular/google-maps';
import { ComponentsModule } from 'src/app/components/components.module';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    GoogleMapsModule,
    MapaParqueoPageRoutingModule,
    ComponentsModule,
    HttpClientJsonpModule,
    HttpClientModule
  ],
  declarations: [MapaParqueoPage]
})
export class MapaParqueoPageModule {}
