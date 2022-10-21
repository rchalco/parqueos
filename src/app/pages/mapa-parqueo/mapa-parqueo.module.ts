import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { MapaParqueoPageRoutingModule } from './mapa-parqueo-routing.module';

import { MapaParqueoPage } from './mapa-parqueo.page';
import { GoogleMapsModule } from '@angular/google-maps';
import { ComponentsModule } from 'src/app/components/components.module';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    GoogleMapsModule,
    MapaParqueoPageRoutingModule,
    ComponentsModule,
    HttpClientJsonpModule,
    HttpClientModule,
    PipesModule,
    FormsModule
  ],
  declarations: [MapaParqueoPage]
})
export class MapaParqueoPageModule { }
