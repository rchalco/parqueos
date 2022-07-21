import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AbmPersonaPage } from './abm-persona.page';

const routes: Routes = [
  {
    path: '',
    component: AbmPersonaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AbmPersonaPageRoutingModule {}
