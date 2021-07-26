import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { ApiResponse } from '../model/api.response';
import { Observable } from "rxjs/index";
import { Busqueda } from '../model/busqueda.model';
import { Confirmation } from '../model/confirmation.model';
import { Consolidado } from '../model/consolidado.model';
import { Rechazo } from '../model/rechazo.model';
import { Reinyeccion } from '../model/reinyeccion.model';
import { DetallePago } from '../model/detallepago.model';
import { CargoAbono } from '../model/cargoabono.model';
import { aRechazoSintaxisDTO } from '../model/ARechazoSintaxisDTO.model';
import { LCatalogosDTO } from '../model/lCatalogosDTO';
import { RechazoParams } from '../model/RechazoParams.model';
@Injectable({
  providedIn: 'root'
})
export class AquirerService {

  constructor(private http: HttpClient) { }
  //baseUrl: string = '/api/';
 // baseUrlNube: string = 'https://virtserver.swaggerhub.com/cbocardo/XEMA/1.0/amexBBVA/';
  //baseMockon: string = 'http://localhost:8443/amexBBVA-api/';
  // baseQA: string= 'http://172.29.6.238:8080/amexOptBlue-api/';
  // baseQA: string = 'http://172.29.6.238:8080/amexOptBlue-api/'
    baseQA: string = '/api/';
  getObtieneReporteGRRCN(busqueda: Busqueda): Observable<ApiResponse> {

    return this.http.get<ApiResponse>(this.baseQA + 'getReporteGRRNC/' + busqueda.fechaIni + '/' + busqueda.fechaFin + '/' + busqueda.tipoRegistro);
  }
  getConfirmationReport(fechaIni,fechaFin,tipoRegistro,bandera,codigoError,estatus,fechaEstatus): Observable<ApiResponse[]> {
    let headers = new HttpHeaders();
    headers = headers.set('accept', 'application/json').set('AUTH_API_KEY', 'abcd123456');
    return this.http.get<ApiResponse[]>(this.baseQA + 'getConfirmationReport/' +
      fechaIni + '/' + fechaFin + '/' + tipoRegistro +
      '/' + bandera + '/' + codigoError + '/' + estatus + '/'
      + fechaEstatus, { headers });
  }
  getConfirmationReportCodigo(confirmation: Confirmation): Observable<ApiResponse[]> {
    let headers = new HttpHeaders();
    headers = headers.set('accept', 'application/json').set('AUTH_API_KEY', 'abcd123456');

    return this.http.get<ApiResponse[]>(this.baseQA + 'getConfirmationReport/' +
      confirmation.fechaIni + '/' + confirmation.fechaFin + '/' + confirmation.tipoRegistro +
      '/' + confirmation.bandera + '/' + confirmation.codigoError + '/' + confirmation.estatus + '/'
      + confirmation.fechaEstatus, { headers });
  }
  getConsultaVentaAMEX(fechaI, fechaF, bandera, vEstatus, recordNumber): Observable<ApiResponse> {
    let headers = new HttpHeaders();
    headers = headers.set('accept', 'application/json').set('AUTH_API_KEY', 'abcd123456');
    console.log("Ruta Venta", fechaI, fechaF, bandera, vEstatus, recordNumber);
    return this.http.get<ApiResponse>(this.baseQA + 'getConsultaVentaAMEX/' + fechaI +
      '/' + fechaF + '/' + bandera + '/' + vEstatus + '/' + recordNumber, { headers });
  }

  getCatalogoEstatusAmex(): Observable<ApiResponse> {
    let headers = new HttpHeaders();
    headers = headers.set('accept', 'application/json').set('AUTH_API_KEY', 'abcd123456');

    return this.http.get<ApiResponse>(this.baseQA + 'getCatalogoEstatusAmex/', { headers });
  }

