import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from "@angular/forms";
import { ActivatedRoute, Params } from '@angular/router';
import { AquirerService } from 'src/app/service/aquirer.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-modal-carga-adquirente',
  templateUrl: './modal-carga-adquirente.component.html',
  styleUrls: ['./modal-carga-adquirente.component.scss']
})
export class ModalCargaAdquirenteComponent implements OnInit {
  public detalleAdquirente: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public AquirerService: AquirerService,
  ) { }

  ngOnInit(): void{

    this.detalleAdquirente = this.formBuilder.group({
      vFolioRechazo: [''],
      iFolio: [''],
      dtFecCarga: [''],
      iAccionRechazo: [''],
      iEstatus: [''],
      vNumNeg: [''],
      vNomNeg: [''],
      vNumCuenta: [''],
      vNumAut: [''],
      vTerminal: [''],
      vFecOrig: [''],
      vCodTxn: [''],
      vPEM: [''],
      mImpTxn: [''],
      vPagDif: [''],
      mImporteCash: [''],
      vRRN: [''],
      vTokenC4: [''],
      vReferencia: [''],
      iEmisor: [''],
      iAdquirente: ['']
    });

    this.route.params.subscribe(params =>

      this.AquirerService.postCargaAdquirente()
        .subscribe(
          data => {
            console.log("postCargaEmisor",data)
            if (!data) {
              Swal.fire({
                icon: 'info',
                text: 'No hay datos!'
              })
            } else {
              this.detalleAdquirente.setValue(data[0]);
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
