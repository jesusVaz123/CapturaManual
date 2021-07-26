import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators,FormArray,FormControl} from "@angular/forms";
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AquirerService } from 'src/app/service/aquirer.service';
import { DetallePago } from 'src/app/model/detallepago.model';
import { Router } from "@angular/router";
import { DatePipe } from "@angular/common";
import Swal from 'sweetalert2';
import * as xlsx from 'xlsx';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-detalle-pagos',
  templateUrl: './detalle-pagos.component.html',
  styleUrls: ['./detalle-pagos.component.css']
})
export class DetallePagosComponent implements OnInit {
  fechaactual = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
  toppings = new FormControl();

 toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
DetallePago: any;
estatus: any;
dataE: any;
  constructor(public dialog: MatDialog, private formBuilder: FormBuilder, private router: Router, 
        private datePipe: DatePipe, private AquirerService: AquirerService) { }
// detpagoColumns: string[] =['hFechaCreacion', 'hHoraCreacion', 'hNumSecuencia', 'hIdArchivo', 'hNombreArchivo', 
//                            'hVersionArchivo', 'sIdComercio', 'sTipoCuenta', 'sNumPago', 'sFechaPago', 
//                            'sMonedaPago', 'sReferenciaPago','sMontoNetoPago','sMontoBrutoPago','sMontoDescuento', 
//                            'sMontoServicio','sMontoAjuste', 'sMontoImpuestos', 'sMontoSaldoDebito', 'sNumDepositoDirecto', 
//                            'sCuentaBancaria', 'sCuentaBancariaInter', 'sCodigoBanco','tTotalRegistros' ];
// detpagoColumns: string[] =['tipoRegistro','idComercioDestino','codTipoCuenta','numPagoAmex','fechaPago',
//                            'monedaPago','idComercioOrigen','fechaPresentacion','numReferencia','numVendedor',
//                            'numTarjeta','montoTransaccion','fecProcesaAmex','fehaTransaccion'];
// detpagoColumns: string[] = ['pTipoRegistro','pFechaCreacion','pHoraCreacion','pNumSecuencial','pIdArchivo',
// 'pNombreArchivo','pVersionArchivo','pIdComercio','pCodTipoCuenta','pNumPagoAmex',
// 'pFechaPago','pMonedaPago','pIdComercioPresentacion','pFecEnvioComercial','pFecProcesaAmex',
// 'pNumFactura','pMoneda','pMonBrMonedaPago','pNumeroCuota','pNumReferencia','pNumVendedor','pNumTarjeta','pMontoTransaccion','pFechaTransaccion','pHoraTransaccion','pNumTransaccion',
// 'pCodAprobacion','pNumTerminal','pCodCatComercio','pNumRefAdq','pvFirstInstallAmount',
// 'pvSubInstallAmount','pCantidadCuotas','pMontoServicioDos','pFechaProceso','pEstatus','pTipoRegistroDos'];
detpagoColumns: string[] = ['dtFechaCarga','pTipoRegistro','pCantidadCuotas','pCodAprobacion','pCodCatComercio','pCodMotivoAjuste','pCodMotivoContra','pCodTipoCuenta','pCodigoBanco','pCodigoCargo','pCodigoFactura','pCodigoLote','pDescMotivoAjuste','pDescMotivoContra','pDiasAdelantados','pEstatus','pFecAceleracion','pFecEnvioComercial','pFecLiquiOrig',
 'pFecProcesaAmex','pFechaCreacion','pFechaPago','pFechaProceso','pFechaTransaccion','pHoraCreacion',
 'pHoraTransaccion','pIdArchivo','pIdComercio','pIdComercioPresentacion','pIdSeguimiento','pIdUbicacionComercio','pIndTransRecha','pMonAceleracion','pMonBrMonedaPago','pMonBrMonedaPres','pMonCargoAcelera','pMonCargoServicio','pMonDescPres','pMonNetoCargoAcelera','pMonSaldoDebIni','pMoneda',
 'pMonedaPago','pMontoAjuste','pMontoBruto','pMontoBrutoCredito','pMontoBrutoDebito','pMontoBrutoPago',
 'pMontoCargo','pMontoDescuento','pMontoDescuentoDos','pMontoImpuesto','pMontoImpuestoDos',
 'pMontoImpuestos','pMontoNeto','pMontoNetoDOs','pMontoNetoPago','pMontoServicio','pMontoServicioDos',
 'pMontoTransaccion','pNombreArchivo','pNumAceleracion','pNumAjuste','pNumFactura',
'pNumPagoAmex',
'pNumRefAdq',
'pNumRefSocio',
'pNumReferencia',
'pNumSecuencial',
'pNumTarjeta',
'pNumTerminal',
'pNumTransaccion',
'pNumVendedor',
'pNumeroCuota',
'pSumTotalReg',
'pSumaTrans',
'pTasaCambio',
'pTasaDescuento',
'pTasaDescuentoDos',
'pTasaImpuesto',

'pTipoRegistroDos',
'pVersionArchivo',
'pvFirstInstallAmount',
'pvSubInstallAmount',];
 dataDetallesPagos = new MatTableDataSource();
 @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
    
