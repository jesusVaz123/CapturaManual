import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators,FormArray,FormControl} from "@angular/forms";
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AquirerService } from 'src/app/service/aquirer.service';
import {Router} from "@angular/router";
import { Busqueda } from 'src/app/model/busqueda.model'; 
import { DatePipe } from "@angular/common";
@Component({
  selector: 'app-reporte-transactn',
  templateUrl: './reporte-transactn.component.html',
  styleUrls: ['./reporte-transactn.component.css']
})
export class ReporteTransactnComponent implements OnInit {
    Busqueda:any;
    constructor(private formBuilder: FormBuilder, private router: Router, 
        private datePipe: DatePipe, private AquirerService: AquirerService) {

    }
displayedColumns: string[] = ['idcom','amexpaymentnum','paymentdate','paymentcurrency','submerchantid',
'businesssubdate','amexprocessdate','subinvoicenum','subcurrency','dubgrossampaycur','invoicerefnum',
'cardaccountnum','transdate','transtime','approvalcode','merchantcatcode','acqrefnumber','fechaproceso',
'estatus','tiporeg'];
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
  idcom: string;
  amexpaymentnum: string;
  paymentdate: string;
  paymentcurrency: string;
  submerchantid: string;
  businesssubdate: string;
  amexprocessdate: string;
  subinvoicenum: string;
  subcurrency: string;
  dubgrossampaycur: string;
  invoicerefnum: string;
  cardaccountnum: string;
  transdate: string;
  transtime: string;
  approvalcode: string;
  merchantcatcode: string;
  acqrefnumber: string;
  fechaproceso: string;
  estatus: string;
  tiporeg: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  
   {idcom: '12334',
    amexpaymentnum: '065A6808',
    paymentdate: '20210318',
    paymentcurrency: 'MXN',
    submerchantid: '12345678',
    businesssubdate: '20210105',
    amexprocessdate: '20210106',
    subinvoicenum: '000054',
    subcurrency: 'MXN',
    dubgrossampaycur: '00000000100',
    invoicerefnum: 'W5YZT4BJ05PU',
    cardaccountnum: '12345XXXXXXXXXX124',
    transdate: '20201229',
    transtime: '194206',
    approvalcode: '12875',
    merchantcatcode: '5310',
    acqrefnumber: 'M06HC5K33195821F4',
    fechaproceso: '2021-0215',
    estatus: 'RC',
    tiporeg: '5' },
    {idcom: '12334',
    amexpaymentnum: '065A6808',
    paymentdate: '20210318',
    paymentcurrency: 'MXN',
    submerchantid: '12345678',
    businesssubdate: '20210105',
    amexprocessdate: '20210106',
    subinvoicenum: '000054',
    subcurrency: 'MXN',
    dubgrossampaycur: '00000000100',
    invoicerefnum: 'W5YZT4BJ05PU',
    cardaccountnum: '12345XXXXXXXXXX124',
    transdate: '20201229',
    transtime: '194206',
    approvalcode: '12875',
    merchantcatcode: '5310',
    acqrefnumber: 'M06HC5K33195821F4',
    fechaproceso: '2021-0215',
    estatus: 'RC',
    tiporeg: '5' },
    {idcom: '12334',
    amexpaymentnum: '065A6808',
    paymentdate: '20210318',
    paymentcurrency: 'MXN',
    submerchantid: '12345678',
    businesssubdate: '20210105',
    amexprocessdate: '20210106',
    subinvoicenum: '000054',
    subcurrency: 'MXN',
    dubgrossampaycur: '00000000100',
    invoicerefnum: 'W5YZT4BJ05PU',
    cardaccountnum: '12345XXXXXXXXXX124',
    transdate: '20201229',
    transtime: '194206',
    approvalcode: '12875',
    merchantcatcode: '5310',
    acqrefnumber: 'M06HC5K33195821F4',
    fechaproceso: '2021-0215',
    estatus: 'RC',
    tiporeg: '5' },
    {idcom: '12334',
    amexpaymentnum: '065A6808',
    paymentdate: '20210318',
    paymentcurrency: 'MXN',
    submerchantid: '12345678',
    businesssubdate: '20210105',
    amexprocessdate: '20210106',
    subinvoicenum: '000054',
    subcurrency: 'MXN',
    dubgrossampaycur: '00000000100',
    invoicerefnum: 'W5YZT4BJ05PU',
    cardaccountnum: '12345XXXXXXXXXX124',
    transdate: '20201229',
    transtime: '194206',
    approvalcode: '12875',
    merchantcatcode: '5310',
    acqrefnumber: 'M06HC5K33195821F4',
    fechaproceso: '2021-0215',
    estatus: 'RC',
    tiporeg: '5' },
    {idcom: '12334',
    amexpaymentnum: '065A6808',
    paymentdate: '20210318',
    paymentcurrency: 'MXN',
    submerchantid: '12345678',
    businesssubdate: '20210105',
    amexprocessdate: '20210106',
    subinvoicenum: '000054',
    subcurrency: 'MXN',
    dubgrossampaycur: '00000000100',
    invoicerefnum: 'W5YZT4BJ05PU',
    cardaccountnum: '12345XXXXXXXXXX124',
    transdate: '20201229',
    transtime: '194206',
    approvalcode: '12875',
    merchantcatcode: '5310',
    acqrefnumber: 'M06HC5K33195821F4',
    fechaproceso: '2021-0215',
    estatus: 'RC',
    tiporeg: '5' },
    {idcom: '12334',
    amexpaymentnum: '065A6808',
    paymentdate: '20210318',
    paymentcurrency: 'MXN',
    submerchantid: '12345678',
    businesssubdate: '20210105',
    amexprocessdate: '20210106',
    subinvoicenum: '000054',
    subcurrency: 'MXN',
    dubgrossampaycur: '00000000100',
    invoicerefnum: 'W5YZT4BJ05PU',
    cardaccountnum: '12345XXXXXXXXXX124',
    transdate: '20201229',
    transtime: '194206',
    approvalcode: '12875',
    merchantcatcode: '5310',
    acqrefnumber: 'M06HC5K33195821F4',
    fechaproceso: '2021-0215',
    estatus: 'RC',
    tiporeg: '5' },
    {idcom: '12334',
    amexpaymentnum: '065A6808',
    paymentdate: '20210318',
    paymentcurrency: 'MXN',
    submerchantid: '12345678',
    businesssubdate: '20210105',
    amexprocessdate: '20210106',
    subinvoicenum: '000054',
    subcurrency: 'MXN',
    dubgrossampaycur: '00000000100',
    invoicerefnum: 'W5YZT4BJ05PU',
    cardaccountnum: '12345XXXXXXXXXX124',
    transdate: '20201229',
    transtime: '194206',
    approvalcode: '12875',
    merchantcatcode: '5310',
    acqrefnumber: 'M06HC5K33195821F4',
    fechaproceso: '2021-0215',
    estatus: 'RC',
    tiporeg: '5' },
    {idcom: '12334',
    amexpaymentnum: '065A6808',
    paymentdate: '20210318',
    paymentcurrency: 'MXN',
    submerchantid: '12345678',
    businesssubdate: '20210105',
    amexprocessdate: '20210106',
    subinvoicenum: '000054',
    subcurrency: 'MXN',
    dubgrossampaycur: '00000000100',
    invoicerefnum: 'W5YZT4BJ05PU',
    cardaccountnum: '12345XXXXXXXXXX124',
    transdate: '20201229',
    transtime: '194206',
    approvalcode: '12875',
    merchantcatcode: '5310',
    acqrefnumber: 'M06HC5K33195821F4',
    fechaproceso: '2021-0215',
    estatus: 'RC',
    tiporeg: '5' },
    {idcom: '12334',
    amexpaymentnum: '065A6808',
    paymentdate: '20210318',
    paymentcurrency: 'MXN',
    submerchantid: '12345678',
    businesssubdate: '20210105',
    amexprocessdate: '20210106',
    subinvoicenum: '000054',
    subcurrency: 'MXN',
    dubgrossampaycur: '00000000100',
    invoicerefnum: 'W5YZT4BJ05PU',
    cardaccountnum: '12345XXXXXXXXXX124',
    transdate: '20201229',
    transtime: '194206',
    approvalcode: '12875',
    merchantcatcode: '5310',
    acqrefnumber: 'M06HC5K33195821F4',
    fechaproceso: '2021-0215',
    estatus: 'RC',
    tiporeg: '5' },
    {idcom: '12334',
    amexpaymentnum: '065A6808',
    paymentdate: '20210318',
    paymentcurrency: 'MXN',
    submerchantid: '12345678',
    businesssubdate: '20210105',
    amexprocessdate: '20210106',
    subinvoicenum: '000054',
    subcurrency: 'MXN',
    dubgrossampaycur: '00000000100',
    invoicerefnum: 'W5YZT4BJ05PU',
    cardaccountnum: '12345XXXXXXXXXX124',
    transdate: '20201229',
    transtime: '194206',
    approvalcode: '12875',
    merchantcatcode: '5310',
    acqrefnumber: 'M06HC5K33195821F4',
    fechaproceso: '2021-0215',
    estatus: 'RC',
    tiporeg: '5' },
    {idcom: '12334',
    amexpaymentnum: '065A6808',
    paymentdate: '20210318',
    paymentcurrency: 'MXN',
    submerchantid: '12345678',
    businesssubdate: '20210105',
    amexprocessdate: '20210106',
    subinvoicenum: '000054',
    subcurrency: 'MXN',
    dubgrossampaycur: '00000000100',
    invoicerefnum: 'W5YZT4BJ05PU',
    cardaccountnum: '12345XXXXXXXXXX124',
    transdate: '20201229',
    transtime: '194206',
    approvalcode: '12875',
    merchantcatcode: '5310',
    acqrefnumber: 'M06HC5K33195821F4',
    fechaproceso: '2021-0215',
    estatus: 'RC',
    tiporeg: '5' },
    {idcom: '12334',
    amexpaymentnum: '065A6808',
    paymentdate: '20210318',
    paymentcurrency: 'MXN',
    submerchantid: '12345678',
    businesssubdate: '20210105',
    amexprocessdate: '20210106',
    subinvoicenum: '000054',
    subcurrency: 'MXN',
    dubgrossampaycur: '00000000100',
    invoicerefnum: 'W5YZT4BJ05PU',
    cardaccountnum: '12345XXXXXXXXXX124',
    transdate: '20201229',
    transtime: '194206',
    approvalcode: '12875',
    merchantcatcode: '5310',
    acqrefnumber: 'M06HC5K33195821F4',
    fechaproceso: '2021-0215',
    estatus: 'RC',
    tiporeg: '5' },
    {idcom: '12334',
    amexpaymentnum: '065A6808',
    paymentdate: '20210318',
    paymentcurrency: 'MXN',
    submerchantid: '12345678',
    businesssubdate: '20210105',
    amexprocessdate: '20210106',
    subinvoicenum: '000054',
    subcurrency: 'MXN',
    dubgrossampaycur: '00000000100',
    invoicerefnum: 'W5YZT4BJ05PU',
    cardaccountnum: '12345XXXXXXXXXX124',
    transdate: '20201229',
    transtime: '194206',
    approvalcode: '12875',
    merchantcatcode: '5310',
    acqrefnumber: 'M06HC5K33195821F4',
    fechaproceso: '2021-0215',
    estatus: 'RC',
    tiporeg: '5' },
    {idcom: '12334',
    amexpaymentnum: '065A6808',
    paymentdate: '20210318',
    paymentcurrency: 'MXN',
    submerchantid: '12345678',
    businesssubdate: '20210105',
    amexprocessdate: '20210106',
    subinvoicenum: '000054',
    subcurrency: 'MXN',
    dubgrossampaycur: '00000000100',
    invoicerefnum: 'W5YZT4BJ05PU',
    cardaccountnum: '12345XXXXXXXXXX124',
    transdate: '20201229',
    transtime: '194206',
    approvalcode: '12875',
    merchantcatcode: '5310',
    acqrefnumber: 'M06HC5K33195821F4',
    fechaproceso: '2021-0215',
    estatus: 'RC',
    tiporeg: '5' },
    {idcom: '12334',
    amexpaymentnum: '065A6808',
    paymentdate: '20210318',
    paymentcurrency: 'MXN',
    submerchantid: '12345678',
    businesssubdate: '20210105',
    amexprocessdate: '20210106',
    subinvoicenum: '000054',
    subcurrency: 'MXN',
    dubgrossampaycur: '00000000100',
    invoicerefnum: 'W5YZT4BJ05PU',
    cardaccountnum: '12345XXXXXXXXXX124',
    transdate: '20201229',
    transtime: '194206',
    approvalcode: '12875',
    merchantcatcode: '5310',
    acqrefnumber: 'M06HC5K33195821F4',
    fechaproceso: '2021-0215',
    estatus: 'RC',
    tiporeg: '5' },

];