import { Component, OnInit, ViewChild, Inject  } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from "@angular/forms";
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AquirerService } from 'src/app/service/aquirer.service';
import { Router } from "@angular/router";
import { Confirmation } from 'src/app/model/Confirmation.model';
import { Detalle } from 'src/app/model/detalle.model';
import { DetalleCargoAbono } from 'src/app/model/detallecargoabono.model';
import { DatePipe } from "@angular/common";
import Swal from 'sweetalert2';
import * as xlsx from 'xlsx';
import { CommonModule } from '@angular/common';
import * as XLSX from 'xlsx';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import { RConfReportDTO } from 'src/app/model/RConfReportDTO.model';

@Component({
  selector: 'app-confirmation-report',
  templateUrl: './confirmation-report.component.html',
  styleUrls: ['./confirmation-report.component.css']
})
export class ConfirmationReportComponent implements OnInit  {
  fechaactual = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
  selectedSkill: any;
  Confirmation: any;
  actualiza:any;
  Detalle: any;
  DetalleCargoAbono: any;
  estatus: any;
  tipoRegistro: any;
  codigoError: any;
  dataE: any;
  dataEC: any;
  dataECA: any;
  dataERY: any;
  dataD:any;
  ConfDTO: RConfReportDTO[];
  constructor(public dialog: MatDialog, private formBuilder: FormBuilder, private router: Router,
    private datePipe: DatePipe, private AquirerService: AquirerService) { }
  displayedColumns: string[] = ['myColumn', 'vFechaEstatus', 'vNoPlastico', 'mImporteTxn', 'vNumAutoriza', 'vNoAfiliacion', 'c_emi_nombre', 'c_adq_nombre', 'vRecordNumber', 'vEstatus'];
  dataConfirmation = new MatTableDataSource();
  dataDetalle = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  ngOnInit() {

    this.Confirmation = this.formBuilder.group({
      fechaIni: [''],
      fechaFin: ['',],
      estatus: ['',Validators.required],
      tipoRegistro: ['',Validators.required],
      bandera: [''],
      fechaEstatus: [''],
      codigoError: ['',Validators.required]
    });
    this.AquirerService.getObtenerCatalogosCATipoRegistro().subscribe(response => {
      console.log("Aqui va el Tipo registro ", response);
      this.tipoRegistro = response;
      this.AquirerService.getObtenerCatalogosCAEstatus().subscribe(response => {
        console.log("Aqui va el Estatus ", response);
        this.estatus = response;
      });
    });
    this.Detalle = this.formBuilder.group({
      dtFechaProceso: [''],
      vRegLlave: [''],
      vTransId: [''],
      vNumAutoriza: [''],
      vNoPlastico: [''],
      vFechaTxn: [''],
      mImporteTxn: [''],
      vHoraTxn: [''],
      vCodTra: [''],
      vTipoPlan: [''],
      vProcCode: [''],
      vTipoMoneda: [''],
      vParcializacion: [''],
      vIdGiro: [''],
      vNoAfiliacion: [''],
      vNoAfiliacionAmex: [''],
      vRazonSocial: [''],
      vCalleNo: [''],
      vCiudad: [''],
      vCodEstado: [''],
      vCodPaisBr: [''],
      vCodPostal: [''],
      vPosData: [''],
      vEmisor: [''],
      vAdquirente: [''],
      vIdUltimaMod: [''],
      vdFechaUltimaMod: [''],
      dtFechaCarga: [''],
      vEstatus: [''],
      vCodClave: [''],
      iBandera: [''],
      vCodDesc: ['']
    });
    this.DetalleCargoAbono = this.formBuilder.group({
      dtFechaCarga: [''],
      vNoAfiliacion: [''],
      vAutorizacion: [''],
      vNoPlastico: [''],
      mImporteTxn: [''],
      estatusAMEX: [''],
      codigoError: [''],
      descripcionError: [''],
      vArea: 0,
      vMovimiento: [''],
      vProceso: [''],
      vLeyenda: [''],
      vDivisa: [''],
      vCobro: [''],
      vEmisor: [''],
      vAdquirente: ['']
    });  
    // this.dataConfirmation = new MatTableDataSource();
    // this.refresh(this.actualiza);
    this.deleteRowDataTable('vRecordNumber',this.actualiza.dataR.vRecNumberEgl,this.paginator, this.dataConfirmation);
  }

  botonDetalle: boolean = true;
  botonReinyeccion: boolean = true;
  botonCargoAbono: boolean = true;

  openDetalle(registro): void {
    this.detalle(registro);
  }

