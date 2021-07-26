import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from "@angular/forms";
import { ActivatedRoute, Params } from '@angular/router';
import { AquirerService } from 'src/app/service/aquirer.service';
import { RechazoParams } from 'src/app/model/RechazoParams.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-modal-carga-emisor',
  templateUrl: './modal-carga-emisor.component.html',
  styleUrls: ['./modal-carga-emisor.component.scss']
})
export class ModalCargaEmisorComponent implements OnInit {
  public detalleEmisor: FormGroup;
  public _rechazoParam: RechazoParams;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public AquirerService: AquirerService,
  
  
  ) { }

  dataSource: any;

  ngOnInit(): void {

    

    this.detalleEmisor = this.formBuilder.group({
      fecha_lote: [''],
      vTipoTxn: [''],
      mImpTxn: [''],
      vNumCuenta: [''],
      vNumRef: [''],
      iClaveMoneda: [''],
      iImpTasa: [''],
      pob_negocio: [''],
      cod_pais_neg: [''],
      cod_cat_neg: [''],
      cod_postal_neg: [''],
      cod_est_prov: [''],
      rfc: [''],
      iEmisor: [''],
      vFolioRechazo: [''],
      iAdquirente: [''],
      iEstatus: ['']
    });

    this.route.params.subscribe(params =>

      this.AquirerService.postCargaEmisor()
        .subscribe(
          data => {
            console.log("postCargaEmisor",data)
            if (!data) {
              Swal.fire({
                icon: 'info',
                text: 'No hay datos!'
              })
            } else {
              this.detalleEmisor.setValue(data[0]);
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
