/* eslint-disable @typescript-eslint/naming-convention */
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import { HttpHeaders } from '@angular/common/http';

///Configuraciones:
///Lavanderia Jeffry: idEmpresa: 1 BD: DBTintoreriaGamaFac
///Snack Perfecto: idEmpresa: 1 BD: GamaFac

export const environment = {
  production: false,
  idEmpresa: 1,
  idUsuario: 2,
  idOperacionDiariaCaja: 0,
  Usuario: 'ADMIN',
  UsuarioLabel: 'ADMIN',
  session: 0,
  idCaja: 0,
  idRol: 0,
  rol: '',
};
export const HEADERS_SERVICE = new HttpHeaders({
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, GET, OPTIONS, PUT',
  Accept: '*/*',
  'content-type': 'application/json',
});

//DEV
// export const URL_MIROVENTA = 'http://localhost:8001/api/Microventa/';
// export const URL_MIROVENTAOPERACION =
//   'http://localhost:8001/api/MicroventaOperacion/';
// export const URL_TINTORERIA = 'http://localhost:8001/api/Tintoreria/';
// export const URL_SECURITY = 'http://localhost:8001/api/Seguridad/';
// export const URL_PERSON = 'http://localhost:8001/api/Person/';

export const LogoVoucher = '';
//PROD
// export const URL_MIROVENTA = 'http://181.188.169.10:8001/api/Microventa/';
// export const URL_MIROVENTAOPERACION = 'http://181.188.169.10:8001/api/MicroventaOperacion/';

//SERVER MYKE

//export const URL_MIROVENTA = 'http://140.82.15.241:8003/api/Microventa/';
//export const URL_MIROVENTAOPERACION =
//  'http://140.82.15.241:8003/api/MicroventaOperacion/';
//export const URL_TINTORERIA =
//  'http://140.82.15.241:8003/api/Tintoreria/';
//export const URL_SECURITY = 'http://140.82.15.241:8003/api/Seguridad/';
//export const URL_PERSON = 'http://140.82.15.241:8003/api/Person/';

//SERVER PRUEBA
 export const URL_MIROVENTA = 'http://localhost:8001/api/Microventa/';
 export const URL_MIROVENTAOPERACION =
   'http://localhost:8001/api/MicroventaOperacion/';
 export const URL_TINTORERIA = 'http://localhost:8001/api/Tintoreria/';
 export const URL_SECURITY = 'http://localhost:8001/api/Seguridad/';
 export const URL_PERSON = 'http://localhost:8001/api/Person/';

 export const URL_UBICACION = 'http://localhost:8001/api/Ubicacion/';

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
