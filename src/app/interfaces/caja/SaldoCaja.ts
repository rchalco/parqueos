export class SaldoCajaDTO {
  idCaja: number;
  nombreCaja: string;
  fechaCierre: string;
  saldoInicial: number;
  saldoCierre: number;
  saldoUsuario: number;
  diferencia: number;
  observacion: string;
  esCajaActual: boolean;
  estadoCaja: string;
  idOperacionDiariaCaja: number;
  idSesion: number;
  fechaApertura: string;
  observacioApertura: string;
  observacionCierre: string;
}
