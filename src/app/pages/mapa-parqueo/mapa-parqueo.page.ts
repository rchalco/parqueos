/* eslint-disable no-underscore-dangle */
/*******
 * https://github.com/angular/components/blob/main/src/google-maps/README.md
 */

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MapDirectionsService, MapMarker } from '@angular/google-maps';
import { Platform } from '@ionic/angular';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { UbicionService } from 'src/app/services/ubicion.service';
import { HEADERS_SERVICE } from 'src/environments/environment';
const headers = HEADERS_SERVICE;
@Component({
  selector: 'app-mapa-parqueo',
  templateUrl: './mapa-parqueo.page.html',
  styleUrls: ['./mapa-parqueo.page.scss'],
})
export class MapaParqueoPage implements OnInit {
  apiLoaded = false;
  currentZoom = 18;
  map: google.maps.Map;
  center: google.maps.LatLngLiteral;
  markersFromService = [];
  txtZona = '';
  currentCity;
  lCitys = [];
  ubicaciones = [];
  directionsResults$: Observable<google.maps.DirectionsResult | undefined>;

  markerOptions: google.maps.MarkerOptions = {
    draggable: false,
    label: {
      text: 'P',
      color: 'white',
    }
  };
  markerPositions: google.maps.LatLngLiteral[] = [];

  options: google.maps.MapOptions = {
    zoomControl: true,
    scrollwheel: false,
    disableDoubleClickZoom: true,
    maxZoom: 30,
    minZoom: 8,
    zoom: this.currentZoom,
  };


  constructor(private httpClient: HttpClient,
    private ubicionService: UbicionService,
    private mapDirectionsService: MapDirectionsService,
    private platform: Platform) {

  }

  async ngOnInit() {
    await this.platform.ready().then();

    const key = 'AIzaSyDXrZiXuUraWzXwB_hoTRI3RZN-XyTp8pM';//environment.googleMapsApiKey;
    this.httpClient
      .jsonp(`https://maps.googleapis.com/maps/api/js?key=${key}`, 'callback')
      .subscribe(
        () => {

          this.options.mapTypeId = google.maps.MapTypeId.ROADMAP;
          console.log('🚀 ~ GoogleMapsService cargado');
          ///Configuramos el mapa con la posicion actual
          navigator.geolocation.getCurrentPosition((position) => {
            //centramos el mapa
            this.center = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            console.log('*** antes de entrar al servicio');

            this.ubicionService.obtenerUbicaciones().then(service => {
              service.subscribe(resul => {

                console.log('*** ubicionService resul:', resul);

                if (resul.state === 1) {
                  this.ubicaciones = resul.listEntities;
                  resul.listEntities.forEach(element => {
                    ///obtenemos las cuidades
                    if (!(this.lCitys.findIndex(x => x === element.departamento) > 0)) {
                      this.lCitys.push(element.departamento);
                    }

                    const customMark = {
                      position: {
                        lat: parseFloat(element.latitud),
                        lng: parseFloat(element.longitud)
                      },
                      options: {
                        draggable: false,
                        label: {
                          text: 'Pa',
                          color: 'white',
                        },
                        title: element.nombreParqueo,
                        symbol: {
                          fillColor: 'brown'
                        }
                      }
                    };
                    this.markersFromService.push(customMark);
                  });

                }
                else {
                  this.ubicionService.showMessageError('Imposible comunicarse con el servidor');
                }
              });
            }).catch(e => { console.error('error al ejecuar el servicio'); });

            //habilitamos el mapa
            console.log('this.markersFromService', this.markersFromService);
            this.apiLoaded = true;
          });
        },
        (error) => {
          console.error('🚀 ~ GoogleMapsService ~ google maps api no puedo ser cargado', error);
        }
      );
  }

  zoomIn() {
    if (this.currentZoom < this.options.maxZoom) { this.currentZoom++; }
  }

  zoomOut() {
    if (this.currentZoom > this.options.minZoom) { this.currentZoom--; }
  }

  addMarker(event: google.maps.MapMouseEvent) {
    // console.log('marca: ', event.latLng.toJSON());
    // this.markerPositions.push(event.latLng.toJSON());
  }

  openInfo(marker) {
    console.log('openInfo', marker);
    const dest = {
      lat: marker._position.lat,
      lng: marker._position.lng
    };

    navigator.geolocation.getCurrentPosition(position => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      this.setRoutePolyline(this.center, dest);
    });
  }

  setRoutePolyline(_source, _destination) {
    const request = {
      origin: _source,
      destination: _destination,
      travelMode: google.maps.TravelMode.DRIVING
    };
    this.directionsResults$ = this.mapDirectionsService.route(request).pipe(map(response => response.result));
  }

  centrarMapaParqueo(_ubicacion) {
    //centramos el mapa
    this.center = {
      lat: parseFloat(_ubicacion.latitud),
      lng: parseFloat(_ubicacion.longitud),
    };
  }

}
