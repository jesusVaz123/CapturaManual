import { Component, OnInit, ViewChild } from '@angular/core';
import {FormBuilder, FormGroup, Validators,FormArray,FormControl} from "@angular/forms";
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AquirerService } from 'src/app/service/aquirer.service';
import {Router} from "@angular/router";
import { Busqueda } from 'src/app/model/busqueda.model'; 
import { DatePipe } from "@angular/common";
@Component({
  selector: 'app-reporte-txnpricing',
  templateUrl: './reporte-txnpricing.component.html',
  styleUrls: ['./reporte-txnpricing.component.css']
})
export class ReporteTxnpricingComponent implements OnInit {
      Busqueda:any;
    constructor(private formBuilder: FormBuilder, private router: Router, 
        private datePipe: DatePipe, private AquirerService: AquirerService) {

    }
 displayedColumns: string[] = ['idcom','amexpaymentnum','paymentdate','paymentcurrency','submerchantid',
    'businesssubdate','amexprocessdate','subinvoicenum','subcurrency','invoicerefnum','cardaccountnum',
    'transamount','servfeeamount','discountrate','discountamount','grossamount','taxamount','netamount',
    'servfeerate','adjustnumber','adjustrdesc','fechaproceso','estatus','tiporeg'];
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
    invoicerefnum: string;
    cardaccountnum: string;
    transamount: string;
    servfeeamount: string;
    discountrate: string;
    discountamount: string;
    grossamount: string;
    taxamount: string;
    netamount: string;
    servfeerate: string;
    adjustnumber: string;
    adjustrdesc: string;
    fechaproceso: string;
    estatus: string;
    tiporeg: string;
}