  openReinyeccion(registro) {
    this.detallereinyeecion(registro);
  }
  onChange() {
    var fechaI = !this.Confirmation.value.fechaIni ? this.fechaactual.value : this.Confirmation.value.fechaIni;
    var fechaF = !this.Confirmation.value.fechaFin ? this.fechaactual.value : this.Confirmation.value.fechaFin;
    // var fechaI = this.Confirmation.value.fechaIni;
    // var fechaF = this.Confirmation.value.fechaFin;
    this.Confirmation.value.fechaIni = this.datePipe.transform(fechaI, 'yyyyMMdd');
    this.Confirmation.value.fechaFin = this.datePipe.transform(fechaF, 'yyyyMMdd');
    this.Confirmation.value.bandera = 1;
    this.Confirmation.value.codigoError = 'null';
    this.Confirmation.value.estatus = 'null';
    this.Confirmation.value.fechaEstatus = 'null';
    console.log("aqui va la confirmacion", this.Confirmation.value);
    fechaI = this.Confirmation.value.fechaIni;
    this.AquirerService.getConfirmationReportCodigo(this.Confirmation.value).subscribe(
      data => {
        console.log("getConfirmationReportCodigo Request is successful ", data);
        this.codigoError = data;
      },
      error => {
        //Swal.fire('Error en el sericio')
        // Swal.fire({
          //   icon: 'error',
          //   title: 'Oops...',
          //   text: 'Algo salió mal!'
          // })
          console.log("Error", error);
        }

        );

  }
  public checkError = (controlName: string, errorName: string) => {
    return this.Confirmation.controls[controlName].hasError(errorName);
  }
  private deleteRowDataTable (idColumn, vRecordNumber, paginator, dataSource) {
    
    this.dataConfirmation = dataSource.data;
    const itemIndex = dataSource.data.findIndex(obj => obj[idColumn] === vRecordNumber);
    dataSource.data.splice(itemIndex, 1);
    dataSource.paginator = paginator;
  }
  refresh(data){
    this.actualiza= data;
    this.dataConfirmation = new MatTableDataSource();
    console.log("prueba refresh",this.actualiza);
    var fechaIni = this.actualiza.confirmacion.fechaIni;
    var fechaFin = this.actualiza.fechaF ;
    var fechaEstatus = this.actualiza.confirmacion.fechaEstatus;
    var tipoRegistro= this.actualiza.confirmacion.tipoRegistro;
    fechaIni = this.datePipe.transform(fechaIni, 'yyyyMMdd');
    //fechaFin = this.datePipe.transform(fechaFin, 'yyyyMMdd');
  
    fechaEstatus = this.datePipe.transform(fechaEstatus, 'yyyyMMdd');
    var bandera = 2;
    var codigoError = this.actualiza.confirmacion.codigoError;
    var estatus = this.actualiza.confirmacion.estatus;
    
            console.log("aqui va la confirmacion actualiza tabla", fechaIni,fechaFin,tipoRegistro,bandera,codigoError,estatus,fechaEstatus);
            this.AquirerService.getConfirmationReport(fechaIni,fechaFin,tipoRegistro,bandera,codigoError,estatus,fechaEstatus)
            .subscribe(
              data2 => {
                console.log("getReporteGRRNC Request is successful ", data2);
        
                if (data2.length == 0 ) {
                  Swal.fire({
                    icon: 'info',
                    text: 'No hay datos!'
                  })
                  this.dataConfirmation = new MatTableDataSource();
                } else {
                  this.dataConfirmation = new MatTableDataSource(data2);
                  this.dataConfirmation.paginator = this.paginator;
        
                }
        
              },
              error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Problema Interno!'
                })
                console.log("Error", error);
                this.dataConfirmation = new MatTableDataSource();
              });
}

   onSubmit() {
     
    this.dataConfirmation = new MatTableDataSource();
     console.log("pruba actualiza",this.actualiza);
     if(!this.actualiza){
      var fechaIni = !this.Confirmation.value.fechaIni ? this.fechaactual.value : this.Confirmation.value.fechaIni;
      var fechaFin = !this.Confirmation.value.fechaFin ? this.fechaactual.value : this.Confirmation.value.fechaFin;
      var fechaEstatus = this.Confirmation.value.fechaEstatus;
      var tipoRegistro= this.Confirmation.value.tipoRegistro;
      fechaIni = this.datePipe.transform(fechaIni, 'yyyyMMdd');
      fechaFin = this.datePipe.transform(fechaFin, 'yyyyMMdd');
    
      fechaEstatus = this.datePipe.transform(fechaEstatus, 'yyyyMMdd');
      var bandera = 2;
      var codigoError = this.Confirmation.value.codigoError;
      var estatus = this.Confirmation.value.estatus;
      console.log("aqui va la confirmacion onsubmit", fechaIni,fechaFin,tipoRegistro,bandera,codigoError,estatus,fechaEstatus);

     }else{
      var fechaIni = this.actualiza.confirmacion.fechaIni;
      var fechaFin = this.actualiza.fechaF ;
      var fechaEstatus = this.actualiza.confirmacion.fechaEstatus;
      var tipoRegistro= this.actualiza.confirmacion.tipoRegistro;
      fechaIni = this.datePipe.transform(fechaIni, 'yyyyMMdd');
    //fechaFin = this.datePipe.transform(fechaFin, 'yyyyMMdd');
  
      fechaEstatus = this.datePipe.transform(fechaEstatus, 'yyyyMMdd');
      var bandera = 2;
      var codigoError = this.actualiza.confirmacion.codigoError;
      var estatus = this.actualiza.confirmacion.estatus;
      console.log("aqui va la confirmacion Refresh", fechaIni,fechaFin,tipoRegistro,bandera,codigoError,estatus,fechaEstatus);

     }

    console.log("aqui va la confirmacion", fechaIni,fechaFin,tipoRegistro,bandera,codigoError,estatus,fechaEstatus);
    this.AquirerService.getConfirmationReport(fechaIni,fechaFin,tipoRegistro,bandera,codigoError,estatus,fechaEstatus)
    .subscribe(
      data => {
        console.log("confirmacion Request is successful ", data);

        if (data.length == 0 ) {
          Swal.fire({
            icon: 'info',
            text: 'No hay datos!'
          })
          this.dataConfirmation = new MatTableDataSource(data);
          //localStorage.clear();
        } else {
          console.log("llena tabla data",data);
          this.dataConfirmation = new MatTableDataSource(data);
          this.dataConfirmation.paginator = this.paginator;
           //this.changeDetectorRefs.detectChanges();
          console.log("llena tabla confirmation",this.dataConfirmation);
        }

      },
      error => {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Problema Interno!'
        })
        console.log("Error", error);
        this.dataConfirmation = new MatTableDataSource();
        //localStorage.clear();
      });

  }

  applyFilter(filterValue: string) {
    this.dataConfirmation.filter = filterValue.trim().toLowerCase();
  }

  detalle(element) {
    console.log("Datos elemento para if", element)
    var fechaI = this.datePipe.transform(this.Confirmation.value.fechaIni,'yyyyMMdd');;
    var fechaF = this.datePipe.transform(this.Confirmation.value.fechaFin,'yyyyMMdd');
    var bandera = 1;
    var vEstatus = 'null';
    var RecordNumber = element.vRecordNumber;
    console.log("Datos COnsulta venta", fechaI, fechaF, bandera, vEstatus, RecordNumber)
    this.AquirerService.getConsultaVentaAMEX(fechaI, fechaF, bandera, vEstatus, RecordNumber)
    .subscribe(
      data2 => {
        console.log("getReporteGRRNC Request is successful ", data2);
        if (data2 == 0 ) {
          Swal.fire({
            icon: 'info',
            text: 'No hay datos!'
          })
        }
        else if(element.vEstatus=='REINYECTADO'){
          this.Detalle = data2;
           console.log("Prueba vRecordNumber",element);
           const dialogRef = this.dialog.open(venta, {
             data: {
               DetalleV: {
                 vRegLlave: this.Detalle[0].vRegLlave,
                 dtFechaProceso: this.datePipe.transform(this.Detalle[0].dtFechaProceso, 'yyyyMMdd'),
                 vTransId: this.Detalle[0].vTransId,
                 vNumAutoriza: this.Detalle[0].vNumAutoriza,
                 vNoPlastico: this.Detalle[0].vNoPlastico,
                 vFechaTxn: this.Detalle[0].vFechaTxn,
                 mImporteTxn: this.Detalle[0].mImporteTxn,
                 vHoraTxn: this.Detalle[0].vHoraTxn,
                 vCodTra: this.Detalle[0].vCodTra,
                 vTipoPlan: this.Detalle[0].vTipoPlan,
                 vProcCode: this.Detalle[0].vProcCode,
                 vTipoMoneda: this.Detalle[0].vTipoMoneda,
                 vParcializacion: this.Detalle[0].vParcializacion,
                 vIdGiro: this.Detalle[0].vIdGiro,
                 vNoAfiliacion: this.Detalle[0].vNoAfiliacion,
                 vNoAfiliacionAmex: this.Detalle[0].vNoAfiliacionAmex,
                 vRazonSocial: this.Detalle[0].vRazonSocial,
                 vCalleNo: this.Detalle[0].vCalleNo,
                 vCiudad: this.Detalle[0].vCiudad,
                 vCodEstado: this.Detalle[0].vCodEstado,
                 vCodPaisBr: this.Detalle[0].vCodPaisBr,
                 vCodPostal: this.Detalle[0].vCodPostal,
                 vPosData: this.Detalle[0].vPosData,
                 vEmisor: this.Detalle[0].vEmisor,
                 vAdquirente: this.Detalle[0].vAdquirente,
                 vIdUltimaMod: this.Detalle[0].vIdUltimaMod,
                 vdFechaUltimaMod: this.datePipe.transform(this.Detalle[0].vdFechaUltimaMod, 'yyyyMMdd'),
                 //dtFechaCarga: this.Detalle[0].dtFechaCarga,
                 //vEstatus: this.Detalle[0].vEstatus,
                 vCodClave: this.Detalle[0].vCodClave,
                 bandera: this.Detalle[0].bandera,
                 vCodDesc: this.Detalle[0].vCodDesc
               }, DetalleRR: {
                vRegLlave: this.Detalle[1].vRegLlave,
                dtFechaProceso: this.datePipe.transform(this.Detalle[1].dtFechaProceso, 'yyyyMMdd'),
                vTransId: this.Detalle[1].vTransId,
                vNumAutoriza: this.Detalle[1].vNumAutoriza,
                vNoPlastico: this.Detalle[1].vNoPlastico,
                vFechaTxn: this.Detalle[1].vFechaTxn,
                mImporteTxn: this.Detalle[1].mImporteTxn,
                vHoraTxn: this.Detalle[1].vHoraTxn,
                vCodTra: this.Detalle[1].vCodTra,
                vTipoPlan: this.Detalle[1].vTipoPlan,
                vProcCode: this.Detalle[1].vProcCode,
                vTipoMoneda: this.Detalle[1].vTipoMoneda,
                vParcializacion: this.Detalle[1].vParcializacion,
                vIdGiro: this.Detalle[1].vIdGiro,
                vNoAfiliacion: this.Detalle[1].vNoAfiliacion,
                vNoAfiliacionAmex: this.Detalle[1].vNoAfiliacionAmex,
                vRazonSocial: this.Detalle[1].vRazonSocial,
                vCalleNo: this.Detalle[1].vCalleNo,
                vCiudad: this.Detalle[1].vCiudad,
                vCodEstado: this.Detalle[1].vCodEstado,
                vCodPaisBr: this.Detalle[1].vCodPaisBr,
                vCodPostal: this.Detalle[1].vCodPostal,
                vPosData: this.Detalle[1].vPosData,
                vEmisor: this.Detalle[1].vEmisor,
                vAdquirente: this.Detalle[1].vAdquirente,
                vIdUltimaMod: this.Detalle[1].vIdUltimaMod,
                vdFechaUltimaMod: this.datePipe.transform(this.Detalle[1].vdFechaUltimaMod, 'yyyyMMdd'),
                //dtFechaCarga: this.Detalle[1].dtFechaCarga,
                //vEstatus: this.Detalle[1].vEstatus,
                vCodClave: this.Detalle[1].vCodClave,
                bandera: this.Detalle[1].bandera,
                vCodDesc: this.Detalle[1].vCodDesc
              },ConfirmationV: this.Confirmation.value,
               element,
               fechaactual:this.fechaactual
             }
           });
           }
        else if(element.vEstatus=='RECIBIDO'){
       this.Detalle = data2;
        console.log("Prueba vRecordNumber",element);
        const dialogRef = this.dialog.open(venta, {
          data: {
            DetalleV: {
              vRegLlave: this.Detalle[0].vRegLlave,
              dtFechaProceso: this.datePipe.transform(this.Detalle[0].dtFechaProceso, 'yyyyMMdd'),
              vTransId: this.Detalle[0].vTransId,
              vNumAutoriza: this.Detalle[0].vNumAutoriza,
              vNoPlastico: this.Detalle[0].vNoPlastico,
              vFechaTxn: this.Detalle[0].vFechaTxn,
              mImporteTxn: this.Detalle[0].mImporteTxn,
              vHoraTxn: this.Detalle[0].vHoraTxn,
              vCodTra: this.Detalle[0].vCodTra,
              vTipoPlan: this.Detalle[0].vTipoPlan,
              vProcCode: this.Detalle[0].vProcCode,
              vTipoMoneda: this.Detalle[0].vTipoMoneda,
              vParcializacion: this.Detalle[0].vParcializacion,
              vIdGiro: this.Detalle[0].vIdGiro,
              vNoAfiliacion: this.Detalle[0].vNoAfiliacion,
              vNoAfiliacionAmex: this.Detalle[0].vNoAfiliacionAmex,
              vRazonSocial: this.Detalle[0].vRazonSocial,
              vCalleNo: this.Detalle[0].vCalleNo,
              vCiudad: this.Detalle[0].vCiudad,
              vCodEstado: this.Detalle[0].vCodEstado,
              vCodPaisBr: this.Detalle[0].vCodPaisBr,
              vCodPostal: this.Detalle[0].vCodPostal,
              vPosData: this.Detalle[0].vPosData,
              vEmisor: this.Detalle[0].vEmisor,
              vAdquirente: this.Detalle[0].vAdquirente,
              vIdUltimaMod: this.Detalle[0].vIdUltimaMod,
              vdFechaUltimaMod: this.datePipe.transform(this.Detalle[0].vdFechaUltimaMod, 'yyyyMMdd'),
              //dtFechaCarga: this.Detalle[0].dtFechaCarga,
              //vEstatus: this.Detalle[0].vEstatus,
              vCodClave: this.Detalle[0].vCodClave,
              bandera: this.Detalle[0].bandera,
              vCodDesc: this.Detalle[0].vCodDesc
            },
            ConfirmationV: this.Confirmation.value,
            element,
            fechaactual:this.fechaactual
          }
        });
        }
        else if(element.vEstatus=='RECIBIDO - REINYECCION'){
          this.Detalle = data2;
        console.log("Prueba vRecordNumber",element);
        const dialogRef = this.dialog.open(venta, {
          data: {
            DetalleV: {
              vRegLlave: this.Detalle[0].vRegLlave,
              dtFechaProceso: this.datePipe.transform(this.Detalle[0].dtFechaProceso, 'yyyyMMdd'),
              vTransId: this.Detalle[0].vTransId,
              vNumAutoriza: this.Detalle[0].vNumAutoriza,
              vNoPlastico: this.Detalle[0].vNoPlastico,
              vFechaTxn: this.Detalle[0].vFechaTxn,
              mImporteTxn: this.Detalle[0].mImporteTxn,
              vHoraTxn: this.Detalle[0].vHoraTxn,
              vCodTra: this.Detalle[0].vCodTra,
              vTipoPlan: this.Detalle[0].vTipoPlan,
              vProcCode: this.Detalle[0].vProcCode,
              vTipoMoneda: this.Detalle[0].vTipoMoneda,
              vParcializacion: this.Detalle[0].vParcializacion,
              vIdGiro: this.Detalle[0].vIdGiro,
              vNoAfiliacion: this.Detalle[0].vNoAfiliacion,
              vNoAfiliacionAmex: this.Detalle[0].vNoAfiliacionAmex,
              vRazonSocial: this.Detalle[0].vRazonSocial,
              vCalleNo: this.Detalle[0].vCalleNo,
              vCiudad: this.Detalle[0].vCiudad,
              vCodEstado: this.Detalle[0].vCodEstado,
              vCodPaisBr: this.Detalle[0].vCodPaisBr,
              vCodPostal: this.Detalle[0].vCodPostal,
              vPosData: this.Detalle[0].vPosData,
              vEmisor: this.Detalle[0].vEmisor,
              vAdquirente: this.Detalle[0].vAdquirente,
              vIdUltimaMod: this.Detalle[0].vIdUltimaMod,
              vdFechaUltimaMod: this.datePipe.transform(this.Detalle[0].vdFechaUltimaMod, 'yyyyMMdd'),
              //dtFechaCarga: this.Detalle[0].dtFechaCarga,
              //vEstatus: this.Detalle[0].vEstatus,
              vCodClave: this.Detalle[0].vCodClave,
              bandera: this.Detalle[0].bandera,
              vCodDesc: this.Detalle[0].vCodDesc
            },
          DetalleRR: {
            vRegLlave: this.Detalle[1].vRegLlave,
            dtFechaProceso: this.datePipe.transform(this.Detalle[1].dtFechaProceso, 'yyyyMMdd'),
            vTransId: this.Detalle[1].vTransId,
            vNumAutoriza: this.Detalle[1].vNumAutoriza,
            vNoPlastico: this.Detalle[1].vNoPlastico,
            vFechaTxn: this.Detalle[1].vFechaTxn,
            mImporteTxn: this.Detalle[1].mImporteTxn,
            vHoraTxn: this.Detalle[1].vHoraTxn,
            vCodTra: this.Detalle[1].vCodTra,
            vTipoPlan: this.Detalle[1].vTipoPlan,
            vProcCode: this.Detalle[1].vProcCode,
            vTipoMoneda: this.Detalle[1].vTipoMoneda,
            vParcializacion: this.Detalle[1].vParcializacion,
            vIdGiro: this.Detalle[1].vIdGiro,
            vNoAfiliacion: this.Detalle[1].vNoAfiliacion,
            vNoAfiliacionAmex: this.Detalle[1].vNoAfiliacionAmex,
            vRazonSocial: this.Detalle[1].vRazonSocial,
            vCalleNo: this.Detalle[1].vCalleNo,
            vCiudad: this.Detalle[1].vCiudad,
            vCodEstado: this.Detalle[1].vCodEstado,
            vCodPaisBr: this.Detalle[1].vCodPaisBr,
            vCodPostal: this.Detalle[1].vCodPostal,
            vPosData: this.Detalle[1].vPosData,
            vEmisor: this.Detalle[1].vEmisor,
            vAdquirente: this.Detalle[1].vAdquirente,
            vIdUltimaMod: this.Detalle[1].vIdUltimaMod,
            vdFechaUltimaMod: this.datePipe.transform(this.Detalle[1].vdFechaUltimaMod, 'yyyyMMdd'),
            //dtFechaCarga: this.Detalle[1].dtFechaCarga,
            //vEstatus: this.Detalle[1].vEstatus,
            vCodClave: this.Detalle[1].vCodClave,
            bandera: this.Detalle[1].bandera,
            vCodDesc: this.Detalle[1].vCodDesc
          },ConfirmationV: this.Confirmation.value,
          element,
          fechaactual:this.fechaactual
        }
      });
      
      }
      else if(element.vEstatus=='ABONO'||element.vEstatus=='CARGO' ){

        this.Detalle = data2;
        console.log("Prueba vRecordNumber",element);
        const dialogRef = this.dialog.open(venta, {
          data: {
            DetalleV: {
              vRegLlave: this.Detalle[0].vRegLlave,
              dtFechaProceso: this.datePipe.transform(this.Detalle[0].dtFechaProceso, 'yyyyMMdd'),
              vTransId: this.Detalle[0].vTransId,
              vNumAutoriza: this.Detalle[0].vNumAutoriza,
              vNoPlastico: this.Detalle[0].vNoPlastico,
              vFechaTxn: this.Detalle[0].vFechaTxn,
              mImporteTxn: this.Detalle[0].mImporteTxn,
              vHoraTxn: this.Detalle[0].vHoraTxn,
              vCodTra: this.Detalle[0].vCodTra,
              vTipoPlan: this.Detalle[0].vTipoPlan,
              vProcCode: this.Detalle[0].vProcCode,
              vTipoMoneda: this.Detalle[0].vTipoMoneda,
              vParcializacion: this.Detalle[0].vParcializacion,
              vIdGiro: this.Detalle[0].vIdGiro,
              vNoAfiliacion: this.Detalle[0].vNoAfiliacion,
              vNoAfiliacionAmex: this.Detalle[0].vNoAfiliacionAmex,
              vRazonSocial: this.Detalle[0].vRazonSocial,
              vCalleNo: this.Detalle[0].vCalleNo,
              vCiudad: this.Detalle[0].vCiudad,
              vCodEstado: this.Detalle[0].vCodEstado,
              vCodPaisBr: this.Detalle[0].vCodPaisBr,
              vCodPostal: this.Detalle[0].vCodPostal,
              vPosData: this.Detalle[0].vPosData,
              vEmisor: this.Detalle[0].vEmisor,
              vAdquirente: this.Detalle[0].vAdquirente,
              vIdUltimaMod: this.Detalle[0].vIdUltimaMod,
              vdFechaUltimaMod: this.datePipe.transform(this.Detalle[0].vdFechaUltimaMod, 'yyyyMMdd'),
              //dtFechaCarga: this.Detalle[0].dtFechaCarga,
              //vEstatus: this.Detalle[0].vEstatus,
              vCodClave: this.Detalle[0].vCodClave,
              bandera: this.Detalle[0].bandera,
              vCodDesc: this.Detalle[0].vCodDesc
            },
            DetalleCarga: {
              dtFechaCarga: this.datePipe.transform(this.Detalle[1].dtFechaCarga,'yyyyMMdd'),
              vNoAfiliacion: this.Detalle[1].vNoAfiliacion,
              vAutorizacion: this.Detalle[1].vAutorizacion,
              vNoPlastico: this.Detalle[1].vNoPlastico,
              mImporteTxn: this.Detalle[1].mImporteTxn,
              estatusAMEX: this.Detalle[1].estatusAMEX,
              codigoError: this.Detalle[1].codigoError,
              descripcionError: this.Detalle[1].descripcionError,
              vMovimiento: this.Detalle[1].vMovimiento,
              vArea: this.Detalle[1].vArea,
              vProceso: this.Detalle[1].vProceso,
              vLeyenda: this.Detalle[1].vLeyenda,
              vDivisa: this.Detalle[1].vDivisa,
              vCobro: this.Detalle[1].vCobro,
              vEmisor: this.Detalle[1].vEmisor,
              vAdquirente: this.Detalle[1].vAdquirente,
              vRecNumberEgl:this.Detalle[1].vRecNumberEgl,
              piBandera:1,
              vUsoBanClave:this.Detalle[1].vUsoBanClave,
            },

            ConfirmationV: this.Confirmation.value,
            element,
            fechaactual:this.fechaactual


          }
        });
        }
      else if(element.vEstatus=='RECIBIDO - ABONO'||element.vEstatus=='RECIBIDO - CARGO' ){

        this.Detalle = data2;
        console.log("Prueba vRecordNumber",element);
        const dialogRef = this.dialog.open(venta, {
          data: {
            DetalleV: {
              vRegLlave: this.Detalle[0].vRegLlave,
              dtFechaProceso: this.datePipe.transform(this.Detalle[0].dtFechaProceso, 'yyyyMMdd'),
              vTransId: this.Detalle[0].vTransId,
              vNumAutoriza: this.Detalle[0].vNumAutoriza,
              vNoPlastico: this.Detalle[0].vNoPlastico,
              vFechaTxn: this.Detalle[0].vFechaTxn,
              mImporteTxn: this.Detalle[0].mImporteTxn,
              vHoraTxn: this.Detalle[0].vHoraTxn,
              vCodTra: this.Detalle[0].vCodTra,
              vTipoPlan: this.Detalle[0].vTipoPlan,
              vProcCode: this.Detalle[0].vProcCode,
              vTipoMoneda: this.Detalle[0].vTipoMoneda,
              vParcializacion: this.Detalle[0].vParcializacion,
              vIdGiro: this.Detalle[0].vIdGiro,
              vNoAfiliacion: this.Detalle[0].vNoAfiliacion,
              vNoAfiliacionAmex: this.Detalle[0].vNoAfiliacionAmex,
              vRazonSocial: this.Detalle[0].vRazonSocial,
              vCalleNo: this.Detalle[0].vCalleNo,
              vCiudad: this.Detalle[0].vCiudad,
              vCodEstado: this.Detalle[0].vCodEstado,
              vCodPaisBr: this.Detalle[0].vCodPaisBr,
              vCodPostal: this.Detalle[0].vCodPostal,
              vPosData: this.Detalle[0].vPosData,
              vEmisor: this.Detalle[0].vEmisor,
              vAdquirente: this.Detalle[0].vAdquirente,
              vIdUltimaMod: this.Detalle[0].vIdUltimaMod,
              vdFechaUltimaMod: this.datePipe.transform(this.Detalle[0].vdFechaUltimaMod, 'yyyyMMdd'),
              //dtFechaCarga: this.Detalle[0].dtFechaCarga,
              //vEstatus: this.Detalle[0].vEstatus,
              vCodClave: this.Detalle[0].vCodClave,
              bandera: this.Detalle[0].bandera,
              vCodDesc: this.Detalle[0].vCodDesc
            },
            DetalleCarga: {
              dtFechaCarga: this.datePipe.transform(this.Detalle[1].dtFechaCarga,'yyyyMMdd'),
              vNoAfiliacion: this.Detalle[1].vNoAfiliacion,
              vAutorizacion: this.Detalle[1].vAutorizacion,
              vNoPlastico: this.Detalle[1].vNoPlastico,
              mImporteTxn: this.Detalle[1].mImporteTxn,
              estatusAMEX: this.Detalle[1].estatusAMEX,
              codigoError: this.Detalle[1].codigoError,
              descripcionError: this.Detalle[1].descripcionError,
              vMovimiento: this.Detalle[1].vMovimiento,
              vArea: this.Detalle[1].vArea,
              vProceso: this.Detalle[1].vProceso,
              vLeyenda: this.Detalle[1].vLeyenda,
              vDivisa: this.Detalle[1].vDivisa,
              vCobro: this.Detalle[1].vCobro,
              vEmisor: this.Detalle[1].vEmisor,
              vAdquirente: this.Detalle[1].vAdquirente,
              vRecNumberEgl:this.Detalle[1].vRecNumberEgl,
              piBandera:1,
              vUsoBanClave:this.Detalle[1].vUsoBanClave,
            },

            ConfirmationV: this.Confirmation.value,
            element,
            fechaactual:this.fechaactual


          }
        });
        }
        

      },
      error => {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Problema Interno!'
        })
        console.log("Error", error);
      }

      );

  }

  detallereinyeecion(element) {
    var fechaI = this.Confirmation.value.fechaIni;
    var fechaF = this.Confirmation.value.fechaFin;
    var bandera = 1;
    var vEstatus = 'null';
    var RecordNumber = element.vRecordNumber;
    console.log("aqui va el datasource ", this.dataConfirmation)
    this.AquirerService.getConsultaVentaAMEX(fechaI, fechaF, bandera, vEstatus, RecordNumber)
    .subscribe(
      data3 => {
        console.log("data 3", data3);
        this.Detalle = data3;
        const dialogRef = this.dialog.open(reinyeccion, {
          data: {

            vRegLlave: this.Detalle[0].vRegLlave,
            dtFechaProceso: this.datePipe.transform(this.Detalle[0].dtFechaProceso, 'yyyyMMdd'),
            vTransId: this.Detalle[0].vTransId,
            vNumAutoriza: this.Detalle[0].vNumAutoriza,
            vNoPlastico: this.Detalle[0].vNoPlastico,
            vFechaTxn: this.Detalle[0].vFechaTxn,
            mImporteTxn: this.Detalle[0].mImporteTxn,
            vHoraTxn: this.Detalle[0].vHoraTxn,
            vCodTra: this.Detalle[0].vCodTra,
            vTipoPlan: this.Detalle[0].vTipoPlan,
            vProcCode: this.Detalle[0].vProcCode,
            vTipoMoneda: this.Detalle[0].vTipoMoneda,
            vParcializacion: this.Detalle[0].vParcializacion,
            vIdGiro: this.Detalle[0].vIdGiro,
            vNoAfiliacion: this.Detalle[0].vNoAfiliacion,
            vNoAfiliacionAmex: this.Detalle[0].vNoAfiliacionAmex,
            vRazonSocial: this.Detalle[0].vRazonSocial,
            vCalleNo: this.Detalle[0].vCalleNo,
            vCiudad: this.Detalle[0].vCiudad,
            vCodEstado: this.Detalle[0].vCodEstado,
            vCodPaisBr: this.Detalle[0].vCodPaisBr,
            vCodPostal: this.Detalle[0].vCodPostal,
            vPosData: this.Detalle[0].vPosData,
            vEmisor: this.Detalle[0].vEmisor,
            vAdquirente: this.Detalle[0].vAdquirente,
            iBandera: 2,
            vCodDesc: this.Detalle[0].vCodDesc,
            vEstatus: this.Detalle[0].vEstatus,
            //vIdUltimaMod: this.Detalle[0].vIdUltimaMod,
            //vdFechaUltimaMod:  this.datePipe.transform(this.Detalle[0].vdFechaUltimaMod, 'yyyyMMdd'),
            //dtFechaCarga: this.Detalle[0].dtFechaCarga,
            //vEstatus: this.Detalle[0].vEstatus }
          }
        });
      },
      error => {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Problema Interno!'
        })
        console.log("Error", error);
      });
  }
  exportexcel(Confirmation): void {
    {
    var fechaIni = !this.Confirmation.value.fechaIni ? this.fechaactual.value : this.Confirmation.value.fechaIni;
    var fechaFin = !this.Confirmation.value.fechaFin ? this.fechaactual.value : this.Confirmation.value.fechaFin;
    var fechaEstatus = this.Confirmation.value.fechaEstatus;
    var tipoRegistro= this.Confirmation.value.tipoRegistro;
    // this.Confirmation.value.fechaIni = this.datePipe.transform(fechaI, 'yyyyMMdd');
    // this.Confirmation.value.fechaFin = this.datePipe.transform(fechaF, 'yyyyMMdd');
    fechaIni = this.datePipe.transform(fechaIni, 'yyyyMMdd');
    fechaFin = this.datePipe.transform(fechaFin, 'yyyyMMdd');
  
    fechaEstatus = this.datePipe.transform(fechaEstatus, 'yyyyMMdd');
    var bandera = 3;
    var codigoError = this.Confirmation.value.codigoError;
    var estatus = this.Confirmation.value.estatus;

      //this.Confirmation.value.bandera = 3;
      this.AquirerService.getConfirmationReport(fechaIni,fechaFin,tipoRegistro,bandera,codigoError,estatus,fechaEstatus).subscribe(responseV => {
        var bandera = 2;
        var fechaI = this.Confirmation.value.fechaIni;
        var fechaF = this.Confirmation.value.fechaFin;
        var element = 'null';
        var codigoError = this.Confirmation.value.codigoError;
        var estatus = this.Confirmation.value.tipoRegistro;
        var tipoRegistro = this.Confirmation.value.tipoRegistro;

        this.AquirerService.getObtenerCargoAbono(bandera, fechaI, element, codigoError, estatus, tipoRegistro).subscribe(responseCA => {
          bandera = 4;
          estatus = "RR";
          this.AquirerService.getConfirmationReport(fechaIni,fechaFin,tipoRegistro,bandera,codigoError,estatus,fechaEstatus).subscribe(responseRY => {
            // console.log("Datos RR",responseRY);
            this.dataERY = responseRY;
            this.dataECA = responseCA;
            this.dataEC = responseV;
            this.dataE = new MatTableDataSource<RConfReportDTO[]>();
            this.dataE = this.dataConfirmation;
            console.log("Excel COnfirmation", this.dataE);
            const ws1: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataE.filteredData, { header: ['vRecordNumber', 'vNoPlastico', 'mImporteTxn', 'vNumAutoriza', 'vNoAfiliacion', 'numRegistro', 'c_emi_nombre', 'c_adq_nombre', 'vEstatus', 'vFechaEstatus', 'codigoError', 'tipoRechazo'] });
            const ws2: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataEC, { header: ['vRecNumberEgl', 'vRegLlave', 'dtFechaProceso', 'vTransId', 'vNumAutoriza', 'vNoPlastico', 'vFechaTxn', 'mImporteTxn', 'vHoraTxn', 'vCodTra', 'vTipoPlan', 'vProcCode', 'vTipoMoneda', 'vParcializacion', 'vIdGiro', 'vNoAfiliacion', 'vRazonSocial', 'vCalleNo', 'vCiudad', 'vCodEstado', 'vCodPaisBr', 'vCodPostal', 'vPosData', 'c_emi_nombre', 'c_adq_nombre', 'vIdUltimaMod', 'vdFechaUltimaMod', 'vCodClave', 'vCodDesc', 'bandera'] });
            const ws3: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataECA, { header: ['vRecNumberEgl', 'estatusAMEX', 'dtFechaCarga', 'vNoAfiliacion', 'vAutorizacion', 'vNoPlastico', 'mImporteTxn', 'codigoError', 'descripcionError', 'vArea', 'vMovimiento', 'vProceso', 'vLeyenda', 'vDivisa', 'vCobro', 'vUsoBanClave', 'vEmisor', 'vAdquirente'] });
            const ws4: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataERY, { header: ['vRecNumberEgl', 'vStatusNombre', 'vRegLlave', 'dtFechaProceso', 'vTransId', 'vNumAutoriza', 'vNoPlastico', 'vFechaTxn', 'mImporteTxn', 'vHoraTxn', 'vCodTra', 'vTipoPlan', 'vProcCode', 'vTipoMoneda', 'vParcializacion', 'vIdGiro', 'vNoAfiliacion', 'vNoAfiliacionAmex', 'vRazonSocial', 'vCalleNo', 'vCiudad', 'vCodEstado', 'vCodPaisBr', 'vCodPostal', 'vPosData', 'c_emi_nombre', 'c_adq_nombre', 'vIdUltimaMod', 'vdFechaUltimaMod', 'vCodClave', 'vCodDesc', 'bandera'] });
            const wb: XLSX.WorkBook = XLSX.utils.book_new();
            XLSX.utils.sheet_add_json(ws1, [{ A1: "ID Rechazo" },],
              { header: ["A1"], skipHeader: true, origin: "A1" });
            XLSX.utils.sheet_add_json(ws1, [{ B1: "Número de Tarjeta" },],
              { header: ["B1"], skipHeader: true, origin: "B1" });
            XLSX.utils.sheet_add_json(ws1, [{ C1: "Importe de Transacción" },],
              { header: ["C1"], skipHeader: true, origin: "C1" });
            XLSX.utils.sheet_add_json(ws1, [{ D1: "Número de Autorización" },],
              { header: ["D1"], skipHeader: true, origin: "D1" });
            XLSX.utils.sheet_add_json(ws1, [{ E1: "Número de Afiliación" },],
              { header: ["E1"], skipHeader: true, origin: "E1" });
            XLSX.utils.sheet_add_json(ws1, [{ F1: "Número de Registro" },],
              { header: ["F1"], skipHeader: true, origin: "F1" });
            XLSX.utils.sheet_add_json(ws1, [{ G1: "Emisor" },],
              { header: ["G1"], skipHeader: true, origin: "G1" });
            XLSX.utils.sheet_add_json(ws1, [{ H1: "Adquirente" },],
              { header: ["H1"], skipHeader: true, origin: "H1" });
            XLSX.utils.sheet_add_json(ws1, [{ I1: "Estatus" },],
              { header: ["I1"], skipHeader: true, origin: "I1" });
            XLSX.utils.sheet_add_json(ws1, [{ J1: "Fecha de Estatus" },],
              { header: ["J1"], skipHeader: true, origin: "J1" });
            XLSX.utils.sheet_add_json(ws1, [{ K1: "Código de Error" },],
              { header: ["K1"], skipHeader: true, origin: "K1" });
            XLSX.utils.sheet_add_json(ws1, [{ L1: "Tipo de Rechazo" },],
              { header: ["L1"], skipHeader: true, origin: "L1" });


            XLSX.utils.book_append_sheet(wb, ws1, 'Rechazos');
            //////////////libro Detalle////////////////////////////////

            XLSX.utils.sheet_add_json(ws2, [{ A1: "Id Rechazo" },],
              { header: ["A1"], skipHeader: true, origin: "A1" });
            XLSX.utils.sheet_add_json(ws2, [{ B1: "Número de Registro" },],
              { header: ["B1"], skipHeader: true, origin: "B1" });
            XLSX.utils.sheet_add_json(ws2, [{ C1: "Fecha Proceso" },],
              { header: ["C1"], skipHeader: true, origin: "C1" });
            XLSX.utils.sheet_add_json(ws2, [{ D1: "Id Transacción" },],
              { header: ["D1"], skipHeader: true, origin: "D1" });
            XLSX.utils.sheet_add_json(ws2, [{ E1: "Número de Autorización" },],
              { header: ["E1"], skipHeader: true, origin: "E1" });
            XLSX.utils.sheet_add_json(ws2, [{ F1: "Número de Tarjeta" },],
              { header: ["F1"], skipHeader: true, origin: "F1" });
            XLSX.utils.sheet_add_json(ws2, [{ G1: "Fecha Transacción" },],
              { header: ["G1"], skipHeader: true, origin: "G1" });
            XLSX.utils.sheet_add_json(ws2, [{ H1: "Importe Transacción" },],
              { header: ["H1"], skipHeader: true, origin: "H1" });
            XLSX.utils.sheet_add_json(ws2, [{ I1: "Hora Transacción" },],
              { header: ["I1"], skipHeader: true, origin: "I1" });
            XLSX.utils.sheet_add_json(ws2, [{ J1: "Código Transacción" },],
              { header: ["J1"], skipHeader: true, origin: "J1" });
            XLSX.utils.sheet_add_json(ws2, [{ K1: "Tipo de Plan" },],
              { header: ["K1"], skipHeader: true, origin: "K1" });
            XLSX.utils.sheet_add_json(ws2, [{ L1: "Código de Proceso" },],
              { header: ["L1"], skipHeader: true, origin: "L1" });
            XLSX.utils.sheet_add_json(ws2, [{ M1: "Tipo Moneda" },],
              { header: ["M1"], skipHeader: true, origin: "M1" });
            XLSX.utils.sheet_add_json(ws2, [{ N1: "Parcialización" },],
              { header: ["N1"], skipHeader: true, origin: "N1" });
            XLSX.utils.sheet_add_json(ws2, [{ O1: "Giro" },],
              { header: ["O1"], skipHeader: true, origin: "O1" });
            XLSX.utils.sheet_add_json(ws2, [{ P1: "Número Afiliación" },],
              { header: ["P1"], skipHeader: true, origin: "P1" });
            XLSX.utils.sheet_add_json(ws2, [{ Q1: "Razon Social" },],
              { header: ["Q1"], skipHeader: true, origin: "Q1" });
            XLSX.utils.sheet_add_json(ws2, [{ R1: "Número de Calle" },],
              { header: ["R1"], skipHeader: true, origin: "R1" });
            XLSX.utils.sheet_add_json(ws2, [{ S1: "Ciudad" },],
              { header: ["S1"], skipHeader: true, origin: "S1" });
            XLSX.utils.sheet_add_json(ws2, [{ T1: "Código de Estado" },],
              { header: ["T1"], skipHeader: true, origin: "T1" });
            XLSX.utils.sheet_add_json(ws2, [{ U1: "Código País" },],
              { header: ["U1"], skipHeader: true, origin: "U1" });
            XLSX.utils.sheet_add_json(ws2, [{ V1: "Código Postal" },],
              { header: ["V1"], skipHeader: true, origin: "V1" });
            XLSX.utils.sheet_add_json(ws2, [{ W1: "Pos Data" },],
              { header: ["W1"], skipHeader: true, origin: "W1" });
            XLSX.utils.sheet_add_json(ws2, [{ X1: "Emisor" },],
              { header: ["X1"], skipHeader: true, origin: "X1" });
            XLSX.utils.sheet_add_json(ws2, [{ Y1: "Adquirente" },],
              { header: ["Y1"], skipHeader: true, origin: "Y1" });
            XLSX.utils.sheet_add_json(ws2, [{ Z1: "Última Modificación" },],
              { header: ["Z1"], skipHeader: true, origin: "Z1" });
            XLSX.utils.sheet_add_json(ws2, [{ AA1: "Última Fecha Modificación" },],
              { header: ["AA1"], skipHeader: true, origin: "AA1" });
            XLSX.utils.sheet_add_json(ws2, [{ AB1: "Código Clave" },],
              { header: ["AB1"], skipHeader: true, origin: "AB1" });
            XLSX.utils.sheet_add_json(ws2, [{ AC1: "Código Descripción" },],
              { header: ["AC1"], skipHeader: true, origin: "AC1" });
            XLSX.utils.sheet_add_json(ws2, [{ AD1: "Bandera" },],
              { header: ["AD1"], skipHeader: true, origin: "AD1" });

            XLSX.utils.book_append_sheet(wb, ws2, 'Detalle del Rechazo');

            //////////////////RECIBIDO REINYECTADO/////////////////////////////

            XLSX.utils.sheet_add_json(ws4, [{ A1: "Id Rechazo" },],
              { header: ["A1"], skipHeader: true, origin: "A1" });
            XLSX.utils.sheet_add_json(ws4, [{ B1: "Estatus" },],
              { header: ["B1"], skipHeader: true, origin: "B1" });
            XLSX.utils.sheet_add_json(ws4, [{ C1: "Número de Registro" },],
              { header: ["C1"], skipHeader: true, origin: "C1" });
            XLSX.utils.sheet_add_json(ws4, [{ D1: "Fecha de proceso" },],
              { header: ["D1"], skipHeader: true, origin: "D1" });
            XLSX.utils.sheet_add_json(ws4, [{ E1: "Id Transacción" },],
              { header: ["E1"], skipHeader: true, origin: "E1" });
            XLSX.utils.sheet_add_json(ws4, [{ F1: "Número de Autorización" },],
              { header: ["F1"], skipHeader: true, origin: "F1" });
            XLSX.utils.sheet_add_json(ws4, [{ G1: "Número de Tarjeta" },],
              { header: ["G1"], skipHeader: true, origin: "G1" });
            XLSX.utils.sheet_add_json(ws4, [{ H1: "Fecha Transacción" },],
              { header: ["H1"], skipHeader: true, origin: "H1" });
            XLSX.utils.sheet_add_json(ws4, [{ I1: "Importe de Transacción" },],
              { header: ["I1"], skipHeader: true, origin: "I1" });
            XLSX.utils.sheet_add_json(ws4, [{ J1: "Hora Transacción" },],
              { header: ["J1"], skipHeader: true, origin: "J1" });
            XLSX.utils.sheet_add_json(ws4, [{ K1: "Código de Transacción" },],
              { header: ["K1"], skipHeader: true, origin: "K1" });
            XLSX.utils.sheet_add_json(ws4, [{ L1: "Tipo de Plan" },],
              { header: ["L1"], skipHeader: true, origin: "L1" });
            XLSX.utils.sheet_add_json(ws4, [{ M1: "Código de Proceso" },],
              { header: ["M1"], skipHeader: true, origin: "M1" });
            XLSX.utils.sheet_add_json(ws4, [{ N1: "Tipo Moneda" },],
              { header: ["N1"], skipHeader: true, origin: "N1" });
            XLSX.utils.sheet_add_json(ws4, [{ O1: "Parcialización" },],
              { header: ["O1"], skipHeader: true, origin: "O1" });
            XLSX.utils.sheet_add_json(ws4, [{ P1: "Giro" },],
              { header: ["P1"], skipHeader: true, origin: "P1" });
            XLSX.utils.sheet_add_json(ws4, [{ Q1: "Número Afiliación" },],
              { header: ["Q1"], skipHeader: true, origin: "Q1" });

            XLSX.utils.sheet_add_json(ws4, [{ R1: "Número Afiliación AMEX" },],
              { header: ["R1"], skipHeader: true, origin: "R1" });
            XLSX.utils.sheet_add_json(ws4, [{ S1: "Razon Social" },],
              { header: ["S1"], skipHeader: true, origin: "S1" });
            XLSX.utils.sheet_add_json(ws4, [{ T1: "Número de Calle" },],
              { header: ["T1"], skipHeader: true, origin: "T1" });
            XLSX.utils.sheet_add_json(ws4, [{ U1: "Ciudad" },],
              { header: ["U1"], skipHeader: true, origin: "U1" });
            XLSX.utils.sheet_add_json(ws4, [{ V1: "Código de Estado" },],
              { header: ["V1"], skipHeader: true, origin: "V1" });
            XLSX.utils.sheet_add_json(ws4, [{ W1: "Código de País" },],
              { header: ["W1"], skipHeader: true, origin: "W1" });
            XLSX.utils.sheet_add_json(ws4, [{ X1: "Código Postal" },],
              { header: ["X1"], skipHeader: true, origin: "X1" });
            XLSX.utils.sheet_add_json(ws4, [{ Y1: "Pos Data" },],
              { header: ["Y1"], skipHeader: true, origin: "Y1" });
            XLSX.utils.sheet_add_json(ws4, [{ Z1: "Emisor" },],
              { header: ["Z1"], skipHeader: true, origin: "Z1" });
            XLSX.utils.sheet_add_json(ws4, [{ AA1: "Adquirente" },],
              { header: ["AA1"], skipHeader: true, origin: "AA1" });
            XLSX.utils.sheet_add_json(ws4, [{ AB1: "Ultima Modificación" },],
              { header: ["AB1"], skipHeader: true, origin: "AB1" });
            XLSX.utils.sheet_add_json(ws4, [{ AC1: "Fecha de última Modificación" },],
              { header: ["AC1"], skipHeader: true, origin: "AC1" });
            XLSX.utils.sheet_add_json(ws4, [{ AD1: "Código Clave" },],
              { header: ["AD1"], skipHeader: true, origin: "AD1" });
            XLSX.utils.sheet_add_json(ws4, [{ AE1: "Código Descripción" },],
              { header: ["AE1"], skipHeader: true, origin: "AE1" });
            XLSX.utils.sheet_add_json(ws4, [{ AF1: "Bandera" },], 
              { header: ["AF1"], skipHeader: true, origin: "AF1" });

            XLSX.utils.book_append_sheet(wb, ws4, 'Recibido-Reinyectado');

            ///////////////////////////////////////////////////////////////////

            XLSX.utils.sheet_add_json(ws3, [{ A1: "Id Rechazo" },],
              { header: ["A1"], skipHeader: true, origin: "A1" });
            XLSX.utils.sheet_add_json(ws3, [{ B1: "Estatus" },],
              { header: ["B1"], skipHeader: true, origin: "B1" });
            XLSX.utils.sheet_add_json(ws3, [{ C1: "Fecha de Registro" },],
              { header: ["C1"], skipHeader: true, origin: "C1" });
            XLSX.utils.sheet_add_json(ws3, [{ D1: "Número Afiliación" },],
              { header: ["D1"], skipHeader: true, origin: "D1" });
            XLSX.utils.sheet_add_json(ws3, [{ E1: "Número de Autorización" },],
              { header: ["E1"], skipHeader: true, origin: "E1" });
            XLSX.utils.sheet_add_json(ws3, [{ F1: "Número de Cuenta" },],
              { header: ["F1"], skipHeader: true, origin: "F1" });
            XLSX.utils.sheet_add_json(ws3, [{ G1: "Importe" },],
              { header: ["G1"], skipHeader: true, origin: "G1" });
            XLSX.utils.sheet_add_json(ws3, [{ H1: "Código de Error" },],
              { header: ["H1"], skipHeader: true, origin: "H1" });
            XLSX.utils.sheet_add_json(ws3, [{ I1: "Descripción de Error " },],
              { header: ["I1"], skipHeader: true, origin: "I1" });
            XLSX.utils.sheet_add_json(ws3, [{ J1: "Área" },],
              { header: ["J1"], skipHeader: true, origin: "J1" });
            XLSX.utils.sheet_add_json(ws3, [{ K1: "Movimiento" },],
              { header: ["K1"], skipHeader: true, origin: "K1" });
            XLSX.utils.sheet_add_json(ws3, [{ L1: "Proceso" },],
              { header: ["L1"], skipHeader: true, origin: "L1" });
            XLSX.utils.sheet_add_json(ws3, [{ M1: "Leyenda" },],
              { header: ["M1"], skipHeader: true, origin: "M1" });
            XLSX.utils.sheet_add_json(ws3, [{ N1: "Divisa" },],
              { header: ["N1"], skipHeader: true, origin: "N1" });
            XLSX.utils.sheet_add_json(ws3, [{ O1: "Cobro" },],
              { header: ["O1"], skipHeader: true, origin: "O1" });
            XLSX.utils.sheet_add_json(ws3, [{ P1: "Uso Banco" },],
              { header: ["P1"], skipHeader: true, origin: "P1" });
            XLSX.utils.sheet_add_json(ws3, [{ Q1: "Emisor" },],
              { header: ["Q1"], skipHeader: true, origin: "Q1" });
            XLSX.utils.sheet_add_json(ws3, [{ R1: "Adquirente" },],
              { header: ["R1"], skipHeader: true, origin: "R1" });
            XLSX.utils.book_append_sheet(wb, ws3, 'Cargo-Abono');

            var nombre= "Reporte-Rechazos-BBVA"+ "-"+fechaI;
            XLSX.writeFile(wb, nombre+'.xlsx');
          });
});
});
}
}
}
@Component({
  selector: 'app-confirmation-report',
  templateUrl: 'venta.html',
  styleUrls: ['./confirmation-report.component.css'],

})
export class venta {
  DetalleCargoAbono: any;
  Detalle: any;
  Area: any;
  Movimiento: any;
  Proceso: any;
  Leyenda: any;
  Divisa: any;
  Cobro: any;
  dataD: any;
  constructor(
    public dialogRef: MatDialogRef<venta>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(CommonModule) public CommonModule,
    private formBuilder: FormBuilder,
    @Inject(AquirerService) public AquirerService,
    @Inject(DatePipe) public datePipe,
    public dialog: MatDialog
    ) { }
  openCargoAbono(registro) {
    //this.detalle(registro);
    this.detallecargoabono(registro);
    //this.dialog.open(cargoabono);
  }
  openReinyeccion(registro) {
    this.detallereinyeecion(registro);
    //this.dialog.open(reinyeccion);
  }
  botonRecordNumber: boolean = true;
  botonReinyeccion: boolean = true;
  botonCargoAbono: boolean = true;



