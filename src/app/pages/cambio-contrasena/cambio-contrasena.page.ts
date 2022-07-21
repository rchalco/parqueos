import { Component, OnInit } from '@angular/core';
import { StockService } from 'src/app/services/stock.service';
import {
  environment,
  HEADERS_SERVICE,
  URL_MIROVENTA,
} from 'src/environments/environment';


@Component({
  selector: 'app-cambio-contrasena',
  templateUrl: './cambio-contrasena.page.html',
  styleUrls: ['./cambio-contrasena.page.scss'],
})
export class CambioContrasenaPage implements OnInit {

  logidata: any = {IdUsuario: environment.idUsuario, Usuario : environment.Usuario, Password:'', PasswordNuevo:'', PasswordNuevoRe:'', DescripcionError:'' };
  validForm = true;
  mensajeError: any = { message: 'La contraseña regiditada no es la misma', state: 3 };
  //validForm = false;
  constructor(private stockService: StockService) { }

  ngOnInit() {
  }

  cambiarcontrasena(login) {
    //this.logidata = login;
    //console.log('contraseñas', this.logidata.PasswordNuevo);
    //console.log('contraseñas', this.logidata.PasswordNuevoRe);
    this.validForm = true;
    if (this.logidata.PasswordNuevo != this.logidata.PasswordNuevoRe)
    {
      this.validForm = false;
      //console.log('contraseñas incorrectas',this.mensajeError);
      this.stockService.showMessageResponse(this.mensajeError);
      return;
    }
    this.stockService
      .cambioContrasena(login.Usuario, login.Password, login.PasswordNuevo)
      .subscribe((resul) => {
        this.stockService.showMessageResponse(resul);
        
        if (resul.state === 3)
          console.log('error cambio contraseña');
        else
          {
            this.logidata.Password = '';
            this.logidata.PasswordNuevo = '';
            this.logidata.PasswordNuevoRe = '';
          }
          //console.log('login lof correcto');

        //console.log('objet', resul);
      });
    //console.log('loginDTO', this.resulLogin);
  }
}
