import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from "@angular/forms";
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AquirerService } from 'src/app/service/aquirer.service';
import { Router } from "@angular/router";
import { Confirmation } from 'src/app/model/Confirmation.model';
import { Detalle } from 'src/app/model/detalle.model';
import { DatePipe } from "@angular/common";
import Swal from 'sweetalert2';
import * as xlsx from 'xlsx';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-rechazos-lotes',
  templateUrl: './rechazos-lotes.component.html',
  styleUrls: ['./rechazos-lotes.component.css']
})
export class RechazosLotesComponent implements OnInit {
   fechaactual = new FormControl(new Date());
   
   serializedDate = new FormControl((new Date()).toISOString());

  Confirmation: any;
  Detalle: any;
  estatus: any;
  tipoRegistro: any;
  dataE: any;
  fechaIni:any;
  constructor(public dialog: MatDialog, private formBuilder: FormBuilder, private router: Router,
    private datePipe: DatePipe, private AquirerService: AquirerService) { }
  displayedColumns: string[] = ['vRecordType', 'iErrorCode', 'vCodDesc', 'totalRegistros',
    'totalImporte', 'vStatusNombre'];
  detalleColumns: string[] = ['dtFechaCarga', 'dtFechaProceso', 'mImporteTxn', 'vCalleNo'];
  dataSource = new MatTableDataSource();
  // dataDetalle = new MatTableDataSource();
  //dataSource = new MatTableDataSource<RConfReportDTO>(ELEMENT_DATA);
  // dataSource=this.reporte
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.Confirmation = this.formBuilder.group({

      fechaIni: [''],
      fechaFin: [''],  
      tipoRegistro: ['',Validators.required],
      estatus: ['',Validators.required]
    });
    //this.fechaIni=this.datePipe.transform(this.Confirmation.fechaFin, 'yyyyMMdd')
    this.AquirerService.getObtenerCatalogosCATipoRegistro().subscribe(response => {
      this.tipoRegistro = response;
      this.AquirerService.getObtenerCatalogosCAEstatus().subscribe(response => {
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
      vIdEmi: [''],
      vIdAdq: [''],
      vIdUltimaMod: [''],
      vdFechaUltimaMod: [''],
      dtFechaCarga: [''],
      vEstatus: ['']
    });
 //this.dataSource = new MatTableDataSource(JSON.parse(localStorage.getItem('dataSource')));
      this.dataSource.paginator = this.paginator;

  }
  public checkError = (controlName: string, errorName: string) => {
    return this.Confirmation.controls[controlName].hasError(errorName);
  }
  //this.fechaIni=this.datePipe.transform(this.Confirmation.value.fechaFin,'yyyyMMdd');
  onSubmit() {
    var fechaI = !this.Confirmation.value.fechaIni ? this.fechaactual.value : this.Confirmation.value.fechaIni;
    var fechaF = !this.Confirmation.value.fechaFin ? this.fechaactual.value : this.Confirmation.value.fechaFin;
    fechaI = this.datePipe.transform(fechaI, 'yyyyMMdd');
    fechaF = this.datePipe.transform(fechaF, 'yyyyMMdd');
    // this.Confirmation.value.fechaIni=fechaI;
    // this.Confirmation.value.fechaFin=fechaF;

   //   var fechaIni = !this.Confirmation.value.fechaIni ? this.fechaactual.value : this.Confirmation.value.fechaIni;
   //   var fechaFin = !this.Confirmation.value.fechaFin ? this.fechaactual.value : this.Confirmation.value.fechaFin;
      var tipoRegistro=this.Confirmation.value.tipoRegistro;
      var estatus= this.Confirmation.value.estatus
   //  //console.log("Fechas",this.Confirmation.value.fechaIni)
   // // this.Confirmation.value.fechaIni = this.datePipe.transform(fechaI, 'yyyyMMdd');
   //  //this.Confirmation.value.fechaFin = this.datePipe.transform(this.Confirmation.value.fechaFin, 'yyyyMMdd');
   //   fechaIni = this.datePipe.transform(fechaIni, 'yyyyMMdd');
   //   fechaFin = this.datePipe.transform(fechaFin, 'yyyyMMdd');

    console.log("aqui va la confirmacion", fechaI,fechaF);
    //this.AquirerService.getObtieneReporteGRRCN(JSON.parse(JSON.stringify(this.Confirmation.value)))
    this.AquirerService.getObtieneRechazos(fechaI,fechaF,tipoRegistro,estatus)
      .subscribe(
        data => {
          console.log("getReporteGRRNC Request is successful ", data);
          console.log("Aqui va el DATA ", data);
          if (data.length == 0) {
            Swal.fire({
              icon: 'info',
              text: 'No hay datos!'
            })
            this.dataSource =  new MatTableDataSource();
            this.dataSource.paginator = this.paginator;
           //localStorage.clear();

          } else {

            this.dataSource = new MatTableDataSource(data);
           // localStorage.setItem('dataSource', JSON.stringify(data));
            this.dataSource.paginator = this.paginator;
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
          this.dataSource =  new MatTableDataSource();
          //localStorage.clear();
        }

      );

  }
   applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  // goToUrl(): void {
  //     this.location.href = 'confirmation-report';
  //   }

  exportexcel(): void {
    {
      /* table id is passed over here */
      this.dataE = this.dataSource;
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataE.filteredData);
      /* generate workbook and add the worksheet */
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.sheet_add_json(ws, [{ A1: "Tipo de Registro" },],
        { header: ["A1"], skipHeader: true, origin: "A1" });
      XLSX.utils.sheet_add_json(ws, [{ B1: "Código de error" },],
        { header: ["B1"], skipHeader: true, origin: "B1" });
      XLSX.utils.sheet_add_json(ws, [{ C1: "Descripcion del Código" },],
        { header: ["C1"], skipHeader: true, origin: "C1" });
      XLSX.utils.sheet_add_json(ws, [{ D1: "Total de Registros" },],
        { header: ["D1"], skipHeader: true, origin: "D1" });
      XLSX.utils.sheet_add_json(ws, [{ E1: "Importe Total" },],
        { header: ["E1"], skipHeader: true, origin: "E1" });
      XLSX.utils.sheet_add_json(ws, [{ F1: "Estatus" },],
        { header: ["F1"], skipHeader: true, origin: "F1" });
      XLSX.utils.book_append_sheet(wb, ws, 'Reporte Confirmacion');
      /* save to file */
      var nombre= "Concentrado de Gestión de Rechazos-BBVA-"+ this.Confirmation.value.fechaIni;
            XLSX.writeFile(wb, nombre+'.xlsx');
     // XLSX.writeFile(wb, 'Concentrado de Gestión de Rechazos.xlsx');

    }
  }
}