  dataDetalle = new MatTableDataSource<Detalle>();
  ngOnInit() {
    this.DetalleCargoAbono = this.formBuilder.group({
      dtFechaCarga: [''],
      vNoAfiliacion: [''],
      vAutorizacion: [''],
      vNoPlastico: [''],
      mImporteTxn: [''],
      estatusAMEX: [''],
      codigoError: [''],
      descripcionError: [''],
      vArea: 0,
      vMovimiento: [''],
      vProceso: 0,
      vLeyenda: 0,
      vDivisa: [],
      vCobro: [''],
      vEmisor: [''],
      vAdquirente: ['']
    });
    this.Detalle = this.formBuilder.group({
      dtFechaProceso: [''],
      vRegLlave: [''],
      vTransId: [''],
      vNumAutoriza: [''],
      vNoPlastico: [''],
      vFechaTxn: [''],
      mImporteTxn: [''],
      vHoraTxn: [''],
      vCodTra: [''],
      vTipoPlan: [''],
      vProcCode: [''],
      vTipoMoneda: [''],
      vParcializacion: [''],
      vIdGiro: [''],
      vNoAfiliacion: [''],
      vNoAfiliacionAmex: [''],
      vRazonSocial: [''],
      vCalleNo: [''],
      vCiudad: [''],
      vCodEstado: [''],
      vCodPaisBr: [''],
      vCodPostal: [''],
      vPosData: [''],
      vEmisor: [''],
      vAdquirente: [''],
      vIdUltimaMod: [''],
      vdFechaUltimaMod: [''],
      dtFechaCarga: [''],
      vEstatus: [''],
      vCodClave: [''],
      iBandera: [''],
      vCodDesc: ['']
    });


    console.log("prueba detalle Confirmation", this.data.ConfirmationV.estatus);
    // console.log("prueba Confirmation", this.data.fechaIni);
    console.log("Primer IF");
    if (this.data.ConfirmationV.estatus == 'RR') {
      this.botonCargoAbono = false;
    } else if ((this.data.ConfirmationV.estatus == 'RA,RG') ) {
      this.botonReinyeccion = false;
    }
  }



