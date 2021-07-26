import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators,FormArray,FormControl} from "@angular/forms";
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AquirerService } from 'src/app/service/aquirer.service';
import {Router} from "@angular/router";
import { Busqueda } from 'src/app/model/busqueda.model'; 
import { DatePipe } from "@angular/common";
@Component({
  selector: 'app-reporte-chargeback',
  templateUrl: './reporte-chargeback.component.html',
  styleUrls: ['./reporte-chargeback.component.css']
})
export class ReporteChargebackComponent implements OnInit {
    Busqueda:any;
    constructor(private formBuilder: FormBuilder, private router: Router, 
        private datePipe: DatePipe, private AquirerService: AquirerService) {

    }
displayedColumns: string[] = ['idcom', 'tipocuenta', 'numpago', 'fechapago','monpago','refpago','montonetopago',
  'montobruto','montodesc','montoservicio','montoajuste','montoimpuesto','montosaldodebito','numdepositodirecto',
  'cuentabancaria','cuentabancariainter','codigobanco'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
    @ViewChild(MatPaginator , {static: true}) paginator: MatPaginator;

 ngOnInit() {
        this.dataSource.paginator = this.paginator; 
        this.Busqueda = this.formBuilder.group({
            fechaIni :[''],
            fechaFin : [''],
            tipoRegistro : ['']
        });
    }

    onSubmit() {
        var fechaI=this.Busqueda.value.fechaIni;
        var fechaF=this.Busqueda.value.fechaFin;

        this.Busqueda.value.fechaIni=this.datePipe.transform(fechaI, 'yyyyMMdd');
        this.Busqueda.value.fechaFin=this.datePipe.transform(fechaF, 'yyyyMMdd');
        console.log("aqui va la fecha",this.Busqueda.value);

        //this.AquirerService.getObtieneReporteGRRCN(JSON.parse(JSON.stringify(this.Busqueda.value)))
        this.AquirerService.getObtieneReporteGRRCN(this.Busqueda.value)
        .subscribe(
            data  => {
                console.log("getReporteGRRNC Request is successful ", data);
                //this.aclaraciones = data.result;
            },
            error  => {

                console.log("Error", error);
            }

            );
    }

}
export interface PeriodicElement {
  tipocuenta: string;
  idcom: string;
  numpago: string;
  fechapago: string;
  monpago: string;
  refpago: string;
  montonetopago: string;
  montobruto: string;
  montodesc: string;
  montoservicio: string;
  montoajuste: string;
  montoimpuesto: string;
  montosaldodebito: string;
  numdepositodirecto: string;
  cuentabancaria: string;
  cuentabancariainter: string;
  codigobanco: string; 
}

const ELEMENT_DATA: PeriodicElement[] = [
  {idcom: '123', tipocuenta: '2 ',numpago: '065A6808',fechapago: '20210317', monpago: 'MXN',
   refpago:'065A1234',montonetopago:'2760',montobruto: '4000',montodesc: '40',montoservicio: '400',montoajuste:'-800',
   montoimpuesto: '0',montosaldodebito: '0',numdepositodirecto: '0', cuentabancaria: '123654', cuentabancariainter: '',
   codigobanco: '5' },
  {idcom: '124', tipocuenta: '1',  numpago: '065A6809', fechapago: '20210317', monpago: 'MXN', 
  refpago:'065A1234',montonetopago:'2760',montobruto: '4000',montodesc: '40',montoservicio: '400',montoajuste:'-800',
  montoimpuesto: '0',montosaldodebito: '0',numdepositodirecto: '0', cuentabancaria: '123654', cuentabancariainter: '',
  codigobanco: '5' },
{idcom: '125', tipocuenta: '3 ',numpago: '065A6808',fechapago: '20210317', monpago: 'MXN',
   refpago:'065A1234',montonetopago:'2760',montobruto: '4000',montodesc: '40',montoservicio: '400',montoajuste:'-800',
   montoimpuesto: '0',montosaldodebito: '0',numdepositodirecto: '0', cuentabancaria: '123654', cuentabancariainter: '',
   codigobanco: '5' },
  {idcom: '126', tipocuenta: '4',  numpago: '065A6809', fechapago: '20210317', monpago: 'MXN', 
  refpago:'065A1234',montonetopago:'2760',montobruto: '4000',montodesc: '40',montoservicio: '400',montoajuste:'-800',
  montoimpuesto: '0',montosaldodebito: '0',numdepositodirecto: '0', cuentabancaria: '123654', cuentabancariainter: '',
  codigobanco: '5' },
  {idcom: '127', tipocuenta: '5 ',numpago: '065A6808',fechapago: '20210317', monpago: 'MXN',
   refpago:'065A1234',montonetopago:'2760',montobruto: '4000',montodesc: '40',montoservicio: '400',montoajuste:'-800',
   montoimpuesto: '0',montosaldodebito: '0',numdepositodirecto: '0', cuentabancaria: '123654', cuentabancariainter: '',
   codigobanco: '5' },
  {idcom: '128', tipocuenta: '6',  numpago: '065A6809', fechapago: '20210317', monpago: 'MXN', 
  refpago:'065A1234',montonetopago:'2760',montobruto: '4000',montodesc: '40',montoservicio: '400',montoajuste:'-800',
  montoimpuesto: '0',montosaldodebito: '0',numdepositodirecto: '0', cuentabancaria: '123654', cuentabancariainter: '',
  codigobanco: '5' },
  {idcom: '129', tipocuenta: '7 ',numpago: '065A6808',fechapago: '20210317', monpago: 'MXN',
   refpago:'065A1234',montonetopago:'2760',montobruto: '4000',montodesc: '40',montoservicio: '400',montoajuste:'-800',
   montoimpuesto: '0',montosaldodebito: '0',numdepositodirecto: '0', cuentabancaria: '123654', cuentabancariainter: '',
   codigobanco: '5' },
  {idcom: '130', tipocuenta: '8',  numpago: '065A6809', fechapago: '20210317', monpago: 'MXN', 
  refpago:'065A1234',montonetopago:'2760',montobruto: '4000',montodesc: '40',montoservicio: '400',montoajuste:'-800',
  montoimpuesto: '0',montosaldodebito: '0',numdepositodirecto: '0', cuentabancaria: '123654', cuentabancariainter: '',
  codigobanco: '5' },
];