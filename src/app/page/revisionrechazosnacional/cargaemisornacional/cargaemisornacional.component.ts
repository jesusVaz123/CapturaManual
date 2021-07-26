import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ModalCargaEmisorComponent } from 'src/app/page/revisionrechazosnacional/modal-carga-emisor/modal-carga-emisor.component';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AquirerService } from 'src/app/service/aquirer.service';
import { LCatalogosDTO } from 'src/app/model/lCatalogosDTO';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { RechazoParams } from 'src/app/model/RechazoParams.model';

import * as XLSX from 'xlsx';


@Component({
  selector: 'app-cargaemisornacional',
  templateUrl: './cargaemisornacional.component.html',
  styleUrls: ['./cargaemisornacional.component.scss']
})
export class CargaemisornacionalComponent implements OnInit {

  fechaactual = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
  Rechazo: any;
  //_rechazosParam: RechazoParams;
  dataRS: any;

 

  constructor(
    public dialog: MatDialog,
    private AquirerService: AquirerService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
  ) { }

  emisorNacionalCol: string[] = ['modificar', 'fechaLote', 'vTipo', 'mImp', 'vNumReferencia',
  'ClaveMoneda', 'iImp', 'pobNegocio', 'codPais', 'codPais'];
  dataSource: any;

  dataEmisorNacional = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  openOpciones(): void{
    this.dialog.open(ModalCargaEmisorComponent)
  }

  ngOnInit() {
  
    this.Rechazo = this.formBuilder.group({
      pvFechaIni: [''],
      pvFechaFin: [''],
      pvCodTransaccion: ['', Validators.required],
     
    });



  }


  onSubmit() {
    var fechaI = !this.Rechazo.value.pvFechaIni ? this.fechaactual.value : this.Rechazo.value.pvFechaIni;
    var fechaF = !this.Rechazo.value.pvFechaFin ? this.fechaactual.value : this.Rechazo.value.pvFechaFin;
    this.Rechazo.value.pvFechaIni = this.datePipe.transform(fechaI, 'yyyyMMdd');
    this.Rechazo.value.pvFechaFin = this.datePipe.transform(fechaF, 'yyyyMMdd');
   


    this.AquirerService.postCargaEmisor()
      .subscribe(
        data => {
   
          console.log("Aqui va el DATA", data);
          if (data.length == 0) {
            Swal.fire({
              icon: 'info',
              text: 'No hay datos!'
            })

          } else {
            this.dataEmisorNacional = new MatTableDataSource(data);
            localStorage.setItem('dataEmisorNacional', JSON.stringify(data));
            this.dataEmisorNacional.paginator = this.paginator;
          }

        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Error al obtener los rechazos',
            text: 'Favor de reportarlo al administrador del sistema'
          })
          console.log("Error", error);
          this.dataEmisorNacional = new MatTableDataSource();
          localStorage.clear();
        });

  }
  
  //-------------------------REPORTE DE EXCE----------------------------///
  exportexcel() {
    {
       /* table id is passed over here */   
      this.dataRS = this.dataEmisorNacional;  
      console.log('data RS',this.dataRS.filteredData)
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataRS.filteredData);
      /* generate workbook and add the worksheet */
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
        XLSX.utils.sheet_add_json(ws,[{A1: "Fecha de Proceso"},],
            {header: ["A1"],skipHeader:true, origin: "A1"} );
        XLSX.utils.sheet_add_json(ws,[{B1: "´No. de Afiliación"},],
            {header: ["B1"],skipHeader:true,origin: "B1"});
        XLSX.utils.sheet_add_json(ws,[{C1: "No. de Autorización"},],
            {header: ["C1"],skipHeader:true,origin: "C1"});
        XLSX.utils.sheet_add_json(ws,[{D1: "No. Plastico"},],
            {header: ["D1"],skipHeader:true,origin: "D1"});
        XLSX.utils.sheet_add_json(ws,[{E1: "No. de Referencia"},],
            {header: ["E1"],skipHeader:true,origin: "E1"});
        XLSX.utils.sheet_add_json(ws,[{F1: "Importe TXN"},],
            {header: ["F1"],skipHeader:true,origin: "F1"});
        XLSX.utils.sheet_add_json(ws,[{G1: "Fecha TXN"},],
            {header: ["G1"],skipHeader:true,origin: "G1"});
        XLSX.utils.sheet_add_json(ws,[{H1: "ARQC"},],
            {header: ["H1"],skipHeader:true,origin: "H1"});
        XLSX.utils.sheet_add_json(ws,[{I1: "RRN"},],
            {header: ["I1"],skipHeader:true,origin: "I1"});
        XLSX.utils.sheet_add_json(ws,[{J1: "Reg. llave"},],
            {header: ["J1"],skipHeader:true,origin: "J1"});
        XLSX.utils.sheet_add_json(ws,[{K1: "Plataforma"},],
            {header: ["K1"],skipHeader:true,origin: "K1"});
        XLSX.utils.sheet_add_json(ws,[{L1: "Estatus"},],
            {header: ["L1"],skipHeader:true,origin: "L1"});
        XLSX.utils.sheet_add_json(ws,[{M1: "Folio Eglobal"},],
            {header: ["M1"],skipHeader:true,origin: "M1"});

        XLSX.utils.book_append_sheet(wb, ws, 'Reporte Confirmacion');
      /* save to file */
      var nombre= "Rechazos de Sintaxis-BBVA-"+ this.Rechazo.value.pvFechaIni;
        XLSX.writeFile(wb, nombre+'.xlsx');
      //XLSX.writeFile(wb, 'Rechaszo de Sintaxis.xlsx');
        
}
  

}


}