  exceldetalle(): void {
    {
      //console.log('prueba detalle')
      // this.datePipe.transform(fechaI, 'yyyyMMdd');
      // var fechaI=this.datePipe.transform(this.data.ConfirmationV.fechaIni, 'yyyyMMdd');
      // console.log("excel22",this.data.DetalleV)
      // this.dataD = this.data.DetalleV;
      // const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataD.filteredData);

      this.dataDetalle.data.push(this.data.DetalleV);
      console.log("excel",this.dataD)
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataDetalle.data);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'Detalle de venta');
      var nombre= "Detalle Rechazo-BBVA-"+this.data.ConfirmationV.fechaIni;
            XLSX.writeFile(wb, nombre+'.xlsx');
     
    }
  }
  detallecargoabono(data) {
    
    console.log("IF en modal CA",this.data.element)
    if (this.data.element.vEstatus=='RECIBIDO') {
      var fechaactual=this.data.fechaactual;
      var ConfirmationCA = this.data.ConfirmationV;
      var fechaI = this.datePipe.transform(data.element.vFechaEstatus,'yyyyMMdd');
      var element = this.data.element.vRecordNumber;
      var elementD=this.data.element;
      var bandera = 1;
      var codigoError = 'null';
      var estatus = 'null';
      var tipoRegistro = 'null';
          console.log("prueba cargo",bandera, fechaI, element, codigoError, estatus, tipoRegistro)
          this.AquirerService.getObtenerCargoAbono(bandera, fechaI, element, codigoError, estatus, tipoRegistro)
          .subscribe(
              data3 => {
                        console.log("Pruebadata3", data3);
                        this.AquirerService.getObtenerCatalogosCAArea().subscribe(response => {
                          this.DetalleCargoAbono = data3;
                          this.AquirerService.getObtenerCatalogosCAMovimiento().subscribe(responseM => {
                            this.Movimiento = responseM;
                            this.AquirerService.getObtenerCatalogosCAProceso().subscribe(responsePr => {
                              this.Proceso = responsePr;
                              this.AquirerService.getObtenerCatalogosCALeyenda().subscribe(responseLe => {
                                this.Leyenda = responseLe;
                                this.AquirerService.getObtenerCatalogosCADivisa().subscribe(responseDi => {
                                  this.Divisa = responseDi;
                                  this.AquirerService.getObtenerCatalogosCACobro().subscribe(responseCo => {
                                    this.Cobro = responseCo;
                                    console.log("detalle carga abono", data3);
                                      
                                    const dialogRef = this.dialog.open(cargoabono, {
                                      data: {
                                        DetalleCarga: {
                                          dtFechaCarga: this.datePipe.transform(this.DetalleCargoAbono[0].dtFechaCarga,'yyyyMMdd'),
                                          vNoAfiliacion: this.DetalleCargoAbono[0].vNoAfiliacion,
                                          vAutorizacion: this.DetalleCargoAbono[0].vAutorizacion,
                                          vNoPlastico: this.DetalleCargoAbono[0].vNoPlastico,
                                          mImporteTxn: this.DetalleCargoAbono[0].mImporteTxn,
                                          estatusAMEX: this.DetalleCargoAbono[0].estatusAMEX,
                                          codigoError: this.DetalleCargoAbono[0].codigoError,
                                          descripcionError: this.DetalleCargoAbono[0].descripcionError,
                                          vMovimiento: this.DetalleCargoAbono[0].vMovimiento,
                                          vArea: this.DetalleCargoAbono[0].vArea,
                                          vProceso: this.DetalleCargoAbono[0].vProceso,
                                          vLeyenda: this.DetalleCargoAbono[0].vLeyenda,
                                          vDivisa: this.DetalleCargoAbono[0].vDivisa,
                                          vCobro: this.DetalleCargoAbono[0].vCobro,
                                          vEmisor: this.DetalleCargoAbono[0].vEmisor,
                                          vAdquirente: this.DetalleCargoAbono[0].vAdquirente,
                                          vRecNumberEgl:this.DetalleCargoAbono[0].vRecNumberEgl,
                                          piBandera:1,
                                          vUsoBanClave:this.DetalleCargoAbono[0].vUsoBanClave,
                                        },
                                        vArea: response, vMovimiento: responseM, vProceso: responsePr,
                                        vLeyenda: responseLe, vDivisa: responseDi, vCobro: responseCo,
                                        ConfirmationCA,fechaF,fechaactual,elementD
                                      }
                                    });
                                  });
                                });
                              });
                            });
                          });
                        });


                      },
                      error => {
                        Swal.fire({
                          icon: 'error',
                          title: 'Error',
                          text: 'Problema Interno!'
                        })

                      });
        } else if (this.data.element.vEstatus=='RECIBIDO - ABONO'||this.data.element.vEstatus=='RECIBIDO - CARGO') { 
          console.log("Estatus confirmation",this.data.ConfirmationV)
          console.log("fecha",this.data.fechaactual)
          var fechaactual=this.data.fechaactual;
          var fechaI = this.datePipe.transform(this.data.element.vFechaEstatus, 'yyyyMMdd');
          var fechaF = !this.data.ConfirmationV.fechaFin ? this.data.fechaactual.value : this.data.ConfirmationV.fechaFin; 
          fechaF =this.datePipe.transform(fechaF,'yyyyMMdd');
          var vEstatus = this.data.ConfirmationV.estatus;
          var bandera = 1;
          var recordNumber= data.element.vRecordNumber;
           var ConfirmationCA = this.data.ConfirmationV;
          console.log("Estatus  cargo abono  fechas",fechaI, fechaF, bandera, vEstatus, recordNumber)
          this.AquirerService.getConsultaVentaAMEX(fechaI, fechaF, bandera, vEstatus, recordNumber)
          .subscribe(
            data3 => {
              console.log("Pruebadata3", data3);
              this.AquirerService.getObtenerCatalogosCAArea().subscribe(response => {
                this.DetalleCargoAbono = data3;
                this.AquirerService.getObtenerCatalogosCAMovimiento().subscribe(responseM => {
                  this.Movimiento = responseM;
                  this.AquirerService.getObtenerCatalogosCAProceso().subscribe(responsePr => {
                    this.Proceso = responsePr;
                    this.AquirerService.getObtenerCatalogosCALeyenda().subscribe(responseLe => {
                      this.Leyenda = responseLe;
                      this.AquirerService.getObtenerCatalogosCADivisa().subscribe(responseDi => {
                        this.Divisa = responseDi;
                        this.AquirerService.getObtenerCatalogosCACobro().subscribe(responseCo => {
                          this.Cobro = responseCo;
                          console.log("detalle carga abono", data3);

                          const dialogRef = this.dialog.open(cargoabono, {
                            data: {
                              DetalleCarga: {
                                dtFechaCarga: this.datePipe.transform(this.DetalleCargoAbono[1].dtFechaCarga,'yyyyMMdd'),
                                vNoAfiliacion: this.DetalleCargoAbono[1].vNoAfiliacion,
                                vAutorizacion: this.DetalleCargoAbono[1].vAutorizacion,
                                vNoPlastico: this.DetalleCargoAbono[1].vNoPlastico,
                                mImporteTxn: this.DetalleCargoAbono[1].mImporteTxn,
                                estatusAMEX: this.DetalleCargoAbono[1].estatusAMEX,
                                codigoError: this.DetalleCargoAbono[1].codigoError,
                                descripcionError: this.DetalleCargoAbono[1].descripcionError,
                                vMovimiento: this.DetalleCargoAbono[1].vMovimiento,
                                vArea: this.DetalleCargoAbono[1].vArea,
                                vProceso: this.DetalleCargoAbono[1].vProceso,
                                vLeyenda: this.DetalleCargoAbono[1].vLeyenda,
                                vDivisa: this.DetalleCargoAbono[1].vDivisa,
                                vCobro: this.DetalleCargoAbono[1].vCobro,
                                vEmisor: this.DetalleCargoAbono[1].vEmisor,
                                vAdquirente: this.DetalleCargoAbono[1].vAdquirente,
                                vRecNumberEgl:this.DetalleCargoAbono[1].vRecNumberEgl,
                                piBandera:1,
                                vUsoBanClave:this.DetalleCargoAbono[1].vUsoBanClave,
                              },
                              vArea: response, vMovimiento: responseM, vProceso: responsePr,
                              vLeyenda: responseLe, vDivisa: responseDi, vCobro: responseCo,
                              ConfirmationCA,fechaF,fechaactual
                            }
                          });
                        });
                      });
                    });
                  });
                });
              });


            },
            error => {
              Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Problema Interno!'
              })

            });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: 'seleccionar estatus  válido!'
          })


        } 

      }
  detallereinyeecion(element) {
    console.log("fecha",this.data.fechaactual)
    console.log("reinyeccion",this.data.ConfirmationV)
    var fechaF = !this.data.ConfirmationV.fechaFin ? this.data.fechaactual.value : this.data.ConfirmationV.fechaFin; 
    var fechaI = this.datePipe.transform(element.element.vFechaEstatus,'yyyyMMdd');
    var fechaF = this.datePipe.transform(fechaF,'yyyyMMdd');
    var ConfR = element.element.vEstatus;
    var confirmacion =this.data.ConfirmationV;
    var element = element.element.vRecordNumber;
    var bandera = 1;
    var vEstatus = 'null';
    console.log("ruta para reinyeccion",fechaI, fechaF, bandera, vEstatus, element);
    this.AquirerService.getConsultaVentaAMEX(fechaI, fechaF, bandera, vEstatus, element)
    .subscribe(
      data3 => {
        this.Detalle = data3;
        console.log("Respuesta para hacer if", ConfR)
        if (ConfR=='RECIBIDO' ) {
          const dialogRef = this.dialog.open(reinyeccion, {
            data: {
              dataR: {

                vRegLlave: this.Detalle[0].vRegLlave,
                dtFechaProceso: this.Detalle[0].dtFechaProceso,
                vTransId: this.Detalle[0].vTransId,
                vNumAutoriza: this.Detalle[0].vNumAutoriza,
                vNoPlastico: this.Detalle[0].vNoPlastico,
                vFechaTxn: this.Detalle[0].vFechaTxn,
                mImporteTxn: this.Detalle[0].mImporteTxn,
                vHoraTxn: this.Detalle[0].vHoraTxn,
                vCodTra: this.Detalle[0].vCodTra,
                vTipoPlan: this.Detalle[0].vTipoPlan,
                vProcCode: this.Detalle[0].vProcCode,
                vTipoMoneda: this.Detalle[0].vTipoMoneda,
                vParcializacion: this.Detalle[0].vParcializacion,
                vIdGiro: this.Detalle[0].vIdGiro,
                vNoAfiliacion: this.Detalle[0].vNoAfiliacion,
                vNoAfiliacionAmex: this.Detalle[0].vNoAfiliacionAmex,
                vRazonSocial: this.Detalle[0].vRazonSocial,
                vCalleNo: this.Detalle[0].vCalleNo,
                vCiudad: this.Detalle[0].vCiudad,
                vCodEstado: this.Detalle[0].vCodEstado,
                vCodPaisBr: this.Detalle[0].vCodPaisBr,
                vCodPostal: this.Detalle[0].vCodPostal,
                vPosData: this.Detalle[0].vPosData,
                vEmisor: this.Detalle[0].vEmisor,
                vAdquirente: this.Detalle[0].vAdquirente,
                iBandera: 1,
                vCodDesc: this.Detalle[0].vCodDesc,
                vRecNumberEgl: this.Detalle[0].vRecNumberEgl,
                
              },
              ConfR,
              fechaF,confirmacion
            }
          });
        }
        else if (ConfR=='RECIBIDO - REINYECCION') { 
          const dialogRef = this.dialog.open(reinyeccion, {
            data: {
              dataR: {

                vRegLlave: this.Detalle[1].vRegLlave,
                dtFechaProceso: this.Detalle[1].dtFechaProceso,
                vTransId: this.Detalle[1].vTransId,
                vNumAutoriza: this.Detalle[1].vNumAutoriza,
                vNoPlastico: this.Detalle[1].vNoPlastico,
                vFechaTxn: this.Detalle[1].vFechaTxn,
                mImporteTxn: this.Detalle[1].mImporteTxn,
                vHoraTxn: this.Detalle[1].vHoraTxn,
                vCodTra: this.Detalle[1].vCodTra,
                vTipoPlan: this.Detalle[1].vTipoPlan,
                vProcCode: this.Detalle[1].vProcCode,
                vTipoMoneda: this.Detalle[1].vTipoMoneda,
                vParcializacion: this.Detalle[1].vParcializacion,
                vIdGiro: this.Detalle[1].vIdGiro,
                vNoAfiliacion: this.Detalle[1].vNoAfiliacion,
                vNoAfiliacionAmex: this.Detalle[1].vNoAfiliacionAmex,
                vRazonSocial: this.Detalle[1].vRazonSocial,
                vCalleNo: this.Detalle[1].vCalleNo,
                vCiudad: this.Detalle[1].vCiudad,
                vCodEstado: this.Detalle[1].vCodEstado,
                vCodPaisBr: this.Detalle[1].vCodPaisBr,
                vCodPostal: this.Detalle[1].vCodPostal,
                vPosData: this.Detalle[1].vPosData,
                vEmisor: this.Detalle[1].vEmisor,
                vAdquirente: this.Detalle[1].vAdquirente,
                iBandera: 1,
                vCodDesc: this.Detalle[1].vCodDesc,
                vRecNumberEgl: this.Detalle[1].vRecNumberEgl,
                
              },
              ConfR,fechaF,confirmacion
            }
          });
        } else {
          error => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Problema Interno!'
            })
            console.log("Error", error);
          }
        }

      },
      );
  }

}

