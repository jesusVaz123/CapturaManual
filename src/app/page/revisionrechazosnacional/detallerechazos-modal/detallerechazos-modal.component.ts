import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from "@angular/forms";
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MatSort, MAT_DIALOG_DATA } from '@angular/material';
import { AquirerService } from 'src/app/service/aquirer.service';
import { fuentepapelParam } from 'src/app/model/fuentepapelParam.model';
import Swal from 'sweetalert2';
import * as xlsx from 'xlsx';
import * as XLSX from 'xlsx';
import { ModificacionRechazoModalComponent } from 'src/app/page/revisionrechazosnacional/modificacion-rechazo-modal/modificacion-rechazo-modal.component';
import { rechazonacional } from 'src/app/model/rechazonacional.model';
import { CommonModule, DatePipe } from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap, map, catchError } from 'rxjs/operators';
import { detallerechazoNac } from 'src/app/model/detallerechazoNac.model';
import { RechazoParams } from 'src/app/model/RechazoParams.model';
@Component({
  selector: 'app-detallerechazos-modal',
  templateUrl: './detallerechazos-modal.component.html',
  styleUrls: ['./detallerechazos-modal.component.css']
})
export class DetallerechazosModalComponent implements OnInit {
  public _fuentepapelParam: fuentepapelParam;
  public _rechazoParam: RechazoParams;
  public detalleRechazo: FormGroup;
  public rechazoMO: detallerechazoNac;
  dataFuentePapel = new MatTableDataSource();
  public accion: String;
  constructor(
    public AquirerService: AquirerService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder

  ) { }
  archivoftepColumns: string[] = ['Comparar', 'codregistro', 'vNoCuenta', 'vNumNeg', 'tipotrans'
    , 'importe', 'referencia'];

  applyFilter(filterValue: string) {
    this.dataFuentePapel.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  public ngOnInit(): void {

    //this.accion = 'SASI-Si Abono, Si Intercambio';

    this.AquirerService.getCatalogosAcciones().subscribe(
      data => {
        this.accion = data[1].vDescripcion;
      }, error => {
        Swal.fire({
          icon: 'error',
          title: 'Error al obtener datos',
          text: 'Favor de reportarlo al administrador del sistema'
        })

      });



    this.detalleRechazo = this.formBuilder.group({
      vFolio: [''],
      vFecRem: [''],
      vTipRecha: [''],
      vNumNeg: [''],
      vNomNeg: [''],
      vNumCuenta: [''],
      vNatTarj: [''],
      vNumAut: [''],
      vTipTxn: [''],
      vBanNeg: [''],
      vEmisor: [''],
      vGiro: [''],
      vTerminal: [''],
      vFecOrigDD: [''],
      vFecOrigMM: [''],
      vFecOrigYY: [''],
      vFecOrigHH: [''],
      vFecOrigMin: [''],
      vFecOrigSS: [''],
      vCodTxn: [''],
      vTipMsj: [''],
      vPEM: [''],
      vRedLog: [''],
      vDraftCapt: [''],
      vCodResp: [''],
      mImpTxn: [''],
      vCdTerm: [''],
      vVencimiento: [''],
      vMonComp: [''],
      vOrigMsj: [''],
      vOrigResp: [''],
      vFiller1: [''],
      vDat1: [''],
      vDat2: [''],
      vDat3: [''],
      vNumReferencia: [''],
      vPagDif: [''],
      vBanderaCash: [''],
      mImporteCash: [''],
      vMedComunicacion: [''],
      vRRN: [''],
      vUCAF: [''],
      v3DSec: [''],
      vCodEci: [''],
      vTokenQ2: [''],
      vTokenC4: [''],
      vDest: [''],
      vCVV2: [''],
      vLote: [''],
      vFiller2: [''],
      iEmisor: [''],
      vRegLlave: ['']

    });

    //    this._fuentepapelParam = new fuentepapelParam('2424223', '42343234', '432424234');
    this.route.params.subscribe(params => this.AquirerService.getFuentepapel()
      .subscribe(
        data => {
          console.log("fuente papel",data)
          if (!data) {
            Swal.fire({
              icon: 'info',
              text: 'No hay datos!'
            })
          } else {
            this.dataFuentePapel = new MatTableDataSource(data);
            this.dataFuentePapel.paginator = this.paginator;
            this.dataFuentePapel.sort = this.sort;
          }
        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Error al obtener datos',
            text: 'Favor de reportarlo al administrador del sistema'
          })

        }));


    this.route.params.subscribe(params =>

      this.AquirerService.postConsultaRechazo(this._rechazoParam)
        .subscribe(
          data => {
            console.log("postConsultaRechazo",data)
            if (!data) {
              Swal.fire({
                icon: 'info',
                text: 'No hay datos!'
              })
            } else {
              this.detalleRechazo.setValue(data[0]);
            }

          },
          error => {
            Swal.fire({
              icon: 'error',
              title: 'Error al obtener el detalle del rechazo',
              text: 'Favor de reportarlo al administrador del sistema'
            })

          }));

  }


}