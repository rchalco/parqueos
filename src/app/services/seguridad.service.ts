/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/naming-convention */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './baseService';
import { LoadingController, ToastController } from '@ionic/angular';
import {
  environment,
  HEADERS_SERVICE,
  URL_MIROVENTA,
  URL_SECURITY,
} from 'src/environments/environment';
import { Observable } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { DatabaseService } from './DatabaseService';

const urlMicroventa = URL_MIROVENTA;
const urlSeguridad = URL_SECURITY;
const headers = HEADERS_SERVICE;

@Injectable({
  providedIn: 'root'
})
export class SeguridadService extends BaseService {

  constructor(
    public databaseService: DatabaseService,
    public httpClient: HttpClient,
    public loadingController: LoadingController,
    public toastController: ToastController
  ) {
    super(databaseService, httpClient, loadingController, toastController);
  }

  ////SEGURIDAD
  loginUsuario(_usuario, _pass) {
    let url_query = urlSeguridad + 'LoginUsuario';

    console.warn('url_query', url_query);

    let dataRequest = {
      usuario: _usuario,
      password: _pass,
      passwordNuevo: '',
      idEmpresa: 1,
      aplicacion: 1
    };

    this.presentLoader();
    return this.httpClient
      .post<any>(url_query, JSON.stringify(dataRequest), { headers })
      .pipe(
        finalize(() => {
          console.log('**se termino la llamada login');
          this.dismissLoader();
        }),
        catchError((error) => {
          console.error('error del login obj', error);
          console.error('error del login message', error.message);
          this.showMessageError('No se tiene comunicacion con el servidor');
          return Observable.throw(new Error(error.status));
        })
      );
  }

  cambioContrasena(_usuario, _pass, _passnuevo) {
    let url_query = urlSeguridad + 'CambioContrasena';

    let dataRequest = {
      usuario: _usuario,
      password: _pass,
      passwordNuevo: _passnuevo,
    };

    this.presentLoader();
    return this.httpClient
      .post<any>(url_query, JSON.stringify(dataRequest), { headers })
      .pipe(
        finalize(() => {
          console.log('**se termino la llamada cambioContrasena');
          this.dismissLoader();
        }),
        catchError((error) => {
          console.error(error);
          this.showMessageError('No se tiene comunicacion con el servidor');
          return Observable.throw(new Error(error.status));
        })
      );
  }

  async obtieneMenuPorUsuario() {
    let url_query = urlSeguridad + 'ObtieneMenuPorUsuario';

    let dataRequest = {
      ParametroLong1: 0,
      ParametroLong2: 0,
      ParametroLong3: 0,
    };

    await this.getInfoEviroment().then((env) => {
      dataRequest.ParametroLong1 = environment.idEmpresa;
      dataRequest.ParametroLong2 = environment.session;
      dataRequest.ParametroLong3 = environment.idRol;
    });

    console.log('ObtieneMenuPorUsuario', dataRequest);

    this.presentLoader();
    return this.httpClient
      .post<any>(url_query, JSON.stringify(dataRequest), { headers })
      .pipe(
        finalize(() => {
          console.log('**se termino la llamada Menu');
          this.dismissLoader();
        }),
        catchError((error) => {
          console.error(error);
          this.showMessageError('No se tiene comunicacion con el servidor');
          return Observable.throw(new Error(error.status));
        })
      );
  }

  ///FIN SEGURIDAD

  async obtenerPersonas() {
    let url_query = urlMicroventa + 'ObtenerPersonas';

    let dataRequest = {
      ParametroLong1: 0,
    };

    await this.getInfoEviroment().then((env) => {
      dataRequest.ParametroLong1 = env.session;
    });

    this.presentLoader();
    return this.httpClient
      .post<any>(url_query, JSON.stringify(dataRequest), { headers })
      .pipe(
        finalize(() => {
          console.log('**se termino la llamada graficoVentaPorProducto');
          this.dismissLoader();
        }),
        catchError((error) => {
          console.error(error);
          this.showMessageError('No se tiene comunicacion con el servidor');
          return Observable.throw(new Error(error.status));
        })
      );
  }

  async grabarPersona(_persona) {
    let url_query = urlMicroventa + 'GrabarPersona';

    // console.log('persona 2',_persona);
    let dataRequest = {
      idPersona: _persona.idPersona,
      DocumentoDeIdentidad: _persona.documentoDeIdentidad,
      ApellidoPaterno: _persona.apellidoPaterno,
      ApellidoMaterno: _persona.apellidoMaterno,
      Nombres: _persona.nombres,
      celular: _persona.celular,
    };

    this.presentLoader();
    return this.httpClient
      .post<any>(url_query, JSON.stringify(dataRequest), { headers })
      .pipe(
        finalize(() => {
          console.log('**se termino la llamada transaccionesDetallePorID');
          this.dismissLoader();
        }),
        catchError((error) => {
          console.error(error);
          this.showMessageError('No se tiene comunicacion con el servidor');
          return Observable.throw(new Error(error.status));
        })
      );
  }

  async obtenerUsuarios() {
    let url_query = urlMicroventa + 'ObtenerUsuarios';

    let dataRequest = {
      ParametroLong1: 0,
    };

    await this.getInfoEviroment().then((env) => {
      dataRequest.ParametroLong1 = env.session;
    });

    this.presentLoader();
    return this.httpClient
      .post<any>(url_query, JSON.stringify(dataRequest), { headers })
      .pipe(
        finalize(() => {
          console.log('**se termino la llamada graficoVentaPorProducto');
          this.dismissLoader();
        }),
        catchError((error) => {
          console.error(error);
          this.showMessageError('No se tiene comunicacion con el servidor');
          return Observable.throw(new Error(error.status));
        })
      );
  }

  async obtenerRoles() {
    let url_query = urlMicroventa + 'ObtenerRol';

    let dataRequest = {
      ParametroLong1: 0,
    };

    await this.getInfoEviroment().then((env) => {
      dataRequest.ParametroLong1 = env.session;
    });

    this.presentLoader();
    return this.httpClient
      .post<any>(url_query, JSON.stringify(dataRequest), { headers })
      .pipe(
        finalize(() => {
          console.log('**se termino la llamada graficoVentaPorProducto');
          this.dismissLoader();
        }),
        catchError((error) => {
          console.error(error);
          this.showMessageError('No se tiene comunicacion con el servidor');
          return Observable.throw(new Error(error.status));
        })
      );
  }

  async grabarUsuario(_usuario) {
    let url_query = urlMicroventa + 'GrabarUsuario';

    // console.log('persona 2',_persona);
    let dataRequest = {
      IdRol: _usuario.idRol,
      IdPersona: _usuario.idPersona,
      usuario_vc: _usuario.usuario_vc,
      FechaVigenciaHasta: _usuario.fechaVigenciaHasta,
      Password: _usuario.password,
      PasswordNuevo: _usuario.passwordNuevo,
      idUsuario: _usuario.idUsuario,
    };

    this.presentLoader();
    return this.httpClient
      .post<any>(url_query, JSON.stringify(dataRequest), { headers })
      .pipe(
        finalize(() => {
          console.log('**se termino la llamada transaccionesDetallePorID');
          this.dismissLoader();
        }),
        catchError((error) => {
          console.error(error);
          this.showMessageError('No se tiene comunicacion con el servidor');
          return Observable.throw(new Error(error.status));
        })
      );
  }
}
