import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapaParqueoPage } from './mapa-parqueo.page';

const routes: Routes = [
  {
    path: '',
    component: MapaParqueoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapaParqueoPageRoutingModule {}
