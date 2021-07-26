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
import { DateAdapter } from '@angular/material/core';
@Component({
  selector: 'app-rechazo-sintaxis',
  templateUrl: './rechazo-sintaxis.component.html',
  styleUrls: ['./rechazo-sintaxis.component.css']
})
export class RechazoSintaxisComponent implements OnInit {
  fechaactual = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
Rechazo: any;
estatus: any;
dataRS: any;
RechazoFechas:any;
DetalleSintaxis: any;

 constructor(public dialog: MatDialog, private formBuilder: FormBuilder, private router: Router, 
        private datePipe: DatePipe, private AquirerService: AquirerService) 
 { }
  sintaxisColumns: string[] = ['myColumn','dtFechaProceso', 'vNoAfiliacion', 'vNumAutoriza', 
  'vNoPlastico', 'vNumRef', 'mImpTxn', 'vFeTxn','vFolioEgl'];
        // 'vArqc', 'vRrn', 'vRegLlave', 'vPlataforma'];
 //dataSource =  new MatTableDataSource<RechazoDTO>(elemen_data);
 dataRechazoSintaxis = new MatTableDataSource();
 @ViewChild(MatPaginator , {static: true}) paginator: MatPaginator;
  ngOnInit() {
    
        this.Rechazo = this.formBuilder.group({
          pvFechaIni :[''], 
          pvFechaFin : [''], 
          pvEstatus: ['',Validators.required]
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
      vFolioEgl: [''],
      vCompleAut:  [''],
      vIdBonus:  [''],
      vNoSerieTerminal: [''],
      vEstatus: ['']
    });

    this.AquirerService.getObtenerCatalogosCARechazoSintaxis().subscribe(response => {
          this.estatus = response;
          console.log("gFechas",  response);
        });
    
   // this.dataRechazoSintaxis = new MatTableDataSource(JSON.parse(localStorage.getItem('dataRechazoSintaxis')));    
    this.dataRechazoSintaxis.paginator = this.paginator;
  }

    openDetalle(detalle) {
    //this.dialog.open(obtenerrechazo);
    this.detalleS(detalle);
  }
  public checkError = (controlName: string, errorName: string) => {
    return this.Rechazo.controls[controlName].hasError(errorName);
  }
   onSubmit() {
    var fechaIni = !this.Rechazo.value.pvFechaIni ? this.fechaactual.value : this.Rechazo.value.pvFechaIni;
    var fechaFin = !this.Rechazo.value.pvFechaFin ? this.fechaactual.value : this.Rechazo.value.pvFechaFin;
    fechaIni = this.datePipe.transform(fechaIni, 'yyyyMMdd');
    fechaFin = this.datePipe.transform(fechaFin, 'yyyyMMdd');

     // var fechaIni = this.Rechazo.value.pvFechaIni;
     // var fechaFin = this.Rechazo.value.fechaactual;
      var estatus= this.Rechazo.value.pvEstatus
     // fechaIni = this.datePipe.transform(fechaIni, 'yyyyMMdd');
     // fechaFin = this.datePipe.transform(fechaFin, 'yyyyMMdd');
    // console.log("fecha prueba",fechaIni,fechaFin,estatus)
        this.AquirerService.getConsultaRechSintaxis(fechaIni,fechaFin,estatus)
        .subscribe(
            data  => {
                console.log("getConsultaRechSintaxis Request is successful", data);
                console.log("Aqui va el DATA", data);
          if (data.length == 0 || data== null) {
            Swal.fire({
              icon: 'info',
              text: 'No hay datos!'
            })
            this.dataRechazoSintaxis = new MatTableDataSource(data);
    
                } else {
            this.dataRechazoSintaxis = new MatTableDataSource(data);
            this.dataRechazoSintaxis.paginator = this.paginator; 
          }

        },
        error => {
          Swal.fire({
            icon: 'error',
            
            title: 'Error',
            text: 'Problema Interno!'
          })
          console.log("Error", error);
          this.dataRechazoSintaxis = new MatTableDataSource();
         // localStorage.clear();
        });

  }
    applyFilter(filterValue: string) {
    this.dataRechazoSintaxis.filter = filterValue.trim().toLowerCase();
  }
     detalleS(element) {
       console.log("Aqui va el DATA 123", element);
        var pvFechaIni = this.datePipe.transform(this.Rechazo.value.pvFechaIni,'yyyyMMdd');
        var pvFechaFin = this.datePipe.transform(this.Rechazo.value.pvFechaFin,'yyyyMMdd');
        var folioEgl= element.vFolioEgl;
        var pvEstatus= this.Rechazo.value.pvEstatus;
        console.log("Aqui va el DATA 123", pvFechaIni,pvFechaFin,folioEgl,pvEstatus);
        this.AquirerService.getObtenerRechSintaxis(pvFechaIni,pvFechaFin,folioEgl,pvEstatus)
        .subscribe(
            data2  => {
              this.DetalleSintaxis= data2;
              console.log("Aqui va el DATA2",data2)
                //console.log("data venta Request is successful ",DetalleSintaxis); 
                const dialogRef = this.dialog.open(obtenerrechazo,{

                  data:{
                    detalleRechazo:{
                      dtFechaProceso:  this.datePipe.transform(this.DetalleSintaxis[0].dtFechaProceso, 'yyyyMMdd'),
                      //iNoLote:Number(this.DetalleSintaxis[0].iNoLote),
                      iNoLote:this.DetalleSintaxis[0].iNoLote,
                      mImpTxn:this.DetalleSintaxis[0].mImpTxn,
                      mMontoRet:this.DetalleSintaxis[0].mMontoRet,
                      vArqc:this.DetalleSintaxis[0].vArqc,
                      vCodEmi:this.DetalleSintaxis[0].vCodEmi,
                      vCodErr:this.DetalleSintaxis[0].vCodErr,
                      vCodRiesgo:this.DetalleSintaxis[0].vCodRiesgo,
                      vCodServicio:this.DetalleSintaxis[0].vCodServicio,
                      vCodTra:this.DetalleSintaxis[0].vCodTra,
                      vCompleAut:this.DetalleSintaxis[0].vCompleAut,
                      vCtroReg:this.DetalleSintaxis[0].vCtroReg,
                      vDifPromo:this.DetalleSintaxis[0].vDifPromo,
                      vFolioEgl:folioEgl,
                      vEstatus:this.DetalleSintaxis[0].vEstatus,
                      vExtAutoriza:this.DetalleSintaxis[0].vExtAutoriza,
                      vFeCaptura:this.DetalleSintaxis[0].vFeCaptura,
                      vFeExpira:this.DetalleSintaxis[0].vFeExpira,
                      vFeTxn:this.DetalleSintaxis[0].vFeTxn,
                      vHorTtxn:this.DetalleSintaxis[0].vHorTtxn,
                      vIdAdq:this.DetalleSintaxis[0].vIdAdq,
                      vIdBonus:this.DetalleSintaxis[0].vIdBonus,
                      vIdEmi:this.DetalleSintaxis[0].vIdEmi,
                      vIdTerminal:this.DetalleSintaxis[0].vIdTerminal,
                      vIndRedCel:this.DetalleSintaxis[0].vIndRedCel,
                      vInstCode:this.DetalleSintaxis[0].vInstCode,
                      vInstIdCode:this.DetalleSintaxis[0].vInstIdCode,
                      vNoAfiliacion:this.DetalleSintaxis[0].vNoAfiliacion,
                      vNoPlastico:this.DetalleSintaxis[0].vNoPlastico,
                      vNoSerieTerminal:this.DetalleSintaxis[0].vNoSerieTerminal,
                      vNumAutoriza:this.DetalleSintaxis[0].vNumAutoriza,
                      vNumBatchterm:this.DetalleSintaxis[0].vNumBatchterm,
                      vNumRef:this.DetalleSintaxis[0].vNumRef,
                      vNumTxnTerm:this.DetalleSintaxis[0].vNumTxnTerm,
                      vParcializ:this.DetalleSintaxis[0].vParcializ,
                      vPlataforma:this.DetalleSintaxis[0].vPlataforma,
                      vPosEntryMode:this.DetalleSintaxis[0].vPosEntryMode,
                      vRegLlave:this.DetalleSintaxis[0].vRegLlave,
                      vRrn:this.DetalleSintaxis[0].vRrn,
                      vStatusFlujo:this.DetalleSintaxis[0].vStatusFlujo,
                      vStatusServer:this.DetalleSintaxis[0].vStatusServer,
                      vTipPlan:this.DetalleSintaxis[0].vTipPlan,
                      vTipoReg:this.DetalleSintaxis[0].vTipoReg,
                      vTrmlCapability:this.DetalleSintaxis[0].vTrmlCapability,
                    },
                    //folioEgl
                  }
                });
             // this.Rechazo.setValue(data);

            },
            error  => {
                Swal.fire({
                            icon: 'error',
                            title: 'Error',
                            text: 'Problema Interno!'
                          })
                console.log("Error", error);
            }

            );

    }
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
@Component({
  selector: 'app-rechazo-sintaxis',
  templateUrl: 'obtenerrechazo.html',
 
})
export class obtenerrechazo {
  ARechazoSintaxisDTO:any;
  constructor(
        public dialogRef: MatDialogRef<obtenerrechazo>,
        @Inject(MAT_DIALOG_DATA) public data: any,   
       @Inject(AquirerService) public AquirerService
  ) { }

