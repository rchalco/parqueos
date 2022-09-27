import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoogleMap } from '@capacitor/google-maps';


@Component({
  selector: 'app-main-monitor',
  templateUrl: './main-monitor.page.html',
  styleUrls: ['./main-monitor.page.scss'],
})
export class MainMonitorPage implements OnInit {

  @ViewChild('map')
  mapRef: ElementRef<HTMLElement>;
  newMap: GoogleMap;

  apiKey = 'AIzaSyDXrZiXuUraWzXwB_hoTRI3RZN-XyTp8pM'; //web
  //apiKey = 'AIzaSyANkyDpzxv8OlJdrX2koo7tIC_ZDlgr9J4'; //android

  constructor() { }

  ngOnInit() {

  }

  async createMap() {
    console.log('creando mapa');
    this.newMap = await GoogleMap.create({
      id: 'map',
      element: this.mapRef.nativeElement,
      apiKey: this.apiKey,
      config: {
        center: {
          lat: -16.5057865,
          lng: -68.1281705,
        },
        zoom: 14,
      },
    });
  }

}
