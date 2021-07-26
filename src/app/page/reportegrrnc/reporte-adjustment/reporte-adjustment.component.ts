import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import {FormBuilder, FormGroup, Validators,FormArray,FormControl} from "@angular/forms";
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AquirerService } from 'src/app/service/aquirer.service';
import {Router} from "@angular/router";
import { Busqueda } from 'src/app/model/busqueda.model'; 
import { DatePipe } from "@angular/common";
import * as xlsx from 'xlsx';
import * as XLSX from 'xlsx';
@Component({
    selector: 'app-reporte-adjustment',
    templateUrl: './reporte-adjustment.component.html',
    styleUrls: ['./reporte-adjustment.component.css']
})
export class ReporteAdjustmentComponent implements OnInit {
    Busqueda:any;
    estatus: any;
    constructor(private formBuilder: FormBuilder, private router: Router, 
        private datePipe: DatePipe, private AquirerService: AquirerService) {

    }
    displayedColumns: string[] = ['idcom','amexpaymentnum','paymentdate','paymentcurrency','submerchantid',
    'businesssubdate','amexprocessdate','subinvoicenum','subcurrency','invoicerefnum','cardaccountnum',
    'transamount','servfeeamount','discountrate','discountamount','grossamount','taxamount','netamount',
    'servfeerate','adjustnumber','adjustrdesc','fechaproceso','estatus','tiporeg'];
    dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
     @ViewChild(MatPaginator , {static: true}) paginator: MatPaginator;
     @ViewChild('table' , {static: true}) table: ElementRef;

    ngOnInit() {
        this.dataSource.paginator = this.paginator; 
        this.Busqueda = this.formBuilder.group({
            fechaIni :[''],
            fechaFin : [''],
            tipoRegistro : ['']
        });
      this.AquirerService.getCatalogoEstatusAmex().subscribe(response => {
        this.estatus = response;
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
                //this.dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
            },
            error  => {

                console.log("Error", error);

            }

            );

    }
      exportexcel() {
    // const ws: xlsx.WorkSheet =   
    // xlsx.utils.table_to_sheet(this.dataSource);
    // const wb: xlsx.WorkBook = xlsx.utils.book_new();
    // xlsx.utils.book_append_sheet(wb, ws, 'Sheet1');
    // xlsx.writeFile(wb, 'Adquirente.xlsx');
        {
       /* table id is passed over here */   

       let element = document.getElementById( 'prueba'); 
       const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element,  {raw:true});

       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
//        XLSX.utils.sheet_add_json(ws,[
//     {note: "This is a note"},
//   ],
//   {
//     header: ["note"],
//     skipHeader:true,
//     origin: "A1"
//   }
// );

       // XLSX.utils
       // XLSX.utils.cell_add_comment(wb['E10'],'This date is wrong');
       XLSX.utils.book_append_sheet(wb, ws, 'Reporte Registro de Ajuste');
      

       /* save to file */
       XLSX.writeFile(wb, 'Prueba.xlsx');
            
    }
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