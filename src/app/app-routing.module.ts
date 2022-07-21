import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SessionendGuard } from './guards/sessionend.guard';
import { SessioninitGuard } from './guards/sessioninit.guard';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'folder/Inbox',
  //   pathMatch: 'full'
  // },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'compra',
    loadChildren: () =>
      import('./pages/compra/compra.module').then((m) => m.CompraPageModule),
    canActivate: [SessioninitGuard],
  },
  {
    path: 'venta',
    loadChildren: () =>
      import('./pages/venta/venta.module').then((m) => m.VentaPageModule),
    canActivate: [SessioninitGuard],
  },
  {
    path: 'apertura-caja',
    loadChildren: () =>
      import('./pages/apertura-caja/apertura-caja.module').then(
        (m) => m.AperturaCajaPageModule
      ),
    canActivate: [SessioninitGuard],
  },
  {
    path: 'cierre-caja',
    loadChildren: () =>
      import('./pages/cierre-caja/cierre-caja.module').then(
        (m) => m.CierreCajaPageModule
      ),
    canActivate: [SessioninitGuard],
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
    path: 'pedido-mesa',
    loadChildren: () =>
      import('./pages/pedido-mesa/pedido-mesa.module').then(
        (m) => m.PedidoMesaPageModule
      ),
      canActivate: [SessioninitGuard],
  },
  {
    path: 'reporte-tablero',
    loadChildren: () =>
      import('./pages/reporte-tablero/reporte-tablero.module').then(
        (m) => m.ReporteTableroPageModule
      ),
      canActivate: [SessioninitGuard],
  },
  {
    path: 'venta-tintoreria',
    loadChildren: () =>
      import(
        './pages/tintoreria/venta-tintoreria/venta-tintoreria.module'
      ).then((m) => m.VentaTintoreriaPageModule),
    canActivate: [SessioninitGuard],
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./pages/home/home.module').then((m) => m.HomePageModule),
      canActivate: [SessioninitGuard],
  },
  {
    path: 'tintoreria-entrega',
    loadChildren: () =>
      import(
        './pages/tintoreria/tintoreria-entrega/tintoreria-entrega.module'
      ).then((m) => m.TintoreriaEntregaPageModule),
      canActivate: [SessioninitGuard],
  },
  {
    path: 'reportes-tintoreria',
    loadChildren: () => import('./pages/tintoreria/reportes/reportes.module')
    .then( m => m.ReportesPageModule),
    canActivate: [SessioninitGuard],
  },  {
    path: 'reporte-caja',
    loadChildren: () => import('./pages/tintoreria/reporte-caja/reporte-caja.module').then( m => m.ReporteCajaPageModule)
  },
  {
    path: 'apertura-inventario',
    loadChildren: () => import('./pages/apertura-inventario/apertura-inventario.module').then( m => m.AperturaInventarioPageModule)
  },
  {
    path: 'abm-persona',
    loadChildren: () => import('./pages/abm-persona/abm-persona.module').then( m => m.AbmPersonaPageModule)
  },
  {
    path: 'abm-usuario',
    loadChildren: () => import('./pages/abm-usuario/abm-usuario.module').then( m => m.AbmUsuarioPageModule)
  },


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
