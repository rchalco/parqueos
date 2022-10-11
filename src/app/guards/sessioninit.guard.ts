import { SeguridadService } from './../services/seguridad.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { NavController } from '@ionic/angular';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class SessioninitGuard implements CanActivate {
  constructor(
    private baseService: SeguridadService,
    private navCtri: NavController
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.verificarSession();
  }
  async verificarSession() {
    let resultVerfi = false;

    await this.baseService.getInfoEviroment().then((resul) => {
      //console.log('Guard SessioninitGuard: resultado de BD enviroment', resul);
      if (resul && resul.session > 0) {
        resultVerfi = true;
      } else {
        this.navCtri.navigateRoot('login');
        resultVerfi = false;
      }
    });
    return resultVerfi;
  }
}
