import { URL_MIROVENTAOPERACION } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseService } from './baseService';
import { LoadingController, ToastController } from '@ionic/angular';
import {
  environment,
  HEADERS_SERVICE,
  URL_MIROVENTA,
} from 'src/environments/environment';
import { Observable } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { DatabaseService } from './DatabaseService';

const urlMicroventa = URL_MIROVENTAOPERACION;
const headers = HEADERS_SERVICE;

@Injectable({
  providedIn: 'root',
})
export class VentaService extends BaseService {
  constructor(
    public databaseService: DatabaseService,
    public httpClient: HttpClient,
    public loadingController: LoadingController,
    public toastController: ToastController
  ) {
    super(databaseService, httpClient, loadingController, toastController);
  }

  searchProductVenta() {
    const urlQuery = urlMicroventa + 'ObtieneProductosVenta';

    return this.getInfoEviroment().then((env) => {
      const dataRequest = {
        IdEmpresa: environment.idEmpresa,
        idSession: environment.session
      };

      console.log('datos enviados para buscar productos', dataRequest);

      this.presentLoader();
      return this.httpClient
        .post<any>(urlQuery, JSON.stringify(dataRequest), { headers })
        .pipe(
          finalize(() => {
            console.log('**se termino la llamada SearchProduct');
            this.dismissLoader();
          }),
          catchError((error) => {
            console.error(error);
            this.showMessageError('No se tiene comunicacion con el servidor');
            return Observable.throw(new Error(error.status));
          })
        );
    });
  }

  registrarVenta(pDetalleVentas) {
    const urlQuery = urlMicroventa + 'RegistrarVentas';

    return this.getInfoEviroment().then((env) => {
      const dataRequest = {
        idSesion: environment.session,
        idOperacionDiariaCaja: environment.idOperacionDiariaCaja,
        detalleVentas: pDetalleVentas,
      };
      this.presentLoader();
      return this.httpClient
        .post<any>(urlQuery, JSON.stringify(dataRequest), { headers })
        .pipe(
          finalize(() => {
            console.log('**se termino la llamada RegistrarVentas');
            this.dismissLoader();
          }),
          catchError((error) => {
            console.error(error);
            this.showMessageError('No se tiene comunicacion con el servidor');
            return Observable.throw(new Error(error.status));
          })
        );
    });
  }
}