@Component({
  selector: 'cargoabono',
  templateUrl: 'cargoabono.html',
  styleUrls: ['./confirmation-report.component.css'],

})
export class cargoabono {
  dictaminaCargoAbono:any;
  constructor(
    public dialogRef: MatDialogRef<cargoabono>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(DatePipe) public datePipe,
    @Inject(AquirerService) public AquirerService) {

    console.info(data);
  }

  validacargaabono(data) {
    Swal.fire({
      title: 'Confirmar  Cargo/Abono',
      showDenyButton: true,
      //showCancelButton: true,
      confirmButtonText: `APLICAR CARGO/ABONO`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      console.log("data original",data);
      console.log("aqui va el objeto para dictaminacion", data.DetalleCarga.vNoAfiliacion);
      dictaminaCargoAbono:data.DetalleCarga.vNoAfiliacion;
      this.dictaminaCargoAbono = new Object();
      this.dictaminaCargoAbono={
        codigoError:data.DetalleCarga.codigoError,
        dtFechaCarga:data.DetalleCarga.dtFechaCarga,
        mImporteTxn:Number(data.DetalleCarga.mImporteTxn),
        piBandera:1,
        vArea:Number(data.DetalleCarga.vArea),
        vAutorizacion:data.DetalleCarga.vAutorizacion,
        vCobro:data.DetalleCarga.vCobro,
        vDivisa:data.DetalleCarga.vDivisa,
        vLeyenda:data.DetalleCarga.vLeyenda,
        vMovimiento:data.DetalleCarga.vMovimiento,
        vNoAfiliacion:data.DetalleCarga.vNoAfiliacion,
        vNoPlastico:data.DetalleCarga.vNoPlastico,
        vProceso:data.DetalleCarga.vProceso,
        vRecNumberEgl:data.DetalleCarga.vRecNumberEgl,
        vUsoBanClave:data.DetalleCarga.vUsoBanClave,
        
      }


      console.log("aqui va COnfirmacion en CA ",  this.dictaminaCargoAbono);
      this.AquirerService.postDictaminacionCargoAbono(this.dictaminaCargoAbono).subscribe(
        dataR => {
          console.log("postDictaminaReinyeccion Request is successful Respuesta", dataR);
          if (dataR.vError == "0") {

            Swal.fire('Modificación Correcta!', '', 'success')
          } else if (dataR.iTotal == "0") {
            Swal.fire('Modificación no Aplicada', '', 'info')
          }


          console.log("postDictaminacionCargoAbono Request is successful Respuesta", dataR);
        }, error => {
          //Swal.fire('Error en el sericio')
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Problema Interno!'
          })
          console.log("Error", error);
        });
      if (result.isConfirmed) {
        Swal.fire('Cargo / Abono Exitoso!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Cargo Abono no Aplicado', '', 'info')
      }
    })
  }
  modifica(data) {
    Swal.fire({
      title: 'Confirmar el cambio de Estatus a Recibido 1',
      showDenyButton: true,
      confirmButtonText: `Modificar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      console.log("Modifica Estatus",data)
      var bandera=2;
      var fechaF= data.fechaF;
      var fechaI= data.DetalleCarga.dtFechaCarga;
      var element=data.DetalleCarga.vRecNumberEgl;
      var vEstatus= data.ConfirmationCA.estatus;
      this.AquirerService.getConsultaVentaAMEX(fechaI, fechaF, bandera, vEstatus, element).subscribe(
        dataMC => {
          console.log("Cambio de estatus CA Request is successful Respuesta", dataMC);
          if (dataMC[0].iError == 0) {
            console.log("Resouesta COrrecta");
              Swal.fire('Modificación Correcta!', '', 'success')

              var fechaIni = !this.data.ConfirmationCA.fechaIni ? this.data.fechaactual.value : this.data.ConfirmationCA.fechaIni;
              var fechaFin = this.data.fechaF;
              var fechaEstatus = this.data.ConfirmationCA.fechaEstatus;
              var tipoRegistro= this.data.ConfirmationCA.tipoRegistro;
              fechaIni = this.datePipe.transform(fechaIni, 'yyyyMMdd');
              fechaFin = this.datePipe.transform(fechaFin, 'yyyyMMdd');
              fechaEstatus = this.datePipe.transform(fechaEstatus, 'yyyyMMdd');
              var bandera = 2;
              var codigoError = this.data.Confirmation.codigoError;
              var estatus = this.data.Confirmation.estatus;
              console.log("aqui va la confirmacion", fechaIni,fechaFin,tipoRegistro,bandera,codigoError,estatus,fechaEstatus);

            } else if (result.isDenied) {
            Swal.fire('Modificación no Aplicada', '', 'info')
            }
          }, error => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Problema Interno!'
          })
          console.log("Error", error);

        });

    })
  }

}

@Component({
  selector: 'reinyeccion',
  templateUrl: 'reinyeccion.html',
  styleUrls: ['./confirmation-report.component.css'],

})
export class reinyeccion {
  Cambiaestatus:any;
  dataConfirmation:any;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(
    public dialogRef: MatDialogRef<reinyeccion>,
    private comp: ConfirmationReportComponent,
   // private changeDetectorRefs: ChangeDetectorRef,
     
    //@Inject(ConfirmationReportComponent) public ConfirmationReportComponent,
   // public father: ConfirmationReportComponent,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(DatePipe) public datePipe,
    @Inject(AquirerService) public AquirerService
    ) { }

  ngOnInit() {


  }
  public callMe() {

    this.comp.refresh(this.dataConfirmation);
  }
//   refresh(){
//     console.log("prueba")
//     var fechaIni = !this.dataConfirmation.value.fechaIni ? this.data.fechaactual.value : this.data.Confirmation.value.fechaIni;
//     var fechaFin = !this.data.Confirmation.value.fechaFin ? this.data.fechaactual.value : this.data.Confirmation.value.fechaFin;
//     var fechaEstatus = this.data.Confirmation.value.fechaEstatus;
//     var tipoRegistro= this.data.Confirmation.value.tipoRegistro;
//     fechaIni = this.datePipe.transform(fechaIni, 'yyyyMMdd');
//     fechaFin = this.datePipe.transform(fechaFin, 'yyyyMMdd');
  
//     fechaEstatus = this.datePipe.transform(fechaEstatus, 'yyyyMMdd');
//     var bandera = 2;
//     var codigoError = this.data.Confirmation.value.codigoError;
//     var estatus = this.data.Confirmation.value.estatus;
    
//             console.log("aqui va la confirmacion actualiza tabla", fechaIni,fechaFin,tipoRegistro,bandera,codigoError,estatus,fechaEstatus);
//             this.AquirerService.getConfirmationReport(fechaIni,fechaFin,tipoRegistro,bandera,codigoError,estatus,fechaEstatus)
//             .subscribe(
//               data => {
//                 console.log("getReporteGRRNC Request is successful ", data);
        
//                 if (data.length == 0 ) {
                  
//                   Swal.fire({
//                     icon: 'info',
//                     text: 'No hay datos!'
//                   })
//                   this.dataConfirmation = new MatTableDataSource();
//                 } else {
//                   this.dataConfirmation = new MatTableDataSource(data);
//                   this.dataConfirmation.paginator = this.paginator;
        
//                 }
        
//               },
//               error => {
//                 Swal.fire({
//                     icon: 'error',
//                     title: 'Error',
//                     text: 'Problema Interno!'
//                 })
//                 console.log("Error", error);
//                 this.dataConfirmation = new MatTableDataSource();
//               });
// }
  valida(data) {
    
    //localStorage.setItem('tablaActualizada', '1');
    //console.log("Objeto actualizar", localStorage.getItem('tablaActualizada'));
    Swal.fire({
      title: 'Confirmar la Modificación',
      showDenyButton: true,
      confirmButtonText: `Modificar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {

      // data.data.iBandera=1;
      console.log("Modifica Estatus",data.ConfR);
      //data.dataR.piBandera=2;
      if (data.ConfR=='RECIBIDO - REINYECCION') { 
        data.dataR.iBandera=2;
        data.dataR.dtFechaProceso=this.datePipe.transform(data.dataR.dtFechaProceso,'yyyyMMdd'),
        console.log("cambio de bandera",data.dataR.iBandera)
        this.AquirerService.postDictaminaReinyeccion(data.dataR).subscribe(
          data2 => {
            console.log("postDictaminaReinyeccion Request is successful Respuesta", data2);
            if (data2.vError == "0") {

              Swal.fire('Modificación Correcta!', '', 'success')
            } else if (data2.iTotal == "0") {
              Swal.fire('Modificación no Aplicada', '', 'info')
            }
          }, error => {

            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Problema Interno!'
            })
            console.log("Error", error);

          });
      } else if (data.ConfR=='RECIBIDO') { 


        this.AquirerService.postDictaminaReinyeccion(data.dataR).subscribe(
          data2 => {
            console.log("postDictaminaReinyeccion Request is successful Respuesta", data2);
            if (data2.vError == "0") {

              Swal.fire('Modificación Correcta!', '', 'success')

              // var fechaIni = !this.data.ConfirmationCA.value.fechaIni ? this.data.fechaactual.value : this.data.ConfirmationCA.value.fechaIni;
              // var fechaFin = this.data.fechaF;
              // var fechaEstatus = this.data.ConfirmationCA.value.fechaEstatus;
              // var tipoRegistro= this.data.ConfirmationCA.value.tipoRegistro;
              // fechaIni = this.datePipe.transform(fechaIni, 'yyyyMMdd');
              // fechaFin = this.datePipe.transform(fechaFin, 'yyyyMMdd');
              // fechaEstatus = this.datePipe.transform(fechaEstatus, 'yyyyMMdd');
              // var bandera = 2;
              // var codigoError = this.data.Confirmation.value.codigoError;
              // var estatus = this.data.Confirmation.value.estatus;
              // console.log("aqui va la confirmacion", fechaIni,fechaFin,tipoRegistro,bandera,codigoError,estatus,fechaEstatus);

            } else if (data2.iTotal == "0") {
              Swal.fire('Modificación no Aplicada', '', 'info')
            }
          }, error => {
            //Swal.fire('Error en el sericio')
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Problema Interno!'
            })
            console.log("Error", error);

          });
      } else {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Problema Interno!'
        })

      }

      // this.AquirerService.postDictaminaReinyeccion(data.dataR).subscribe(
      //   data2 => {
        //     console.log("postDictaminaReinyeccion Request is successful Respuesta", data2);
        //     if (data2.vError == "0") {

          //       Swal.fire('Modificación Correcta!', '', 'success')
          //     } else if (data2.iTotal == "0") {
            //       Swal.fire('Modificación no Aplicada', '', 'info')
            //     }
            //   }, error => {
              //     //Swal.fire('Error en el sericio')
              //     Swal.fire({
                //       icon: 'error',
                //       title: 'Oops...',
                //       text: 'Algo salió mal!'
                //     })
                //     console.log("Error", error);

                //   });
              })
  }

  
  modifica(data) {
    this.dataConfirmation = new MatTableDataSource();
    Swal.fire({
      title: 'Confirmar el cambio de Estatus a Recibido',
      showDenyButton: true,
      confirmButtonText: `Modificar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      console.log("Modifica Estatus",data)
      var bandera=2;
      var fechaF= data.fechaF;
      var fechaI= this.datePipe.transform(data.dataR.dtFechaProceso,'yyyyMMdd');
      var element=data.dataR.vRecNumberEgl;
      var vEstatus= 'RR';
      console.log("Modifica Estatus Variables",fechaI, fechaF, bandera, vEstatus, element)
      this.AquirerService.getConsultaVentaAMEX(fechaI, fechaF, bandera, vEstatus, element).subscribe(
        dataMC => {
          console.log("Cambio de estatus CA Request is successful Respuesta", dataMC);
          if (dataMC[0].iError == 0) {
            localStorage.setItem('refrescar','0');
            console.log("Respuesta Correcta",this.data);
            // this.comp.refresh(this.data);
            // this.comp.ngOnInit();
            //this.callMe();
            this.comp.refresh(this.data);
               this.comp.ngOnInit();
            Swal.fire('Modificación  Aplicada', '', 'success')
            
            
               
            
 
            
          
              
            
            } else if (result.isDenied) {
            Swal.fire('Modificación no Aplicada', '', 'info')
            }
          }, error => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Problema Interno!'
          })
          console.log("Error", error);

        });

    })
  }

}


