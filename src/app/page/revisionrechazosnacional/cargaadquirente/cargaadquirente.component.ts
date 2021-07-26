import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ModalCargaAdquirenteComponent } from 'src/app/page/revisionrechazosnacional/modal-carga-adquirente/modal-carga-adquirente.component';
import { AquirerService } from 'src/app/service/aquirer.service';
import { LCatalogosDTO } from 'src/app/model/lCatalogosDTO';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from "@angular/forms";
import { RechazoParams } from 'src/app/model/RechazoParams.model';
import { DatePipe } from "@angular/common";
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-cargaadquirente',
  templateUrl: './cargaadquirente.component.html',
  styleUrls: ['./cargaadquirente.component.scss']
})
export class CargaadquirenteComponent implements OnInit {

  fechaactual = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
  Rechazo: any;

  dataRS: any;

  //_codtxn: LCatalogosDTO[];

  constructor(
    public dialog: MatDialog,
    private AquirerService: AquirerService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
  ) { }

  cargaAdquirenteCol: string[] = ['modificar', 'folioRechazo', 'folio', 'fecCarga', 'accionRechazo',
    'estatus', 'numNeg', 'nomNeg', 'numCuenta', 'numAut'];
 

  dataCargaAdquirente = new MatTableDataSource();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  openOpciones() {
    this.dialog.open(ModalCargaAdquirenteComponent)
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



    this.AquirerService.postCargaAdquirente()
      .subscribe(
        data => {
         
          console.log("Aqui va el DATA", data);
          if (data.length == 0) {
            Swal.fire({
              icon: 'info',
              text: 'No hay datos!'
            })

          } else {
            this.dataCargaAdquirente = new MatTableDataSource(data);
            localStorage.setItem('dataCargaAdquirente', JSON.stringify(data));
            this.dataCargaAdquirente.paginator = this.paginator;
          }

        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Error al obtener los rechazos',
            text: 'Favor de reportarlo al administrador del sistema'
          })
          console.log("Error", error);
          this.dataCargaAdquirente = new MatTableDataSource();
          localStorage.clear();
        });

  }
  //-------------------EXCEL--------------------------//
  exportexcel() {
    {
      /* table id is passed over here */
      this.dataRS = this.dataCargaAdquirente;
      console.log('data RS', this.dataRS.filteredData)
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(this.dataRS.filteredData);
      /* generate workbook and add the worksheet */
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.sheet_add_json(ws, [{ A1: "vFolioRechazo" },],
        { header: ["A1"], skipHeader: true, origin: "A1" });
      XLSX.utils.sheet_add_json(ws, [{ B1: "iFolio" },],
        { header: ["B1"], skipHeader: true, origin: "B1" });
      XLSX.utils.sheet_add_json(ws, [{ C1: "dtFecCarga" },],
        { header: ["C1"], skipHeader: true, origin: "C1" });
      XLSX.utils.sheet_add_json(ws, [{ D1: "iAccionRechazo" },],
        { header: ["D1"], skipHeader: true, origin: "D1" });
      XLSX.utils.sheet_add_json(ws, [{ E1: "iEstatus" },],
        { header: ["E1"], skipHeader: true, origin: "E1" });
      XLSX.utils.sheet_add_json(ws, [{ F1: "vNumNeg" },],
        { header: ["F1"], skipHeader: true, origin: "F1" });
      XLSX.utils.sheet_add_json(ws, [{ G1: "vNomNeg" },],
        { header: ["G1"], skipHeader: true, origin: "G1" });
      XLSX.utils.sheet_add_json(ws, [{ H1: "vNumCuenta" },],
        { header: ["H1"], skipHeader: true, origin: "H1" });
      XLSX.utils.sheet_add_json(ws, [{ I1: "vNumAut" },],
        { header: ["I1"], skipHeader: true, origin: "I1" });
      XLSX.utils.sheet_add_json(ws, [{ J1: "vTerminal" },],
        { header: ["J1"], skipHeader: true, origin: "J1" });
      XLSX.utils.sheet_add_json(ws, [{ K1: "vFecOrig" },],
        { header: ["K1"], skipHeader: true, origin: "K1" });
      XLSX.utils.sheet_add_json(ws, [{ L1: "vCodTxn" },],
        { header: ["L1"], skipHeader: true, origin: "L1" });
      XLSX.utils.sheet_add_json(ws, [{ M1: "vPEM" },],
        { header: ["M1"], skipHeader: true, origin: "M1" });
      XLSX.utils.sheet_add_json(ws, [{ M1: "mImpTxn" },],
        { header: ["M1"], skipHeader: true, origin: "N1" });
      XLSX.utils.sheet_add_json(ws, [{ M1: "vPagDif" },],
        { header: ["M1"], skipHeader: true, origin: "O1" });
      XLSX.utils.sheet_add_json(ws, [{ M1: "mImporteCash" },],
        { header: ["M1"], skipHeader: true, origin: "P1" });
      XLSX.utils.sheet_add_json(ws, [{ M1: "vRRN" },],
        { header: ["M1"], skipHeader: true, origin: "Q1" });  
      XLSX.utils.sheet_add_json(ws, [{ M1: "vTokenC4" },],
        { header: ["M1"], skipHeader: true, origin: "R1" });  
      XLSX.utils.sheet_add_json(ws, [{ M1: "vReferencia" },],
        { header: ["M1"], skipHeader: true, origin: "S1" });  
      XLSX.utils.sheet_add_json(ws, [{ M1: "iEmisor" },],
        { header: ["M1"], skipHeader: true, origin: "T1" });  
      XLSX.utils.sheet_add_json(ws, [{ M1: "iEmisor" },],
        { header: ["M1"], skipHeader: true, origin: "iAdquirente" });  

      XLSX.utils.book_append_sheet(wb, ws, 'Reporte Confirmacion');
      /* save to file */
      var nombre = "Rechazos de Sintaxis-BBVA-" + this.Rechazo.value.pvFechaIni;
      XLSX.writeFile(wb, nombre + '.xlsx');
      //XLSX.writeFile(wb, 'Rechaszo de Sintaxis.xlsx');

    }


  }

}

