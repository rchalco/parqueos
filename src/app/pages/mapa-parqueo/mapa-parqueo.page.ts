/*******
 * https://github.com/angular/components/blob/main/src/google-maps/README.md
 */

import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
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
  center: google.maps.LatLngLiteral;
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

  constructor(private httpClient: HttpClient) {

  }

  ngOnInit() {

    const key = 'AIzaSyDXrZiXuUraWzXwB_hoTRI3RZN-XyTp8pM';//environment.googleMapsApiKey;
    this.httpClient
      .jsonp(`https://maps.googleapis.com/maps/api/js?key=${key}`, 'callback')
      .subscribe(
        () => {
          console.log('🚀 ~ GoogleMapsService ~ google maps api loaded');
          ///Configuramos el mapa con la posicion actual
          navigator.geolocation.getCurrentPosition((position) => {
            //centramos el mapa
            this.center = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            //colocamos una marca
            const marca = {
              lat: -16.51578771445301,
              lng: -68.11269940734775
            };
            this.markerPositions.push(marca);
            //habilitamos el mapa
            this.apiLoaded = true;
          });
        },
        (error) => {
          console.log('🚀 ~ GoogleMapsService ~ google maps api cannot be loaded', error);
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

}
