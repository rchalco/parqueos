import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
//import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SessionendGuard } from './guards/sessionend.guard';
import { SessioninitGuard } from './guards/sessioninit.guard';

const routes: Routes = [

  // {
  //   path: '',
  //   redirectTo: 'login',
  //   pathMatch: 'full',
  // },
  {
    path: '',
    redirectTo: 'mapa-parqueo',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginPageModule)
  },
  {
    path: 'cambio-contrasena',
    loadChildren: () =>
      import('./pages/cambio-contrasena/cambio-contrasena.module').then(
        (m) => m.CambioContrasenaPageModule
      ),
    canActivate: [SessioninitGuard],
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
    canActivate: [SessioninitGuard],
  },
  {
    path: 'abm-usuario',
    loadChildren: () => import('./pages/abm-usuario/abm-usuario.module').then(m => m.AbmUsuarioPageModule)
  },
  {
    path: 'abm-ubicacion',
    loadChildren: () => import('./pages/abm-ubicacion/abm-ubicacion.module').then(m => m.AbmUbicacionPageModule)
  },
  {
    path: 'mapa-parqueo',
    loadChildren: () => import('./pages/mapa-parqueo/mapa-parqueo.module').then(m => m.MapaParqueoPageModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
