import {
  AfterViewInit,
  Component,
  OnInit,
  ElementRef,
  ViewChild,
} from '@angular/core';
//import { Chart } from 'chart.js';
import Chart from 'chart.js/auto';
import { DetalleGananciasDTO } from 'src/app/interfaces/venta/detalleGanancias';
import { StockService } from 'src/app/services/stock.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reporte-tablero',
  templateUrl: './reporte-tablero.page.html',
  styleUrls: ['./reporte-tablero.page.scss'],
})
export class ReporteTableroPage implements OnInit {
  @ViewChild('lineChartCanvas') private charLineRef: ElementRef;
  @ViewChild('doughnutCanvas') private doughnutRef: ElementRef;
  @ViewChild('barCanvas') private barCharRef: ElementRef;

  showTablero = false;
  fechaSeleccionadaIni: any = new Date().toISOString();
  fechaSeleccionadaFin: any = new Date().toISOString();

  ///TABLERO ESTILO DONUTS
  chart: any;
  datosTablero: any = [];
  labelsTablero: any = [];
  backgoundColorsTablero: any = [
    'rgba(255, 159, 64, 0.8)',
    'rgba(255, 99, 132, 0.8)',
    'rgba(54, 162, 235, 0.8)',
    'rgba(255, 206, 86, 0.8)',
    'rgba(75, 192, 192, 0.8)',
    'rgba(229, 0, 255, 0.8)',
    'rgba(0, 255, 127, 0.8)',
    'rgba(255, 233, 0, 0.8)',
    'rgba(0, 182, 255, 0.8)',
  ];
  ///TABLERO ESTILO BAR
  barChart: any;
  datosTableroBar: any = [];
  borderColorBar: any = [
    'rgba(255,99,132,1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)'
  ];

  backgroundBar: any = [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)'
  ];
  ///TABLERO ESTILO LINE
  lineChart: any;


  constructor(private stockService: StockService) {}

  listaVentasPorProducto: DetalleGananciasDTO[] = [];


  ngOnInit() {

    this.showTablero = false;
  }

  doughProductosVendidos(){

    setTimeout(() => {
      this.chart = new Chart(this.doughnutRef.nativeElement, {
        type: 'doughnut',
        data: {
          labels:this.labelsTablero,
          datasets: [
            {
              data: this.datosTablero,
              backgroundColor: this.backgoundColorsTablero,
            },
          ],
        },
        options: {
          responsive: true,
          aspectRatio: 1,
        },
      });
    }, 1000);
  }

  barProductosVendidos() {
    setTimeout(() => {
      this.barChart = new Chart(this.barCharRef.nativeElement, {
        type: 'bar',
        data: {
          labels: this.labelsTablero,
          datasets: [{
            label: 'PRODUCTOS VENDIDOS POR CANTIDAD',
            data: this.datosTableroBar,
            backgroundColor: this.backgroundBar,
            borderColor: this.borderColorBar,
            borderWidth: 1
          }]
        },
        
      });
    }, 1000);
  }
  
  lineProductosVendidos() {
    setTimeout(() => {
      this.lineChart = new Chart(this.charLineRef.nativeElement, {
        type: 'line',
        data: {
          labels: this.labelsTablero,
          datasets: [
            {
              label: 'PRODUCTOS VENDIDOS POR MONTO ',
              fill: false,
              backgroundColor: 'rgba(75,192,192,0.4)',
              borderColor: 'rgba(75,192,192,1)',
              borderCapStyle: 'butt',
              borderDash: [],
              borderDashOffset: 0.0,
              borderJoinStyle: 'miter',
              pointBorderColor: 'rgba(75,192,192,1)',
              pointBackgroundColor: '#fff',
              pointBorderWidth: 1,
              pointHoverRadius: 5,
              pointHoverBackgroundColor: 'rgba(75,192,192,1)',
              pointHoverBorderColor: 'rgba(220,220,220,1)',
              pointHoverBorderWidth: 2,
              pointRadius: 4,
              pointHitRadius: 10,
              data: this.datosTablero,
              spanGaps: false,
            }
          ]
        }
      });
    }, 1000);
  }

  selectFechaIni(event) {
    this.fechaSeleccionadaIni = event;

  }

  selectFechaFin(event) {
    this.fechaSeleccionadaFin = event;

  }

  obtenerDatos(){
    this.stockService.graficoVentaPorProducto(this.fechaSeleccionadaIni,this.fechaSeleccionadaFin).then((resulPromise) => {
      resulPromise.subscribe((resul) => {
        //console.log(resul);
        this.listaVentasPorProducto = resul.listEntities;
        if (!this.listaVentasPorProducto)
          this.stockService.showMessageWarning('No se tiene información para la fecha seleccionada');
        //console.log('Datos Tablero', this.listaVentasPorProducto)

        for (var i = 0; i < this.listaVentasPorProducto.length; i++) {
          //console.log('montos', this.listaVentasPorProducto[i].totalVenta)
          this.datosTablero.push(this.listaVentasPorProducto[i].totalVenta);
          this.labelsTablero.push(this.listaVentasPorProducto[i].producto);
          this.datosTableroBar.push(this.listaVentasPorProducto[i].cantidad);
        }

      });
    });
    this.doughProductosVendidos();
    this.barProductosVendidos();
    this.lineProductosVendidos();
    this.showTablero = true;
  }

  volverFechas(){
    this.showTablero = false;
  }

}
