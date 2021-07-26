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
import { Observable } from 'rxjs';
@Component({
  selector: 'app-consolidado-pagos',
  templateUrl: './consolidado-pagos.component.html',
  styleUrls: ['./consolidado-pagos.component.css']
})
export class ConsolidadoPagosComponent implements OnInit {
  fechaactual = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
  Consolidado: any;
  rccaratulaDTO: any[];
  caratula:any[];
  dataE:any;
  decode:any;
  codeString:any;
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
      pvFechaFinal: [''],
      pvTipoMoneda:['',Validators.required]
    });
    // this.dataDebitosN = new MatTableDataSource(JSON.parse(localStorage.getItem('dataDebitosN')));    
    // this.dataDebitosI = new MatTableDataSource(JSON.parse(localStorage.getItem('dataDebitosI')));    

    // this.dataDebitosN = JSON.parse(localStorage.getItem('dataDebitosN'));
    // this.dataDebitosI = JSON.parse(localStorage.getItem('dataDebitosI'));
    // this.dataCreditosN = JSON.parse(localStorage.getItem('dataCreditosN'));
    // this.dataCreditosI = JSON.parse(localStorage.getItem('dataCreditosI'));
  }
  exporttxt(Consolidado){
    var fechaI = !this.Consolidado.value.pvFechaProceso ? this.fechaactual.value : this.Consolidado.value.pvFechaProceso;
    var fechaF = !this.Consolidado.value.pvFechaFinal ? this.fechaactual.value : this.Consolidado.value.pvFechaFinal;
    fechaI = this.datePipe.transform(fechaI, 'yyyyMMdd');
    fechaF = this.datePipe.transform(fechaF, 'yyyyMMdd');
     var pvTipoMoneda=Consolidado.value.pvTipoMoneda;
    // var pvFechaProceso=Consolidado.value.pvFechaProceso;
    //var pvFechaFinal=Consolidado.value.pvFechaFinal;
    var pvTipoPago="%20";
    this.AquirerService.getTxtCaratulaGRRCN(fechaI,fechaF,pvTipoMoneda,pvTipoPago).subscribe(response => {
         //this.estatus = response;
          this.decode=response;
          console.log("Archivo sin decode",this.decode)
          let decodedString = decodeURIComponent(escape(window.atob(this.decode.vArchivoTXT)))
           //this.codeString = (atob(this.decode.vArchivoTXT));
          console.log("DECODIFICADO",decodedString)
          const blob =new Blob([decodedString,"\ufeff"], {type:'text/html'});
          var nombre= "Carátula Pagos-BBVA"+ "-"+fechaI;
           saveAs(blob, nombre+'.txt');
        });

  }

  onSubmit() {
    this.dataDebitosN = new MatTableDataSource();
    this.dataDebitosI = new MatTableDataSource();
    this.dataCreditosN = new MatTableDataSource();
    this.dataCreditosI = new MatTableDataSource();
    var fechaI = !this.Consolidado.value.pvFechaProceso ? this.fechaactual.value : this.Consolidado.value.pvFechaProceso;
    var fechaF = !this.Consolidado.value.pvFechaFinal ? this.fechaactual.value : this.Consolidado.value.pvFechaFinal;
    fechaI = this.datePipe.transform(fechaI, 'yyyyMMdd');
    fechaF = this.datePipe.transform(fechaF, 'yyyyMMdd');

    // var fechaI = this.Consolidado.value.pvFechaProceso;
    // var fechaF = this.Consolidado.value.pvFechaFinal;
    // fechaI = this.datePipe.transform(fechaI, 'yyyyMMdd');
    // fechaF = this.datePipe.transform(fechaF, 'yyyyMMdd');
   // fechaI = this.Consolidado.value.fechaIni;
    //console.log("aqui va la confirmacion", fechaI,fechaF);
    //this.AquirerService.getObtieneReporteGRRCN(JSON.parse(JSON.stringify(this.Confirmation.value)))
    this.AquirerService.getCaratulaGRRCN(fechaI,fechaF)
    .subscribe(  
      data => {
        console.log("getCaratulaGRRCN Request is successful ", data);
        console.log("Aqui va el DATA ", data);

        this.rccaratulaDTO =data;
         if (data.length == 0 || data== null) {
            Swal.fire({
              icon: 'info',
              text: 'No hay datos!'
            })
             this.dataDebitosN = new MatTableDataSource(data);
             this.dataDebitosI = new MatTableDataSource(data);
             this.dataCreditosN = new MatTableDataSource(data);
             this.dataCreditosI = new MatTableDataSource(data);
            //localStorage.clear();
                } else {
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
              //localStorage.setItem('dataDebitosN', JSON.stringify(this.dataDebitosN));
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
              //localStorage.setItem('dataDebitosI', JSON.stringify(this.dataDebitosI));
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
              // var local=localStorage.setItem('dataCreditosN',JSON.stringify(data));
              // console.log("Prueba",local);
              // localStorage.clear();
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
              //localStorage.setItem('dataCreditosI', JSON.stringify(this.dataCreditosI));
          } else {
            
          }
        }
            //localStorage.setItem('dataRechazoSintaxis', JSON.stringify(this.rccaratulaDTO));
            
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
       this.dataDebitosN = new MatTableDataSource();
       this.dataDebitosI = new MatTableDataSource();
       this.dataCreditosN = new MatTableDataSource();
       this.dataCreditosI = new MatTableDataSource();
      
            localStorage.clear();
    }

    );

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
             var nombre= "Concentrado de Reporte Detalle Pagos-BBVA-"+this.Consolidado.value.pvFechaProceso;
            XLSX.writeFile(wb, nombre+'.xlsx');
     
          // var nombre= "Consolidado Pagos AMX-BBVA";
          // XLSX.writeFile(wb, nombre+'.xlsx');
          
        }
      
  }
}