  ngOnInit() {

   
  }
valida(data) {
    Swal.fire({
      title: 'Confirmar la Modificación',
      showDenyButton: true,
      confirmButtonText: `Modificar`,
      denyButtonText: `Cancelar`,
    }).then((result) => {
      console.log("Modificar ", data);
      this.ARechazoSintaxisDTO= new Object();
      this.ARechazoSintaxisDTO={
         dtFechaProceso:data.detalleRechazo.dtFechaProceso,
        iNoLote:data.detalleRechazo.iNoLote,
        mImpTxn:data.detalleRechazo.mImpTxn,
        mMontoRet:data.detalleRechazo.mMontoRet,
        vArqc:data.detalleRechazo.vArqc,
        vCodEmi:data.detalleRechazo.vCodEmi,
        vCodErr:                data.detalleRechazo.vCodErr,
        vCodRiesgo:data.detalleRechazo.vCodRiesgo,
        vCodServicio:data.detalleRechazo.vCodServicio,
        vCodTra:data.detalleRechazo.vCodTra,
        vCompleAut:data.detalleRechazo.vCompleAut,
        vCtroReg:data.detalleRechazo.vCtroReg,
        vDifPromo:data.detalleRechazo.vDifPromo,
        vEstatus:data.detalleRechazo.vEstatus,
        vExtAutoriza:data.detalleRechazo.vExtAutoriza,
        vFeCaptura:data.detalleRechazo.vFeCaptura,
        vFeExpira:data.detalleRechazo.vFeExpira,
        vFeTxn:data.detalleRechazo.vFeTxn,
        vFolioEgl:data.detalleRechazo.vFolioEgl,
        vHorTtxn:data.detalleRechazo.vHorTtxn,
        vIdAdq:data.detalleRechazo.vIdAdq,
        vIdBonus:data.detalleRechazo.vIdBonus,
        vIdEmi:data.detalleRechazo.vIdEmi,
        vIdTerminal:data.detalleRechazo.vIdTerminal,
        vIndRedCel:data.detalleRechazo.vIndRedCel,
        vInstCode:data.detalleRechazo.vInstCode,
        vInstIdCode:data.detalleRechazo.vInstIdCode,
        vNoAfiliacion:data.detalleRechazo.vNoAfiliacion,
        vNoPlastico:data.detalleRechazo.vNoPlastico,
        vNoSerieTerminal:data.detalleRechazo.vNoSerieTerminal,
        vNumAutoriza:data.detalleRechazo.vNumAutoriza,
        vNumBatchterm:data.detalleRechazo.vNumBatchterm,
        vNumRef:data.detalleRechazo.vNumRef,
        vNumTxnTerm:data.detalleRechazo.vNumTxnTerm,
        vParcializ:data.detalleRechazo.vParcializ,
        vPlataforma:data.detalleRechazo.vPlataforma,
        vPosEntryMode:data.detalleRechazo.vPosEntryMode,
        vRegLlave:data.detalleRechazo.vRegLlave,
        vRrn:data.detalleRechazo.vRrn,
        vStatusFlujo:data.detalleRechazo.vStatusFlujo,
        vStatusServer:data.detalleRechazo.vStatusServer,
        vTipPlan:data.detalleRechazo.vTipPlan,
        vTipoReg:data.detalleRechazo.vTipoReg,
        vTrmlCapability:data.detalleRechazo.vTrmlCapability,
      }
      console.log("prueba objeto", this.ARechazoSintaxisDTO);
      this.AquirerService.postActualizaRechazoSintaxis(this.ARechazoSintaxisDTO).subscribe(
        data2 => {
          console.log("postActualizaRechazoSintaxis Request is successful Respuesta", data2);
          if (data2.vError=="0") {
        Swal.fire('Modificación Correcta!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Modificación no Aplicada', '', 'info')
      }
        }, error => {
          Swal.fire('Error en el sericio')
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
