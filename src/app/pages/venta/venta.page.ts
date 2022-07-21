import { Component, OnInit } from '@angular/core';
import { DetalleVenta } from 'src/app/interfaces/venta/detalleVenta';
import { ResulProductoPrecioVenta } from 'src/app/interfaces/venta/itemProductoVenta';
import { StockService } from 'src/app/services/stock.service';
import { VentaService } from 'src/app/services/venta.service';

@Component({
  selector: 'app-venta',
  templateUrl: './venta.page.html',
  styleUrls: ['./venta.page.scss'],
})
export class VentaPage implements OnInit {
  showCardSearch = true;
  esCaja = false;
  selectedProducto: any = null;
  textoBusacar = '';
  productos: ResulProductoPrecioVenta[] = [];
  productosAvender: any[] = [];
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

  listaDetalleVentas: DetalleVenta[] = [];

  constructor(private ventaService: VentaService) {}

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos() {
    this.ventaService.searchProductVenta().then((productosService) => {
      productosService.subscribe((resul) => {
        console.log(resul);
        this.productos = resul.listEntities;
        console.log('productos', this.productos);
        this.productos.forEach((x) => {
          x.embase = x.embase ? x.embase.toUpperCase() : 'UNIDAD';
          x.picProducto = 'data:image/jpeg;base64,' + x.picProducto;
        });
      });
    });
  }

  buscar(event) {
    this.textoBusacar = event.detail.value;
  }

  registroVenta(producto) {
    this.showCardSearch = false;
    this.selectedProducto = producto;
  }

  selectUnidad(event) {
    console.log('datos seleccionado', event);
    this.esCaja = event.detail.value === 'CAJA' ? true : false;
    this.selectedProducto.unidad = event.detail.value;
  }

  cancelarVenta() {
    this.showCardSearch = true;
    this.selectedProducto = null;
  }

  registrarVenta(producto) {
    if (!this.validarCantidadVenta()) {
      return;
    }
    this.productos.forEach((x) => {
      if (x.idProducto === producto.idProducto) {
        x.enStock =
          x.enStock - producto.cantidadVendida * producto.cantidadCaja;
      }
    });
    producto.precioTotal = producto.cantidadVendida * producto.precio;
    producto.secuencialVenta = this.productosAvender.length;
    this.productosAvender.push(producto);
    this.showCardSearch = true;
    this.selectedProducto = null;
  }

  validarCantidadVenta() {
    console.log('ingrese a validarCantidadVenta');
    let validCantidad = true;
    if (this.selectedProducto.cantidadVendida <= 0) {
      this.ventaService.showMessageWarning(
        'La cantidad de venta debe ser mayor a 0'
      );
      validCantidad = false;
    }

    if (this.selectedProducto.cantidadVendida > this.selectedProducto.enStock) {
      this.ventaService.showMessageWarning(
        'La cantidad de venta no debe ser mayor a ' +
          this.selectedProducto.enStock
      );
      validCantidad = false;
    }
    return validCantidad;
  }

  registrarVentaTotal() {
    if (this.productosAvender.length === 0) {
      this.ventaService.showMessageWarning(
        'Debe tener al menos un producto adicionado para vender'
      );
    }

    this.productosAvender.forEach((x) => {
      const detalleventaInstance = new DetalleVenta();
      detalleventaInstance.idProducto = x.idProducto;
      detalleventaInstance.cantidad = x.cantidadVendida * x.cantidadCaja;
      detalleventaInstance.precioUnitario =
        x.precioTotal / x.cantidadCaja / x.cantidadVendida;
      detalleventaInstance.unidadePorCaja = x.cantidadCaja;
      detalleventaInstance.precioCaja = x.precioTotal / x.cantidadCaja;
      this.listaDetalleVentas.push(detalleventaInstance);
    });

    this.ventaService
      .registrarVenta(this.listaDetalleVentas)
      .then((registroService) => {
        registroService.subscribe((resul) => {
          this.ventaService.showMessageResponse(resul);
          this.cargarProductos();
          this.productosAvender = [];
        });
      });
  }

  quitarProducto(producto) {
    this.productos.forEach((x) => {
      if (x.idProducto === producto.idProducto) {
        x.enStock =
          x.enStock + producto.cantidadVendida * producto.cantidadCaja;
      }
    });
    this.productosAvender.splice(producto.secuencialVenta, 1);
  }
}
