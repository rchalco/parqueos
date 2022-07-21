import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AbmPersonaPageRoutingModule } from './abm-persona-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { AbmPersonaPage } from './abm-persona.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AbmPersonaPageRoutingModule,
    ComponentsModule
  ],
  declarations: [AbmPersonaPage]
})
export class AbmPersonaPageModule {}