  getCaratulaGRRCN(pvFechaProceso,pvFechaFinal): Observable<ApiResponse[]> {
    let headers = new HttpHeaders();
    headers = headers.set('accept', 'application/json').set('AUTH_API_KEY', 'abcd123456');

    return this.http.get<ApiResponse[]>(this.baseQA + 'getCaratulaGRRCN/' + pvFechaProceso + '/' +
      pvFechaFinal, { headers });
  }
  getConsultaRechSintaxis(pvFechaIni,pvFechaFin,pvEstatus): Observable<ApiResponse[]> {
    let headers = new HttpHeaders();
    console.log(pvFechaIni,pvFechaFin,pvEstatus)
    headers = headers.set('accept', 'application/json').set('AUTH_API_KEY', 'abcd123456');
    return this.http.get<ApiResponse[]>(this.baseQA + 'getConsultaRechSintaxis/' +
      pvFechaIni + '/' + pvFechaFin + '/' + pvEstatus, { headers });
  }
  getObtenerRechSintaxis(pvFechaIni,pvFechaFin,folioEgl,pvEstatus): Observable<ApiResponse[]> {
    let headers = new HttpHeaders();
    console.log("ruta", pvFechaIni, pvFechaFin, folioEgl, pvEstatus)
    headers = headers.set('accept', 'application/json').set('AUTH_API_KEY', 'abcd123456');
    return this.http.get<ApiResponse[]>(this.baseQA + 'getObtenerRechSintaxis/' +
      pvFechaIni + '/' + pvFechaFin + '/' + folioEgl   + '/'  + pvEstatus, { headers });
  }
  getObtenerCatalogosCAEstatus(): Observable<ApiResponse[]> {
    let headers = new HttpHeaders();
    headers = headers.set('accept', 'application/json').set('AUTH_API_KEY', 'abcd123456');
    return this.http.get<ApiResponse[]>(this.baseQA + 'getObtenerCatalogosCA/' + 'EA', { headers });
  }
  getObtenerCatalogosCAArea(): Observable<ApiResponse[]> {
    let headers = new HttpHeaders();
    headers = headers.set('accept', 'application/json').set('AUTH_API_KEY', 'abcd123456');
    return this.http.get<ApiResponse[]>(this.baseQA + 'getObtenerCatalogosCA/' + 'AR', { headers });
  }
  getObtenerCatalogosCAMovimiento(): Observable<ApiResponse[]> {
    let headers = new HttpHeaders();
    headers = headers.set('accept', 'application/json').set('AUTH_API_KEY', 'abcd123456');
    return this.http.get<ApiResponse[]>(this.baseQA + 'getObtenerCatalogosCA/' + 'MO', { headers });
  }
  getObtenerCatalogosCAProceso(): Observable<ApiResponse[]> {
    let headers = new HttpHeaders();
    headers = headers.set('accept', 'application/json').set('AUTH_API_KEY', 'abcd123456');
    return this.http.get<ApiResponse[]>(this.baseQA + 'getObtenerCatalogosCA/' + 'PR', { headers });
  }
  getObtenerCatalogosCALeyenda(): Observable<ApiResponse[]> {
    let headers = new HttpHeaders();
    headers = headers.set('accept', 'application/json').set('AUTH_API_KEY', 'abcd123456');
    return this.http.get<ApiResponse[]>(this.baseQA + 'getObtenerCatalogosCA/' + 'LE', { headers });
  }
  getObtenerCatalogosCADivisa(): Observable<ApiResponse[]> {
    let headers = new HttpHeaders();
    headers = headers.set('accept', 'application/json').set('AUTH_API_KEY', 'abcd123456');
    return this.http.get<ApiResponse[]>(this.baseQA + 'getObtenerCatalogosCA/' + 'DI', { headers });
  }
  getObtenerCatalogosCACobro(): Observable<ApiResponse[]> {
    let headers = new HttpHeaders();
    headers = headers.set('accept', 'application/json').set('AUTH_API_KEY', 'abcd123456');
    return this.http.get<ApiResponse[]>(this.baseQA + 'getObtenerCatalogosCA/' + 'CO', { headers });
  }
  getObtenerCatalogosCATipoRegistro(): Observable<ApiResponse[]> {
    let headers = new HttpHeaders();
    headers = headers.set('accept', 'application/json').set('AUTH_API_KEY', 'abcd123456');
    return this.http.get<ApiResponse[]>(this.baseQA + 'getObtenerCatalogosCA/' + 'TR', { headers });
  }

