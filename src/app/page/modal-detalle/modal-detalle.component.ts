import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { AquirerService } from 'src/app/service/aquirer.service';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from "@angular/forms";
import Swal from 'sweetalert2';
import { ActivatedRoute, Params } from '@angular/router';
import { RechazoParams } from 'src/app/model/RechazoParams.model';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-modal-detalle',
  templateUrl: './modal-detalle.component.html',
  styleUrls: ['./modal-detalle.component.css']
})
export class ModalDetalleComponent implements OnInit {
  public detalleRechazo: FormGroup;
  _rechazosParam: RechazoParams;
  DetalleSintaxis: any;
  constructor(
    private AquirerService: AquirerService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public params: RechazoParams,
  ) { }

  rechazosNacCol: string[] = ['myColumn', 'dtFechaProceso', 'codrechazo', 'vNumNeg', 'tipoTrans',
    'vAdq', 'vEmi', 'vImporte', 'referencia', 'rrn'];

  public ngOnInit(): void {
    
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
    

    this.route.params.subscribe(params => this.AquirerService.postConsultaRechazoFolio(this.params)
      .subscribe(
        data => {
          
          if (!data) {
            Swal.fire({
              icon: 'info',
              text: 'No hay datos!'
            })
          } else {
            this.detalleRechazo = data;
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