  ngOnInit() {
  	this.DetallePago = this.formBuilder.group({
          pvFechaProceso :[''], 
          fechaactual : [''],
          IdTipoRegistro:['',Validators.required]
        });
    this.AquirerService.getObtenerCatalogosCATipoRegistroGRRCN().subscribe(response => {
          this.estatus = response;
          //console.log('fechas', this.estatus)
        });
     //this.dataDetallesPagos = new MatTableDataSource(JSON.parse(localStorage.getItem('dataDetallesPagos')));    
     this.dataDetallesPagos.paginator = this.paginator;

  }
public checkError = (controlName: string, errorName: string) => {
    return this.DetallePago.controls[controlName].hasError(errorName);
  }
    onSubmit() {
    var fechaI = !this.DetallePago.value.pvFechaProceso ? this.fechaactual.value : this.DetallePago.value.pvFechaProceso;
    var fechaF = !this.DetallePago.value.fechaactual ? this.fechaactual.value : this.DetallePago.value.fechaactual;
    fechaI = this.datePipe.transform(fechaI, 'yyyyMMdd');
    fechaF = this.datePipe.transform(fechaF, 'yyyyMMdd');

        var tipoRegistro = this.DetallePago.value.IdTipoRegistro;
        
       //console.log("preuab datos",fechaI,fechaF,tipoRegistro);
        //this.AquirerService.getObtieneReporteGRRCN(JSON.parse(JSON.stringify(this.Confirmation.value)))
        this.AquirerService.getDetallesGRRCN(fechaI,fechaF,tipoRegistro)
        .subscribe(
            data  => {
                //console.log("getDetallesGRRCN Request is successful", data);
                console.log("Aqui va el DATA de la tabla", data);
               if (data.length == 0) { 
               Swal.fire({
              icon: 'info',
              text: 'No hay datos!'
            })
               this.dataDetallesPagos =  new MatTableDataSource();
                this.dataDetallesPagos.paginator = this.paginator;
          // localStorage.clear();
             } else {
               
            this.dataDetallesPagos = new MatTableDataSource(data);
          
            //localStorage.setItem('dataDetallesPagos', JSON.stringify(data));
             this.dataDetallesPagos.paginator = this.paginator;
            // this.rconfreport = data;
            }

          },
          error => {
            //Swal.fire('Error en el sericio')
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Problema Interno!'
            })
            console.log("Error", error);
            this.dataDetallesPagos.paginator = this.paginator;
            this.dataDetallesPagos =  new MatTableDataSource();
            this.dataDetallesPagos.paginator = this.paginator;
           // localStorage.clear();
          }

          );
    }
    applyFilter(filterValue: string) {
    this.dataDetallesPagos.filter = filterValue.trim().toLowerCase();
  }
     exportexcel(): void {
    {
      this.dataE = this.dataDetallesPagos;
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataE.filteredData);
      /* table id is passed over here */
      // this.dataE = this.dataDetallesPagos;
      // this.dataE.data.push(this.dataDetallesPagos);

//        const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataDetallesPagos.filteredData,{header: ['dtFechaCarga','pTipoRegistro','pCantidadCuotas','pCodAprobacion','pCodCatComercio','pCodMotivoAjuste','pCodMotivoContra','pCodTipoCuenta','pCodigoBanco','pCodigoCargo','pCodigoFactura','pCodigoLote','pDescMotivoAjuste','pDescMotivoContra','pDiasAdelantados','pEstatus','pFecAceleracion','pFecEnvioComercial','pFecLiquiOrig',
//  'pFecProcesaAmex','pFechaCreacion','pFechaPago','pFechaProceso','pFechaTransaccion','pHoraCreacion',
//  'pHoraTransaccion','pIdArchivo','pIdComercio','pIdComercioPresentacion','pIdSeguimiento','pIdUbicacionComercio','pIndTransRecha','pMonAceleracion','pMonBrMonedaPago','pMonBrMonedaPres','pMonCargoAcelera','pMonCargoServicio','pMonDescPres','pMonNetoCargoAcelera','pMonSaldoDebIni','pMoneda',
//  'pMonedaPago','pMontoAjuste','pMontoBruto','pMontoBrutoCredito','pMontoBrutoDebito','pMontoBrutoPago',
//  'pMontoCargo','pMontoDescuento','pMontoDescuentoDos','pMontoImpuesto','pMontoImpuestoDos',
//  'pMontoImpuestos','pMontoNeto','pMontoNetoDOs','pMontoNetoPago','pMontoServicio','pMontoServicioDos',
//  'pMontoTransaccion','pNombreArchivo','pNumAceleracion','pNumAjuste','pNumFactura',
// 'pNumPagoAmex',
// 'pNumRefAdq',
// 'pNumRefSocio',
// 'pNumReferencia',
// 'pNumSecuencial',
// 'pNumTarjeta',
// 'pNumTerminal',
// 'pNumTransaccion',
// 'pNumVendedor',
// 'pNumeroCuota',
// 'pSumTotalReg',
// 'pSumaTrans',
// 'pTasaCambio',
// 'pTasaDescuento',
// 'pTasaDescuentoDos',
// 'pTasaImpuesto',

// 'pTipoRegistroDos',
// 'pVersionArchivo',
// 'pvFirstInstallAmount',
// 'pvSubInstallAmount',]});
      //const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataE.data);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      var nombre= "Consolidado Pagos-BBVA-"+ this.DetallePago.value.pvFechaProceso;
      XLSX.utils.book_append_sheet(wb, ws, "Consolidado Pagos");
      // const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataE.filteredData);
      // /* generate workbook and add the worksheet */
      // const wb: XLSX.WorkBook = XLSX.utils.book_new();
      // XLSX.utils.sheet_add_json(ws, [{ A1: "Tipo de Registro" },],
      //   { header: ["A1"], skipHeader: true, origin: "A1" });
      // XLSX.utils.sheet_add_json(ws, [{ B1: "Comercio Destino" },],
      //   { header: ["B1"], skipHeader: true, origin: "B1" });
      // XLSX.utils.sheet_add_json(ws, [{ C1: "Codigo Cuenta" },],
      //   { header: ["C1"], skipHeader: true, origin: "C1" });
      // XLSX.utils.sheet_add_json(ws, [{ D1: "Pago AMEX" },],
      //   { header: ["D1"], skipHeader: true, origin: "D1" });
      // XLSX.utils.sheet_add_json(ws, [{ E1: "Fecha Pago" },],
      //   { header: ["E1"], skipHeader: true, origin: "E1" });
      // XLSX.utils.sheet_add_json(ws, [{ F1: "Moneda de Pago" },],
      //   { header: ["F1"], skipHeader: true, origin: "F1" });
      // XLSX.utils.sheet_add_json(ws, [{ G1: "Comercio de Origen" },],
      //   { header: ["G1"], skipHeader: true, origin: "G1" });
      // XLSX.utils.sheet_add_json(ws, [{ H1: "Fecha Presentación" },],
      //   { header: ["H1"], skipHeader: true, origin: "H1" });
      // XLSX.utils.sheet_add_json(ws, [{ I1: "No. Referencia" },],
      //   { header: ["I1"], skipHeader: true, origin: "I1" });
      // XLSX.utils.sheet_add_json(ws, [{ J1: "Número de Vendedor" },],
      //   { header: ["J1"], skipHeader: true, origin: "J1" });
      //  XLSX.utils.sheet_add_json(ws, [{ K1: "Número de Tarjeta" },],
      //   { header: ["K1"], skipHeader: true, origin: "K1" });
      //   XLSX.utils.sheet_add_json(ws, [{ L1: "Monto Transacción" },],
      //   { header: ["L1"], skipHeader: true, origin: "L1" });
      //    XLSX.utils.sheet_add_json(ws, [{ M1: "Fecha Proceson" },],
      //   { header: ["M1"], skipHeader: true, origin: "M1" });
      //     XLSX.utils.sheet_add_json(ws, [{ N1: "Fecha Transacción" },],
      //   { header: ["N1"], skipHeader: true, origin: "N1" });
      // XLSX.utils.book_append_sheet(wb, ws, 'Reporte Detalle Pagos');
      /* save to file */
      
            XLSX.writeFile(wb, nombre+'.xlsx');
      //XLSX.writeFile(wb, 'Concentrado de Reporte Detalle Pagos.xlsx');

    }
  }

}
