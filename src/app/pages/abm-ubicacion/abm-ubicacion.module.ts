import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AbmUbicacionPageRoutingModule } from './abm-ubicacion-routing.module';

import { AbmUbicacionPage } from './abm-ubicacion.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AbmUbicacionPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AbmUbicacionPage]
})
export class AbmUbicacionPageModule {}
