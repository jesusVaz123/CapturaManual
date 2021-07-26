import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from "@angular/forms";
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DatePipe } from "@angular/common";
import { AquirerService } from 'src/app/service/aquirer.service';
import { Router } from "@angular/router";
import { rccaratulaDTO } from 'src/app/model/rccaratulaDTO.model';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import Swal from 'sweetalert2';
import * as xlsx from 'xlsx';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
@Component({
  selector: 'app-vista-concentrado',
  templateUrl: './vista-concentrado.component.html',
  styleUrls: ['./vista-concentrado.component.css']
})
export class VistaConcentradoComponent implements OnInit {
  Consolidado: any;
  rccaratulaDTO: any[];
  caratula:any[];
  dataE:any;
  constructor(public dialog: MatDialog, private formBuilder: FormBuilder, private router: Router,
    private datePipe: DatePipe, private AquirerService: AquirerService) { }

  ColumnsDebitosN: string[] = ['tipoRegistro', 'total', 'importe', 'comision','tipoMoneda','tipoPago','iva'];
  ColumnsDebitosI: string[] = ['tipoRegistro', 'total', 'importe', 'comision','tipoMoneda','tipoPago','iva'];

  ColumnsCreditosN: string[] = ['tipoRegistro', 'total', 'importe', 'comision','tipoMoneda','tipoPago','iva'];
  ColumnsCreditosI: string[] = ['tipoRegistro', 'total', 'importe', 'comision','tipoMoneda','tipoPago','iva'];
  // dataCreditos = new MatTableDataSource<Creditos>(Creditos_DATA);
  dataDebitosN = new MatTableDataSource();
  dataDebitosI = new MatTableDataSource();
  dataCreditosN = new MatTableDataSource();
  dataCreditosI = new MatTableDataSource();
  ngOnInit() {

    this.Consolidado = this.formBuilder.group({
      pvFechaProceso: [''],
      pvFechaFinal: ['']
    });
  }
exportexcel(): void {
        {
          /* table id is passed over here */   
          
          const ws1: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataDebitosN.filteredData);
          const ws2: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataDebitosI.filteredData);
          const ws3: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataCreditosN.filteredData);
          const ws4: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataCreditosI.filteredData);
          /* generate workbook and add the worksheet */
          const wb: XLSX.WorkBook = XLSX.utils.book_new();
            XLSX.utils.sheet_add_json(ws1,[{A1: "Comision"},],
                {header: ["A1"],skipHeader:true, origin: "A1"} );
            XLSX.utils.sheet_add_json(ws1,[{B1: "Importe"},],
                {header: ["B1"],skipHeader:true,origin: "B1"});
            XLSX.utils.sheet_add_json(ws1,[{C1: "Iva"},],
                {header: ["C1"],skipHeader:true,origin: "C1"});
            XLSX.utils.sheet_add_json(ws1,[{D1: "Tipo Moneda"},],
                {header: ["D1"],skipHeader:true,origin: "D1"});
            XLSX.utils.sheet_add_json(ws1,[{E1: "Tipo de Registro"},],
                {header: ["E1"],skipHeader:true,origin: "E1"});
            XLSX.utils.book_append_sheet(wb, ws1, 'DEBITOS NACIONALES');
            //////////////////////////////
             XLSX.utils.sheet_add_json(ws2,[{A1: "Comision"},],
                {header: ["A1"],skipHeader:true, origin: "A1"} );
            XLSX.utils.sheet_add_json(ws2,[{B1: "Importe"},],
                {header: ["B1"],skipHeader:true,origin: "B1"});
            XLSX.utils.sheet_add_json(ws2,[{C1: "Iva"},],
                {header: ["C1"],skipHeader:true,origin: "C1"});
            XLSX.utils.sheet_add_json(ws2,[{D1: "Tipo Moneda"},],
                {header: ["D1"],skipHeader:true,origin: "D1"});
            XLSX.utils.sheet_add_json(ws2,[{E1: "Tipo de Registro"},],
                {header: ["E1"],skipHeader:true,origin: "E1"});
            XLSX.utils.book_append_sheet(wb, ws2, 'DEBITOS INTERNACIONALES');
             //////////////////////////////
             XLSX.utils.sheet_add_json(ws3,[{A1: "Comision"},],
                {header: ["A1"],skipHeader:true, origin: "A1"} );
            XLSX.utils.sheet_add_json(ws3,[{B1: "Importe"},],
                {header: ["B1"],skipHeader:true,origin: "B1"});
            XLSX.utils.sheet_add_json(ws3,[{C1: "Iva"},],
                {header: ["C1"],skipHeader:true,origin: "C1"});
            XLSX.utils.sheet_add_json(ws3,[{D1: "Tipo Moneda"},],
                {header: ["D1"],skipHeader:true,origin: "D1"});
            XLSX.utils.sheet_add_json(ws3,[{E1: "Tipo de Registro"},],
                {header: ["E1"],skipHeader:true,origin: "E1"});
            XLSX.utils.book_append_sheet(wb, ws3, 'CREDITOS NACIONALES');
            //////////////////////////////
             XLSX.utils.sheet_add_json(ws4,[{A1: "Comision"},],
                {header: ["A1"],skipHeader:true, origin: "A1"} );
            XLSX.utils.sheet_add_json(ws4,[{B1: "Importe"},],
                {header: ["B1"],skipHeader:true,origin: "B1"});
            XLSX.utils.sheet_add_json(ws4,[{C1: "Iva"},],
                {header: ["C1"],skipHeader:true,origin: "C1"});
            XLSX.utils.sheet_add_json(ws4,[{D1: "Tipo Moneda"},],
                {header: ["D1"],skipHeader:true,origin: "D1"});
            XLSX.utils.sheet_add_json(ws4,[{E1: "Tipo de Registro"},],
                {header: ["E1"],skipHeader:true,origin: "E1"});
            XLSX.utils.book_append_sheet(wb, ws4, 'CREDITOS INTERNACIONALES');
          /* save to file */
          XLSX.writeFile(wb, 'Reporte de Consolidado de Pagos.xlsx');
          
        }
      
  }
  onSubmit() {
    var fechaI = this.Consolidado.value.pvFechaProceso;
    var fechaF = this.Consolidado.value.pvFechaFinal;
    this.Consolidado.value.pvFechaProceso = this.datePipe.transform(fechaI, 'yyyyMMdd');
    this.Consolidado.value.pvFechaFinal = this.datePipe.transform(fechaF, 'yyyyMMdd');
    fechaI = this.Consolidado.value.fechaIni;
    console.log("aqui va la confirmacion", this.Consolidado.value);

    var fechaIni = this.Consolidado.value.pvFechaProceso;
     var fechaFin = this.Consolidado.value.pvFechaFinal;
     
    //console.log("Fechas",this.Confirmation.value.fechaIni)
   // this.Confirmation.value.fechaIni = this.datePipe.transform(fechaI, 'yyyyMMdd');
    //this.Confirmation.value.fechaFin = this.datePipe.transform(this.Confirmation.value.fechaFin, 'yyyyMMdd');
     fechaIni = this.datePipe.transform(fechaIni, 'yyyyMMdd');
     fechaFin = this.datePipe.transform(fechaFin, 'yyyyMMdd');
    //this.AquirerService.getObtieneReporteGRRCN(JSON.parse(JSON.stringify(this.Confirmation.value)))
    this.AquirerService.getCaratulaGRRCN(fechaIni,fechaFin)
    .subscribe(
      data => {
        console.log("getReporteGRRNC Request is successful ", data);
        console.log("Aqui va el DATA ", data);

        this.rccaratulaDTO =data;

        for (var i = this.rccaratulaDTO.length - 1; i >= 0; i--) {
          if ((this.rccaratulaDTO[i].tipoMoneda == 'MXN') && (this.rccaratulaDTO[i].tipoPago == 'DEBITO' )
            && (this.rccaratulaDTO[i].tipoRegistro !== 'TOTAL')) {
            //filtros debitos macionales
              this.dataDebitosN.filteredData.push({
                  comision: this.rccaratulaDTO[i].comision,
                  importe:  this.rccaratulaDTO[i].importe,
                  iva: this.rccaratulaDTO[i].iva,
                  tipoMoneda: this.rccaratulaDTO[i].tipoMoneda,
                  tipoPago: this.rccaratulaDTO[i].tipoPago,
                  tipoRegistro: this.rccaratulaDTO[i].tipoRegistro,
                  total: this.rccaratulaDTO[i].total
              });

              this.dataDebitosN = new MatTableDataSource(this.dataDebitosN.filteredData);
          }
          else if  ((this.rccaratulaDTO[i].tipoMoneda == 'USD') && (this.rccaratulaDTO[i].tipoPago == 'DEBITO' )
            && (this.rccaratulaDTO[i].tipoRegistro !== 'TOTAL')) { 
            //filtros debitos internacionales
                  this.dataDebitosI.filteredData.push({
                  comision: this.rccaratulaDTO[i].comision,
                  importe:  this.rccaratulaDTO[i].importe,
                  iva: this.rccaratulaDTO[i].iva,
                  tipoMoneda: this.rccaratulaDTO[i].tipoMoneda,
                  tipoPago: this.rccaratulaDTO[i].tipoPago,
                  tipoRegistro: this.rccaratulaDTO[i].tipoRegistro,
                  total: this.rccaratulaDTO[i].total
              });
              this.dataDebitosI = new MatTableDataSource(this.dataDebitosI.filteredData);
          } 
          else if ((this.rccaratulaDTO[i].tipoMoneda == 'MXN') && (this.rccaratulaDTO[i].tipoPago == 'CREDITO' )
            && (this.rccaratulaDTO[i].tipoRegistro !== 'TOTAL')){ 
            this.dataCreditosN.filteredData.push({
                  comision: this.rccaratulaDTO[i].comision,
                  importe:  this.rccaratulaDTO[i].importe,
                  iva: this.rccaratulaDTO[i].iva,
                  tipoMoneda: this.rccaratulaDTO[i].tipoMoneda,
                  tipoPago: this.rccaratulaDTO[i].tipoPago,
                  tipoRegistro: this.rccaratulaDTO[i].tipoRegistro,
                  total: this.rccaratulaDTO[i].total
              });
              this.dataCreditosN = new MatTableDataSource(this.dataCreditosN.filteredData);
          } 
          else if ((this.rccaratulaDTO[i].tipoMoneda == 'USD') && (this.rccaratulaDTO[i].tipoPago == 'CREDITO' )
            && (this.rccaratulaDTO[i].tipoRegistro !== 'TOTAL')) { 
             this.dataCreditosI.filteredData.push({
                  comision: this.rccaratulaDTO[i].comision,
                  importe:  this.rccaratulaDTO[i].importe,
                  iva: this.rccaratulaDTO[i].iva,
                  tipoMoneda: this.rccaratulaDTO[i].tipoMoneda,
                  tipoPago: this.rccaratulaDTO[i].tipoPago,
                  tipoRegistro: this.rccaratulaDTO[i].tipoRegistro,
                  total: this.rccaratulaDTO[i].total
              });
              this.dataCreditosI = new MatTableDataSource(this.dataCreditosI.filteredData);
          } else {
            
          }
        }
        
    },
    error => {
      //Swal.fire('Error en el sericio')
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Algo salió mal!'
      })
      console.log("Error", error);
    }

    );

  }
}


