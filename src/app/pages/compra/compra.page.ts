import { Component, OnInit } from '@angular/core';
import { StockService } from 'src/app/services/stock.service';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.page.html',
  styleUrls: ['./compra.page.scss'],
})
export class CompraPage implements OnInit {
  productos: any[] = [];
  textoBusacar = '';
  showCardSearch = true;
  esCaja = false;
  selectedProducto: any = null;
  listaUnidades = [
    {
      nombre: 'Unidad',
      valor: 'UNIDAD',
    },
    {
      nombre: 'Caja',
      valor: 'CAJA',
    },
  ];
  constructor(private stockService: StockService) {}

  ngOnInit() {
    this.cargarProductos();
  }
  cargarProductos() {
    //console.log('PRODDDDDDDD', this.productos);
   /*
    this.stockService.searchProduct().subscribe((productosService) => {

      productosService.subscribe((resul) => {
        this.productos = resul.listEntities;
        console.log('PRODXXXXXXX', resul.listEntities);
        this.productos.forEach((x) => {
          x.picProducto = 'data:image/jpeg;base64,' + x.picProducto;
        });
        
      });
    });
*/
    
    this.stockService.searchProduct().then((resulPromise) => {
      resulPromise.subscribe((resul) => {
        this.productos = resul.listEntities;
        //console.log('PRODXXXXXXX', resul.listEntities);
        this.productos.forEach((x) => {
          x.picProducto = 'data:image/jpeg;base64,' + x.picProducto;
        });
      });
    });
    
    //console.log('PRODDDDDDDD111', this.productos);


/*
    this.stockService.searchProduct().subscribe((resul) => {
      this.productos = resul.listEntities;

      this.productos.forEach((x) => {
        x.picProducto = 'data:image/jpeg;base64,' + x.picProducto;
      });

      console.log('productos', this.productos);
    });
    */
    
  }

  

  buscar(event) {
    this.textoBusacar = event.detail.value;
  }

  comprar(producto) {
    this.showCardSearch = false;
    this.selectedProducto = producto;
  }

  cancelarCompra() {
    this.showCardSearch = true;
    this.selectedProducto = null;
  }

  selectUnidad(event) {
    console.log('datos seleccionado', event);
    this.selectedProducto.tipo_unidad = event.detail.value;
    this.esCaja = event.detail.value === 'CAJA' ? true : false;
  }

  grabarCompra() {
    this.stockService
      .registrarCompra(
        this.selectedProducto.idProducto,
        this.selectedProducto.cantidad,
        this.selectedProducto.precioUnitario,
        this.selectedProducto.tipo_unidad,
        this.selectedProducto.unidadesCaja,
        this.selectedProducto.precioUnitario
      )
      .subscribe((resul) => {
        this.stockService.showMessageResponse(resul);
        if (resul.state === 1) {
          this.cargarProductos();
          this.cancelarCompra();
        }
      });
  }
}
