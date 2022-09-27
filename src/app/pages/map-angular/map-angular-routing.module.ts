import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MapAngularPage } from './map-angular.page';

const routes: Routes = [
  {
    path: '',
    component: MapAngularPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapAngularPageRoutingModule {}
