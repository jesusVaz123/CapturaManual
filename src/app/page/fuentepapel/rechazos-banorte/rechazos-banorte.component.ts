import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators,FormArray,FormControl} from "@angular/forms";
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
 import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AquirerService } from 'src/app/service/aquirer.service';
import { Rechazo } from 'src/app/model/rechazo.model';
import { Router } from "@angular/router";
import { DatePipe } from "@angular/common";
import { DetalleSintaxis } from 'src/app/model/detallesintaxis.model';
import Swal from 'sweetalert2';
import * as xlsx from 'xlsx';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-rechazos-banorte',
  templateUrl: './rechazos-banorte.component.html',
  styleUrls: ['./rechazos-banorte.component.css']
})
export class RechazosBanorteComponent implements OnInit {

  fechaactual = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
Rechazo: any;
estatus: any;
dataRS: any;
DetalleSintaxis: any;
 constructor(public dialog: MatDialog, private formBuilder: FormBuilder, private router: Router, 
        private datePipe: DatePipe, private AquirerService: AquirerService) { }
  sintaxisColumns: string[] = ['myColumn','dtFechaProceso', 'vNoAfiliacion', 'vNumAutoriza', 'vNoPlastico', 'vNumRef', 'mImpTxn', 'vFeTxn'];
        // 'vArqc', 'vRrn', 'vRegLlave', 'vPlataforma'];
 //dataSource =  new MatTableDataSource<RechazoDTO>(elemen_data);
 dataRechazoSintaxis = new MatTableDataSource();
 @ViewChild(MatPaginator , {static: true}) paginator: MatPaginator;
  ngOnInit() {
    
        this.Rechazo = this.formBuilder.group({
          pvFechaIni :[''], 
          pvFechaFin : [''], 
          pvEstatus: ['']
        });
    this.DetalleSintaxis = this.formBuilder.group({
      dtFechaProceso: [''],
      vTipoReg: [''],
      vCtroReg: [''],
      vNoAfiliacion: [''],
      vIdTerminal: [''],
      vCodTra: [''],
      vPosEntryMode: [''],
      vNumAutoriza: [''],
      vExtAutoriza:   [''],
      vNumBatchterm: [''],
      vNumTxnTerm: [''],
      vCodEmi: [''],
      vNoPlastico:     [''],
      vFeExpira: [''],
      mImpTxn: [''],
      vFeTxn: [''],
      vHorTtxn: [''],
      vFeCaptura: [''],
      vInstCode: [''],
      vInstIdCode: [''],
      vStatusServer: [''],
      mMontoRet: [''],
      vIndRedCel:  [''],
      vArqc: [''],
      vRrn: [''],
      vTrmlCapability: [''],
      vCodServicio: [''],
      vRegLlave: [''],
      iNoLote: [''],
      vCodErr:  [''],
      vIdEmi: [''],
      vIdAdq: [''],
      vCodRiesgo: [''],
      vNumRef: [''],
      vStatusFlujo: [''],
      vPlataforma: [''],
      vDifPromo: [''],
      vParcializ: [''],
      vTipPlan: [''],
      vDuracion: [''],
      vCompleAut:  [''],
      vIdBonus:  [''],
      vNoSerieTerminal: [''],
      vEstatus: ['']
    });

    
    this.dataRechazoSintaxis = new MatTableDataSource(JSON.parse(localStorage.getItem('dataRechazoSintaxis')));    
    this.dataRechazoSintaxis.paginator = this.paginator;
  }

  //   openDetalle(detalle) {
  //   //this.dialog.open(obtenerrechazo);
  //   this.detalleS(detalle);
  // }
   onSubmit() {
        var fechaI = this.Rechazo.value.pvFechaIni;
        var fechaF = this.Rechazo.value.pvFechaFin;
        this.Rechazo.value.pvFechaIni = this.datePipe.transform(fechaI, 'yyyyMMdd');
        this.Rechazo.value.pvFechaFin = this.datePipe.transform(fechaF, 'yyyyMMdd');
        fechaI = this.Rechazo.value.pvFechaIni;
       
        //this.AquirerService.getObtieneReporteGRRCN(JSON.parse(JSON.stringify(this.Confirmation.value)))

    
  }
    applyFilter(filterValue: string) {
    this.dataRechazoSintaxis.filter = filterValue.trim().toLowerCase();
  }
    //  detalleS(element) {
    //     var pvFechaIni = this.Rechazo.value.pvFechaIni;
    //     var pvFechaFin = this.Rechazo.value.pvFechaFin;
    //     var pvCuenta = element.vNoPlastico;
    //     var pvReferencia = element.vNumRef;
    //     var pvImporte = element.mImpTxn;
    //     var pvRegLlave = element.vRegLlave;
    //     var pvEstatus= this.Rechazo.value.pvEstatus;
    //     console.log("aqui cuenta ",this.Rechazo.value.pvFechaIni);
    //     this.AquirerService.getObtenerRechSintaxis(pvFechaIni,pvFechaFin,pvCuenta,pvReferencia,pvImporte,pvRegLlave,pvEstatus)
    //     .subscribe(
    //         data2  => {
    //           this.DetalleSintaxis= data2;
    //           console.log("Aqui va el DATA2",data2)
    //             console.log("data venta Request is successful ",DetalleSintaxis); 
    //             const dialogRef = this.dialog.open(obtenerrechazo,{
    //               data:{
    //              dtFechaProceso: this.DetalleSintaxis[0].dtFechaProceso,
    //              mImpTxn:this.DetalleSintaxis[0].mImpTxn,
    //              mMontoRet:this.DetalleSintaxis[0].mMontoRet,
    //              vArqc:this.DetalleSintaxis[0].vArqc,
    //              vCodEmi:this.DetalleSintaxis[0].vCodEmi,
    //              vCodErr:this.DetalleSintaxis[0].vCodErr,
    //              vCodRiesgo:this.DetalleSintaxis[0].vCodRiesgo,
    //              vCodServicio:this.DetalleSintaxis[0].vCodServicio,
    //              vCodTra:this.DetalleSintaxis[0].vCodTra,
    //              vCompleAut:this.DetalleSintaxis[0].vCompleAut,
    //              vCtroReg:this.DetalleSintaxis[0].vCtroReg,
    //              vDifPromo:this.DetalleSintaxis[0].vDifPromo,
    //              vDuracion:this.DetalleSintaxis[0].vDuracion,
    //              vEstatus:this.DetalleSintaxis[0].vEstatus,
    //              vExtAutoriza:this.DetalleSintaxis[0].vExtAutoriza,
    //              vFeCaptura:this.DetalleSintaxis[0].vFeCaptura,
    //              vFeExpira:this.DetalleSintaxis[0].vFeExpira,
    //              vFeTxn:this.DetalleSintaxis[0].vFeTxn,
    //              vHorTtxn:this.DetalleSintaxis[0].vHorTtxn,
    //              vIdAdq:this.DetalleSintaxis[0].vIdAdq,
    //              vIdBonus:this.DetalleSintaxis[0].vIdBonus,
    //              vIdEmi:this.DetalleSintaxis[0].vIdEmi,
    //              vIdTerminal:this.DetalleSintaxis[0].vIdTerminal,
    //              vIndRedCel:this.DetalleSintaxis[0].vIndRedCel,
    //              vInstCode:this.DetalleSintaxis[0].vInstCode,
    //              vInstIdCode:this.DetalleSintaxis[0].vInstIdCode,
    //              vNoAfiliacion:this.DetalleSintaxis[0].vNoAfiliacion,
    //              vNoPlastico:this.DetalleSintaxis[0].vNoPlastico,
    //              vNoSerieTerminal:this.DetalleSintaxis[0].vNoSerieTerminal,
    //              vNumAutoriza:this.DetalleSintaxis[0].vNumAutoriza,
    //              vNumBatchterm:this.DetalleSintaxis[0].vNumBatchterm,
    //              vNumRef:this.DetalleSintaxis[0].vNumRef,
    //              vNumTxnTerm:this.DetalleSintaxis[0].vNumTxnTerm,
    //              vParcializ:this.DetalleSintaxis[0].vParcializ,
    //              vPlataforma:this.DetalleSintaxis[0].vPlataforma,
    //              vPosEntryMode:this.DetalleSintaxis[0].vPosEntryMode,
    //              vRegLlave:this.DetalleSintaxis[0].vRegLlave,
    //              vRrn:this.DetalleSintaxis[0].vRrn,
    //              vStatusFlujo:this.DetalleSintaxis[0].vStatusFlujo,
    //              vStatusServer:this.DetalleSintaxis[0].vStatusServer,
    //              vTipPlan:this.DetalleSintaxis[0].vTipPlan,
    //              vTipoReg:this.DetalleSintaxis[0].vTipoReg,
    //              vTrmlCapability:this.DetalleSintaxis[0].vTrmlCapability,
    //               }
    //             });
    //          // this.Rechazo.setValue(data);

    //         },
    //         error  => {
    //             Swal.fire({
    //                         icon: 'error',
    //                         title: 'Oops...',
    //                         text: 'Algo salió mal!'
    //                       })
    //             console.log("Error", error);
    //         }

    //         );

    // }
    exportexcel() {
        {
           /* table id is passed over here */   
          this.dataRS = this.dataRechazoSintaxis;  
          console.log('data RS',this.dataRS.filteredData)
          const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataRS.filteredData);
          /* generate workbook and add the worksheet */
          const wb: XLSX.WorkBook = XLSX.utils.book_new();
            XLSX.utils.sheet_add_json(ws,[{A1: "Fecha de Proceso"},],
                {header: ["A1"],skipHeader:true, origin: "A1"} );
            XLSX.utils.sheet_add_json(ws,[{B1: "Importe TXN"},],
                {header: ["B1"],skipHeader:true,origin: "B1"});
            XLSX.utils.sheet_add_json(ws,[{C1: "vArqc"},],
                {header: ["C1"],skipHeader:true,origin: "C1"});
            XLSX.utils.sheet_add_json(ws,[{D1: "Fecha TXN"},],
                {header: ["D1"],skipHeader:true,origin: "D1"});
            XLSX.utils.sheet_add_json(ws,[{E1: "No. Afiliación"},],
                {header: ["E1"],skipHeader:true,origin: "E1"});
            XLSX.utils.sheet_add_json(ws,[{F1: "No. Plastico"},],
                {header: ["F1"],skipHeader:true,origin: "F1"});
            XLSX.utils.sheet_add_json(ws,[{G1: "No. Autorización"},],
                {header: ["G1"],skipHeader:true,origin: "G1"});
            XLSX.utils.sheet_add_json(ws,[{H1: "No. de Referencia"},],
                {header: ["H1"],skipHeader:true,origin: "H1"});
            XLSX.utils.sheet_add_json(ws,[{I1: "Plataforma"},],
                {header: ["I1"],skipHeader:true,origin: "I1"});
            XLSX.utils.sheet_add_json(ws,[{J1: "Reg. llave"},],
                {header: ["J1"],skipHeader:true,origin: "J1"});
            XLSX.utils.sheet_add_json(ws,[{K1: "Vrrn"},],
                {header: ["K1"],skipHeader:true,origin: "K1"});

            XLSX.utils.book_append_sheet(wb, ws, 'Reporte Confirmacion');
          /* save to file */
          XLSX.writeFile(wb, 'Rechaszo de Sintaxis.xlsx');
            
    }
  }
}
