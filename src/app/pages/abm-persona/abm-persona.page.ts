import { Component, OnInit } from '@angular/core';
import { PersonaDTO } from 'src/app/interfaces/persona/Perosna';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-abm-persona',
  templateUrl: './abm-persona.page.html',
  styleUrls: ['./abm-persona.page.scss'],
})
export class AbmPersonaPage implements OnInit {

  showCardPersonas = true;
  personas: PersonaDTO[] = [];
  selectedPersona: PersonaDTO;

  //listaInventario: ResulProductoPrecioVenta[];


  constructor(private stockService: StockService) { }

  ngOnInit() {

    this.cargarPersonas();
  }
  
  cargarPersonas() {
    this.stockService
      .obtenerPersonas()
      .then((productosService) => {
        productosService.subscribe((resul) => {
          //console.log(resul);
          this.personas = resul.listEntities;
          console.log('productos', resul);
          
        });
      });
  }

  modificaPersona(persona) {
    this.showCardPersonas = false;
    this.selectedPersona = persona;
  }
  nuevaPersona(){
    this.selectedPersona = new PersonaDTO();
    this.showCardPersonas = false;
  }

  regitrarPersona() {
    console.log('persona',this.selectedPersona);
    this.stockService.grabarPersona(this.selectedPersona).then((resul) => {
      resul.subscribe((x) => {
        this.stockService.showMessageResponse(x);
        this.selectedPersona = new PersonaDTO();
        this.showCardPersonas = true;
        this.cargarPersonas();
      });
    });
   
  }
  cancelarRegistro() {
    this.showCardPersonas = true;

  }

}
