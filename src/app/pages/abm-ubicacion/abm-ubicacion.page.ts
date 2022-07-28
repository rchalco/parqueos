import { Component, OnInit } from '@angular/core';
import { UbicacionDTO } from 'src/app/interfaces/ubicacion/Ubicacion';
import { UbicionService } from 'src/app/services/ubicion.service';

@Component({
  selector: 'app-abm-ubicacion',
  templateUrl: './abm-ubicacion.page.html',
  styleUrls: ['./abm-ubicacion.page.scss'],
})
export class AbmUbicacionPage implements OnInit {


  showCardGrid = true;
  ubicaciones: UbicacionDTO[] = [];
  selectedRegistro: UbicacionDTO;

  constructor(private ubicacionService: UbicionService) { }

  ngOnInit() {
    this.cargarDatos();
  }

  modificar(objeto) {
    this.showCardGrid = false;
    this.selectedRegistro = objeto;
  }
  nueva(){
    this.selectedRegistro = new UbicacionDTO();
    this.showCardGrid = false;
  }

  regitrar() {
    
    console.log('grabar',this.selectedRegistro);
    this.ubicacionService.grabarUbicacion(this.selectedRegistro).then((resul) => {
      resul.subscribe((x) => {
        this.ubicacionService.showMessageResponse(x);
        this.selectedRegistro = new UbicacionDTO();
        this.showCardGrid = true;
        this.cargarDatos();
      });
    });
  }
  cancelarRegistro() {
    this.showCardGrid = true;

  }

  cargarDatos() {
    this.ubicacionService
      .obtenerUbicaciones()
      .then((productosService) => {
        productosService.subscribe((resul) => {
          //console.log(resul);
          this.ubicaciones = resul.listEntities;
          //console.log('productos', resul);
          
        });
      });
  }

}
