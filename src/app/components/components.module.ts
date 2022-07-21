import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomHeaderComponent } from './custom-header/custom-header.component';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { BuscaProductoComponent } from './busca-producto/busca-producto.component';
import { PipesModule } from '../pipes/pipes.module';
import { FormaPagoComponent } from './forma-pago/forma-pago.component';
import { FormsModule } from '@angular/forms';
import { DatosFacturaComponent } from './datos-factura/datos-factura.component';
import { RegistroClienteFacComponent } from './registro-cliente-fac/registro-cliente-fac.component';
import { CustomCalendarComponent } from './custom-calendar/custom-calendar.component';

@NgModule({
  declarations: [
    CustomHeaderComponent,
    MenuComponent,
    BuscaProductoComponent,
    FormaPagoComponent,
    DatosFacturaComponent,
    RegistroClienteFacComponent,
    CustomCalendarComponent,
  ],
  exports: [
    CustomHeaderComponent,
    MenuComponent,
    BuscaProductoComponent,
    FormaPagoComponent,
    DatosFacturaComponent,
    RegistroClienteFacComponent,
    CustomCalendarComponent
  ],
  imports: [CommonModule, IonicModule, RouterModule, PipesModule, FormsModule],
})
export class ComponentsModule {}
