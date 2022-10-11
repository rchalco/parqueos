/* eslint-disable @typescript-eslint/naming-convention */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { HEADERS_SERVICE, URL_UBICACION } from 'src/environments/environment';

import { Observable } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

import { BaseService } from './baseService';
import { DatabaseService } from './DatabaseService';

const urlUbicacion = URL_UBICACION;
const headers = HEADERS_SERVICE;

@Injectable({
  providedIn: 'root'
})
export class UbicionService extends BaseService {
  constructor(
    public databaseService: DatabaseService,
    public httpClient: HttpClient,
    public loadingController: LoadingController,
    public toastController: ToastController
  ) {
    super(databaseService, httpClient, loadingController, toastController);
  }

  public async obtenerUbicaciones() {
    const url_query = urlUbicacion + 'ObtenerUbicaciones';

    const dataRequest = {
      ParametroLong1: 0,
    };

    await this.getInfoEviroment().then((env) => {
      dataRequest.ParametroLong1 = env ? env.session : 0;
    });

    this.presentLoader();
    return this.httpClient
      .post<any>(url_query, JSON.stringify(dataRequest), { headers })
      .pipe(
        finalize(() => {
          console.log('**se termino la llamada obtenerUbicaciones');
          this.dismissLoader();
        }),
        catchError((error) => {
          console.error(error);
          this.showMessageError('No se tiene comunicacion con el servidor');
          return Observable.throw(new Error(error.status));
        })
      );
  }

  async grabarUbicacion(_ubicacion) {
    const url_query = urlUbicacion + 'GrabarUbicacion';

    // console.log('persona 2',_persona);
    const dataRequest = {
      idUbicacion: _ubicacion.idUbicacion,
      idSesion: 0,
      nombreParqueo: _ubicacion.nombreParqueo,
      capacidad: _ubicacion.capacidad,
      latitud: _ubicacion.latitud,
      longitud: _ubicacion.longitud,
      activo: _ubicacion.activo
    };

    await this.getInfoEviroment().then((env) => {
      dataRequest.idSesion = env.session;
    });
    this.presentLoader();
    return this.httpClient
      .post<any>(url_query, JSON.stringify(dataRequest), { headers })
      .pipe(
        finalize(() => {
          console.log('**se termino la llamada GrabarUbicacion');
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
