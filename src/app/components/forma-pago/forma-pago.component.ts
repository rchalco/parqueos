import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ClasificadorDTO } from 'src/app/interfaces/general/clasificador';
import { FormaPagoDTO } from 'src/app/interfaces/general/FormaPago';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-forma-pago',
  templateUrl: './forma-pago.component.html',
  styleUrls: ['./forma-pago.component.scss'],
})
export class FormaPagoComponent implements OnInit {

  listaFormaPago: ClasificadorDTO[] = [];
  selectFormaPago: ClasificadorDTO;
  montoRecibir: number;


  @Input() public formaPagoInicial: FormaPagoDTO;

  @Output() public formaPagoFinal: EventEmitter<FormaPagoDTO> =
    new EventEmitter<FormaPagoDTO>();

  constructor(private stockService: StockService) { }

  ngOnInit() {

    this.stockService.clasificadorPorTipo(1).then((resulPromise) => {
      resulPromise.subscribe((resul) => {
        //console.log(resul);
        this.listaFormaPago = resul.listEntities;
        //console.log('INI FORMA PAGO', this.listaFormaPago)
      });
    });
    this.formaPagoInicial.montoRecibido = 0;
    if (!this.formaPagoInicial.montoDescuento)
      this.formaPagoInicial.montoDescuento = 0;
    this.formaPagoInicial.totalACobrar = this.formaPagoInicial.montoACobrar - this.formaPagoInicial.montoDescuento;
    this.formaPagoInicial.cambio = 0;
    this.selectFormaPago = new ClasificadorDTO();
  }

  montoARecibirLostFocus() {
    //console.log('MONTO RECIBIDO', Number(this.formaPagoInicial.montoRecibido));
    //console.log('event', event);
    /*
    if (this.formaPagoInicial.montoRecibido < this.formaPagoInicial.totalACobrar) {
      this.stockService.showMessageWarning('Revise el monto a Recibir, no debe ser menor al Monto a Cobrar - Descuento');
      return;
    }*/
    this.formaPagoInicial.cambio = Number(this.formaPagoInicial.montoRecibido) - Number(this.formaPagoInicial.montoACobrar);
  }
  formaPagoSeleccionada(event) {
    
    this.selectFormaPago.idClasificador = event.detail.value;
    //console.log('forma de pagoyyyyy', this.selectFormaPago.idClasificador)
  }

  confirmarFormaPago() {
    if (!this.selectFormaPago){
      this.stockService.showMessageWarning('Debe seleccionar una forma de pago');
      return;
    }
    if (this.formaPagoInicial.montoRecibido < this.formaPagoInicial.totalACobrar) {
      this.stockService.showMessageWarning('El monto a recibir no debe ser menor al Monto a Cobrar - Descuento');
      return;
    }
    
    this.formaPagoInicial.idcFormaPago = this.selectFormaPago.idClasificador;
    this.formaPagoInicial.cambio = this.formaPagoInicial.montoRecibido - (this.formaPagoInicial.montoACobrar - this.formaPagoInicial.montoDescuento)
    this.formaPagoFinal.emit(this.formaPagoInicial);
    //console.log('forma de pagozzzzzzz', this.formaPagoInicial)
  }

}