  getObtenerCatalogosCATipoRegistroGRRCN(): Observable<ApiResponse[]> {
    let headers = new HttpHeaders();
    headers = headers.set('accept', 'application/json').set('AUTH_API_KEY', 'abcd123456');
    return this.http.get<ApiResponse[]>(this.baseQA + 'getObtenerCatalogosCA/' + 'GR', { headers });
  }
  getObtenerCatalogosCARechazoSintaxis(): Observable<ApiResponse[]> {
    let headers = new HttpHeaders();
    headers = headers.set('accept', 'application/json').set('AUTH_API_KEY', 'abcd123456');
    return this.http.get<ApiResponse[]>(this.baseQA + 'getObtenerCatalogosCA/' + 'ER', { headers });
  }

  getGRRNCInfo(detpago: DetallePago): Observable<ApiResponse[]> {
    let headers = new HttpHeaders();
    headers = headers.set('accept', 'application/json').set('AUTH_API_KEY', 'abcd123456');
    return this.http.get<ApiResponse[]>(this.baseQA + 'getGRRNCInfo/' + detpago.pvFechaProceso + '/' + detpago.pvFechaFinal, { headers });
  }
  getDetallesGRRCN(pvFechaProceso,pvFechaFinal,IdTipoRegistro): Observable<ApiResponse[]> {
    let headers = new HttpHeaders();
     console.log("preuab datos",pvFechaProceso,pvFechaFinal,IdTipoRegistro);
    headers = headers.set('accept', 'application/json').set('AUTH_API_KEY', 'abcd123456');
    return this.http.get<ApiResponse[]>(this.baseQA + 'getDetallesGRRCN/' + pvFechaProceso + '/' + pvFechaFinal + '/' + IdTipoRegistro, { headers });
  }
  getTxtCaratulaGRRCN(pvFechaProceso, pvFechaFinal, pvTipoMoneda, pvTipoPago): Observable<ApiResponse> {
    let headers = new HttpHeaders();
    console.log("Ruta TXT", pvFechaProceso, pvFechaFinal, pvTipoMoneda, pvTipoPago)
    headers = headers.set('accept', 'application/json').set('AUTH_API_KEY', 'abcd123456');
    return this.http.get<ApiResponse>(this.baseQA + 'getTxtCaratulaGRRCN/' + pvFechaProceso + '/' + pvFechaFinal + '/' + pvTipoMoneda
      + '/' + pvTipoPago, { headers });
  }

  getObtieneRechazos(fechaIni,fechaFin,tipoRegistro,estatus): Observable<ApiResponse[]> {
    let headers = new HttpHeaders();
    headers = headers.set('accept', 'application/json').set('AUTH_API_KEY', 'abcd123456');
    return this.http.get<ApiResponse[]>(this.baseQA + 'getObtenerListadoConfReport/' + fechaIni + '/' + fechaFin + '/' + tipoRegistro +
      '/' + estatus, { headers });
  }
  getObtenerCargoAbono(bandera, fechaI, element, codigoError, estatus, tipoRegistro): Observable<ApiResponse[]> {
    let headers = new HttpHeaders();
    console.log("ruta carga Abono", bandera, fechaI, element, codigoError, estatus, tipoRegistro)
    headers = headers.set('accept', 'application/json').set('AUTH_API_KEY', 'abcd123456');
    return this.http.get<ApiResponse[]>(this.baseQA + 'getObtenerCargoAbono/' + bandera + '/' +
      fechaI + '/' + element + '/' + tipoRegistro + '/' + codigoError + '/' + estatus, { headers });
  }
  /////////////////Metodos POST///////////////////////
  postDictaminacionCargoAbono(cargoabono: CargoAbono): Observable<ApiResponse> {
    let headers = new HttpHeaders();
    console.log("ruta carga Abono", CargoAbono);
    headers = headers.set('accept', 'application/json').set('AUTH_API_KEY', 'abcd123456');
    return this.http.post<ApiResponse>(this.baseQA + 'postDictaminacionCargoAbono/', cargoabono, { headers });
  }
  postDictaminaReinyeccion(reinyeccion): Observable<ApiResponse> {
    let headers = new HttpHeaders();
    console.log("Objeto Reinyeccion", reinyeccion);
    headers = headers.set('accept', 'application/json').set('AUTH_API_KEY', 'abcd123456');
    return this.http.post<ApiResponse>(this.baseQA + 'postDictaminaReinyeccion/', reinyeccion, { headers });
  }
  postActualizaRechazoSintaxis(ARechazoSintaxisDTO:aRechazoSintaxisDTO): Observable<ApiResponse> {
    let headers = new HttpHeaders();
    console.log("Objeto Rechazo", ARechazoSintaxisDTO);
    headers = headers.set('accept', 'application/json').set('AUTH_API_KEY', 'abcd123456');
    return this.http.post<ApiResponse>(this.baseQA + 'postActualizaRechazoSintaxis/', ARechazoSintaxisDTO, { headers });
  }

