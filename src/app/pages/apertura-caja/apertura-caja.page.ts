import { Component, OnInit } from '@angular/core';
import { SaldoCajaDTO } from 'src/app/interfaces/caja/SaldoCaja';
import { DatabaseService } from 'src/app/services/DatabaseService';
import { StockService } from 'src/app/services/stock.service';
import { environment } from 'src/environments/environment';

//import { format, parseISO } from 'date-fns';

@Component({
  selector: 'app-apertura-caja',
  templateUrl: './apertura-caja.page.html',
  styleUrls: ['./apertura-caja.page.scss'],
})
export class AperturaCajaPage implements OnInit {
  ultimasCajasCompleto: SaldoCajaDTO[] = [];
  ultimasCajas: SaldoCajaDTO[] = [];
  cajaActual: SaldoCajaDTO;

  //fechaSeleccionada: any = new Date().toISOString();
  fechaSeleccionada: Date;
  constructor(
    private stockService: StockService,
    private databaseService: DatabaseService
  ) {}

  ngOnInit() {
    this.cajaActual = new SaldoCajaDTO();
    this.fechaSeleccionada = new Date();
    //this.fechaSeleccionada = Date.now();
    this.stockService.ultimasCajas('APERTURA').then((resulPromise) => {
      resulPromise.subscribe((resul) => {
        //console.log(resul);
        this.ultimasCajasCompleto = resul.listEntities;
        //this.cajaActual = this.ultimasCajasCompleto.filter((x) => x.esCajaActual === true)[0];
        this.ultimasCajas = this.ultimasCajasCompleto.filter(
          (x) => x.esCajaActual !== true
        );
      });
    });

    this.stockService
      .obtieneCaja(this.fechaSeleccionada)
      .then((resultPromise) => {
        resultPromise.subscribe((resul) => {
          this.stockService.showMessageResponse(resul);
          this.cajaActual = resul.object;
        });
      });
  }
  isReadOnly() {
    
    if (this.cajaActual != null) {
      //console.log('estado', this.cajaActual);
      //console.log('estado', this.cajaActual.estadoCaja);
      return this.cajaActual.estadoCaja != 'PENDIENTE';
    } else {
      return true;
    }
  }
  aperturaCaja() {
    if (this.cajaActual.estadoCaja === 'APERTURADA') {
      this.stockService.showMessageWarning(
        'La caja en la fecha seleccionada ya fue ABIERTA'
      );
      return;
    }

    if (this.cajaActual.estadoCaja === 'CERRADA') {
      this.stockService.showMessageError('No se puede abrir un caja CERRADA');
      return;
    }

    this.stockService
      .aperturaCaja(
        this.fechaSeleccionada,
        this.cajaActual.saldoInicial,
        this.cajaActual.observacion
      )
      .then((resultPromise) => {
        resultPromise.subscribe((resul) => {
          this.stockService.showMessageResponse(resul);
          this.cajaActual = resul.object;
          const envNew = this.databaseService.getItem('enviroment');
          envNew['idOperacionDiariaCaja'] = environment.idOperacionDiariaCaja =
            this.cajaActual.idOperacionDiariaCaja;
          this.databaseService.setItem('enviroment', envNew);
        });
      });
  }
  selectFecha(event) {
    //this.fechaSeleccionada = event.detail.value;
    this.fechaSeleccionada = event;
    //this.formattedString = format(parseISO(event), 'MMM d, yyyy');
    console.log('fecha', event);
    //console.log('fecha2', this.fechaSeleccionada);

    this.cajaActual = new SaldoCajaDTO();

    this.stockService
      .obtieneCaja(this.fechaSeleccionada)
      .then((resultPromise) => {
        resultPromise.subscribe((resul) => {
          this.stockService.showMessageResponse(resul);
          this.cajaActual = resul.object;
        });
      });
  }
}
