import { Component, OnInit } from '@angular/core';
import { ResulProductoPrecioVenta } from 'src/app/interfaces/venta/itemProductoVenta';
import { StockService } from 'src/app/services/stock.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-apertura-inventario',
  templateUrl: './apertura-inventario.page.html',
  styleUrls: ['./apertura-inventario.page.scss'],
})
export class AperturaInventarioPage implements OnInit {

  showAperturaInvetario = false;
  showDetalleInvetario = false;
  listaInventario: ResulProductoPrecioVenta[];

  constructor(private stockService: StockService) { }

  ngOnInit() {
    this.showAperturaInvetario = true;
    this.showDetalleInvetario = false;

  }

  abrirInventario(){

    this.stockService
      .aperturaInventario()
      .then((productosService) => {
        productosService.subscribe((resul) => {
          console.log(resul);
          this.listaInventario = resul.listEntities as ResulProductoPrecioVenta[];
          /*
          this.listaPedidos.forEach((zz) => {
            this.total += zz.total;
            this.montoApertura = zz.montoApertura;
            this.montoCierre = zz.montoCierre;
          });
          console.log('pedidos', this.listaPedidos);
          */
        });
      });
    this.showAperturaInvetario = false;
    this.showDetalleInvetario = true;
  }
}