  ///////////////////////////////AMEX-BANORTE/////////////////////////////////////
  getFuentepapel(): Observable<ApiResponse[]> {
    let headers = new HttpHeaders();

    headers = headers.set('accept', 'application/json').set('AUTH_API_KEY', 'abcd123456');
    return this.http.get<ApiResponse[]>(this.baseQA + 'consulta/fuentepapel/1010/1010', { headers });
  }
  getCatalogosAcciones(): Observable<LCatalogosDTO[]> {
    let headers = new HttpHeaders();

    headers = headers.set('accept', 'application/json').set('AUTH_API_KEY', 'abcd123456');
    return this.http.get<LCatalogosDTO[]>(this.baseQA + '/catalogos/72/4', { headers });
  }
  postConsultaRechazo(rechazoParams: RechazoParams): Observable<any> {
    let headers = new HttpHeaders();

    headers = headers.set('accept', 'application/json').set('AUTH_API_KEY', 'abcd123456');
    return this.http.post<any>(this.baseQA + 'consulta/rechazo/', rechazoParams, { headers });
  }
  postConsultaRechazoFolio(rechazoParams: RechazoParams): Observable<any> {
    let headers = new HttpHeaders();

    headers = headers.set('accept', 'application/json').set('AUTH_API_KEY', 'abcd123456');
    return this.http.post<any>(this.baseQA + 'consulta/rechazo/', rechazoParams, { headers });
  }
  getCatalogosCodigosTxn(): Observable<LCatalogosDTO[]> {
    let headers = new HttpHeaders();

    headers = headers.set('accept', 'application/json').set('AUTH_API_KEY', 'abcd123456');
    return this.http.get<LCatalogosDTO[]>(this.baseQA + '/catalogos/72/3', { headers });
  }
  getCatalogosCodigosRej(): Observable<LCatalogosDTO[]> {
    let headers = new HttpHeaders();

    headers = headers.set('accept', 'application/json').set('AUTH_API_KEY', 'abcd123456');
    return this.http.get<LCatalogosDTO[]>(this.baseQA + 'catalogos/72/2', { headers });
  }
  postCargaEmisor(): Observable<LCatalogosDTO[]> {
    let headers = new HttpHeaders();

    headers = headers.set('accept', 'application/json').set('AUTH_API_KEY', 'abcd123456');
    return this.http.post<LCatalogosDTO[]>(this.baseQA + 'consulta/emisor', { headers });
  }
  postCargaAdquirente(): Observable<LCatalogosDTO[]> {
    let headers = new HttpHeaders();

    headers = headers.set('accept', 'application/json').set('AUTH_API_KEY', 'abcd123456');
    return this.http.post<LCatalogosDTO[]>(this.baseQA + 'consulta/adquirente', { headers });
  }
}
