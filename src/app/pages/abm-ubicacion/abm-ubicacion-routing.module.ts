import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AbmUbicacionPage } from './abm-ubicacion.page';

const routes: Routes = [
  {
    path: '',
    component: AbmUbicacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AbmUbicacionPageRoutingModule {}