const ELEMENT_DATA: PeriodicElement[] = [

{idcom: '12334',
amexpaymentnum: '065A6808',
paymentdate: '20210318',
paymentcurrency: 'MXN',
submerchantid: '123456',
businesssubdate: '20210318',
amexprocessdate: '20210318',
subinvoicenum: '325682',
subcurrency: 'MXN',
invoicerefnum: 'ADJUSTMENT 01',
cardaccountnum: '12345678901234567',
transamount: '000000000123',
servfeeamount: '00000',
discountrate: '000100',
discountamount: '000000000',
grossamount: '-0001000',
taxamount: '0000000000000000',
netamount: '-00000000001000000',
servfeerate: '0000',
adjustnumber: '325658',
adjustrdesc: 'ADJUSTMENT- FRAUD ADJUSTMENT',
fechaproceso: '2021-0215',
estatus: 'RC',
tiporeg: '8' },
{idcom: '12334',
amexpaymentnum: '065A6808',
paymentdate: '20210318',
paymentcurrency: 'MXN',
submerchantid: '123456',
businesssubdate: '20210318',
amexprocessdate: '20210318',
subinvoicenum: '325682',
subcurrency: 'MXN',
invoicerefnum: 'ADJUSTMENT 01',
cardaccountnum: '12345678901234567',
transamount: '000000000123',
servfeeamount: '00000',
discountrate: '000100',
discountamount: '000000000',
grossamount: '-0001000',
taxamount: '0000000000000000',
netamount: '-00000000001000000',
servfeerate: '0000',
adjustnumber: '325658',
adjustrdesc: 'ADJUSTMENT- FRAUD ADJUSTMENT',
fechaproceso: '2021-0215',
estatus: 'RC',
tiporeg: '8' },
{idcom: '12334',
amexpaymentnum: '065A6808',
paymentdate: '20210318',
paymentcurrency: 'MXN',
submerchantid: '123456',
businesssubdate: '20210318',
amexprocessdate: '20210318',
subinvoicenum: '325682',
subcurrency: 'MXN',
invoicerefnum: 'ADJUSTMENT 01',
cardaccountnum: '12345678901234567',
transamount: '000000000123',
servfeeamount: '00000',
discountrate: '000100',
discountamount: '000000000',
grossamount: '-0001000',
taxamount: '0000000000000000',
netamount: '-00000000001000000',
servfeerate: '0000',
adjustnumber: '325658',
adjustrdesc: 'ADJUSTMENT- FRAUD ADJUSTMENT',
fechaproceso: '2021-0215',
estatus: 'RC',
tiporeg: '8' },
{idcom: '12334',
amexpaymentnum: '065A6808',
paymentdate: '20210318',
paymentcurrency: 'MXN',
submerchantid: '123456',
businesssubdate: '20210318',
amexprocessdate: '20210318',
subinvoicenum: '325682',
subcurrency: 'MXN',
invoicerefnum: 'ADJUSTMENT 01',
cardaccountnum: '12345678901234567',
transamount: '000000000123',
servfeeamount: '00000',
discountrate: '000100',
discountamount: '000000000',
grossamount: '-0001000',
taxamount: '0000000000000000',
netamount: '-00000000001000000',
servfeerate: '0000',
adjustnumber: '325658',
adjustrdesc: 'ADJUSTMENT- FRAUD ADJUSTMENT',
fechaproceso: '2021-0215',
estatus: 'RC',
tiporeg: '8' },
{idcom: '12334',
amexpaymentnum: '065A6808',
paymentdate: '20210318',
paymentcurrency: 'MXN',
submerchantid: '123456',
businesssubdate: '20210318',
amexprocessdate: '20210318',
subinvoicenum: '325682',
subcurrency: 'MXN',
invoicerefnum: 'ADJUSTMENT 01',
cardaccountnum: '12345678901234567',
transamount: '000000000123',
servfeeamount: '00000',
discountrate: '000100',
discountamount: '000000000',
grossamount: '-0001000',
taxamount: '0000000000000000',
netamount: '-00000000001000000',
servfeerate: '0000',
adjustnumber: '325658',
adjustrdesc: 'ADJUSTMENT- FRAUD ADJUSTMENT',
fechaproceso: '2021-0215',
estatus: 'RC',
tiporeg: '8' },
{idcom: '12334',
amexpaymentnum: '065A6808',
paymentdate: '20210318',
paymentcurrency: 'MXN',
submerchantid: '123456',
businesssubdate: '20210318',
amexprocessdate: '20210318',
subinvoicenum: '325682',
subcurrency: 'MXN',
invoicerefnum: 'ADJUSTMENT 01',
cardaccountnum: '12345678901234567',
transamount: '000000000123',
servfeeamount: '00000',
discountrate: '000100',
discountamount: '000000000',
grossamount: '-0001000',
taxamount: '0000000000000000',
netamount: '-00000000001000000',
servfeerate: '0000',
adjustnumber: '325658',
adjustrdesc: 'ADJUSTMENT- FRAUD ADJUSTMENT',
fechaproceso: '2021-0215',
estatus: 'RC',
tiporeg: '8' },
{idcom: '12334',
amexpaymentnum: '065A6808',
paymentdate: '20210318',
paymentcurrency: 'MXN',
submerchantid: '123456',
businesssubdate: '20210318',
amexprocessdate: '20210318',
subinvoicenum: '325682',
subcurrency: 'MXN',
invoicerefnum: 'ADJUSTMENT 01',
cardaccountnum: '12345678901234567',
transamount: '000000000123',
servfeeamount: '00000',
discountrate: '000100',
discountamount: '000000000',
grossamount: '-0001000',
taxamount: '0000000000000000',
netamount: '-00000000001000000',
servfeerate: '0000',
adjustnumber: '325658',
adjustrdesc: 'ADJUSTMENT- FRAUD ADJUSTMENT',
fechaproceso: '2021-0215',
estatus: 'RC',
tiporeg: '8' },
{idcom: '12334',
amexpaymentnum: '065A6808',
paymentdate: '20210318',
paymentcurrency: 'MXN',
submerchantid: '123456',
businesssubdate: '20210318',
amexprocessdate: '20210318',
subinvoicenum: '325682',
subcurrency: 'MXN',
invoicerefnum: 'ADJUSTMENT 01',
cardaccountnum: '12345678901234567',
transamount: '000000000123',
servfeeamount: '00000',
discountrate: '000100',
discountamount: '000000000',
grossamount: '-0001000',
taxamount: '0000000000000000',
netamount: '-00000000001000000',
servfeerate: '0000',
adjustnumber: '325658',
adjustrdesc: 'ADJUSTMENT- FRAUD ADJUSTMENT',
fechaproceso: '2021-0215',
estatus: 'RC',
tiporeg: '8' },
{idcom: '12334',
amexpaymentnum: '065A6808',
paymentdate: '20210318',
paymentcurrency: 'MXN',
submerchantid: '123456',
businesssubdate: '20210318',
amexprocessdate: '20210318',
subinvoicenum: '325682',
subcurrency: 'MXN',
invoicerefnum: 'ADJUSTMENT 01',
cardaccountnum: '12345678901234567',
transamount: '000000000123',
servfeeamount: '00000',
discountrate: '000100',
discountamount: '000000000',
grossamount: '-0001000',
taxamount: '0000000000000000',
netamount: '-00000000001000000',
servfeerate: '0000',
adjustnumber: '325658',
adjustrdesc: 'ADJUSTMENT- FRAUD ADJUSTMENT',
fechaproceso: '2021-0215',
estatus: 'RC',
tiporeg: '8' },
{idcom: '12334',
amexpaymentnum: '065A6808',
paymentdate: '20210318',
paymentcurrency: 'MXN',
submerchantid: '123456',
businesssubdate: '20210318',
amexprocessdate: '20210318',
subinvoicenum: '325682',
subcurrency: 'MXN',
invoicerefnum: 'ADJUSTMENT 01',
cardaccountnum: '12345678901234567',
transamount: '000000000123',
servfeeamount: '00000',
discountrate: '000100',
discountamount: '000000000',
grossamount: '-0001000',
taxamount: '0000000000000000',
netamount: '-00000000001000000',
servfeerate: '0000',
adjustnumber: '325658',
adjustrdesc: 'ADJUSTMENT- FRAUD ADJUSTMENT',
fechaproceso: '2021-0215',
estatus: 'RC',
tiporeg: '8' },
{idcom: '12334',
amexpaymentnum: '065A6808',
paymentdate: '20210318',
paymentcurrency: 'MXN',
submerchantid: '123456',
businesssubdate: '20210318',
amexprocessdate: '20210318',
subinvoicenum: '325682',
subcurrency: 'MXN',
invoicerefnum: 'ADJUSTMENT 01',
cardaccountnum: '12345678901234567',
transamount: '000000000123',
servfeeamount: '00000',
discountrate: '000100',
discountamount: '000000000',
grossamount: '-0001000',
taxamount: '0000000000000000',
netamount: '-00000000001000000',
servfeerate: '0000',
adjustnumber: '325658',
adjustrdesc: 'ADJUSTMENT- FRAUD ADJUSTMENT',
fechaproceso: '2021-0215',
estatus: 'RC',
tiporeg: '8' },
];