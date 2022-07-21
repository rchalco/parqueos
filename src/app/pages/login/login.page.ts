import { DatabaseService } from './../../services/DatabaseService';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SaldoCajaDTO } from 'src/app/interfaces/caja/SaldoCaja';
import { StockService } from 'src/app/services/stock.service';
import {
  environment,
  HEADERS_SERVICE,
  URL_MIROVENTA,
} from 'src/environments/environment';
import { AppComponent } from 'src/app/app.component';
import { DocumentoService } from 'src/app/services/documento.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  logidata: any = {
    IdUsuario: 0,
    Usuario: '',
    Password: '',
    DescripcionError: '',
  };
  resulLogin: any = {
    IdUsuario: 0,
    usuario_vc: '',
    Password: '',
    DescripcionError: '',
    IdOperacionDiariaCaja: 0,
    sesion: 0,
    idCaja: 0,
  };

  //resulLogin: SaldoCajaDTO ;
  constructor(
    private stockService: StockService,
    private router: Router,
    private databaseService: DatabaseService,
    private appComponent: AppComponent
  ) {}

  ngOnInit() {}
  iniciarsesion(login) {
    this.stockService
      .loginUsuario(login.Usuario, login.Password)
      .subscribe((resul) => {
        this.stockService.showMessageResponse(resul);
        this.resulLogin = resul.object;
        console.log('resulLogin', resul.object);
        if (resul.state === 3) {
          console.log('error login');
        } else {
          environment.Usuario = this.resulLogin.usuario_vc;
          environment.UsuarioLabel = this.resulLogin.log_respuesta;
          environment.idOperacionDiariaCaja =
            this.resulLogin.idOperacionDiariaCaja;
          environment.session = this.resulLogin.idSesion;
          environment.idCaja = this.resulLogin.idCaja;
          environment.idRol = this.resulLogin.idRol;
          environment.rol = this.resulLogin.rol_name;
          this.logidata.Usuario = '';
          this.logidata.Password = '';
          this.databaseService.setItem('enviroment', environment);
          console.log('vamos a home');
          this.router.navigateByUrl('home');
          // if (environment.idOperacionDiariaCaja === 0) {
          //   console.log('va a directo a apertura caja');
          //   this.router.navigateByUrl('apertura-caja');
          // } else {
          //   console.log('va a directo a home');
          //   this.router.navigateByUrl('home');
          // }
          this.appComponent.initMenu();
        }
        console.log('usuario', environment);
      });
  }
}
