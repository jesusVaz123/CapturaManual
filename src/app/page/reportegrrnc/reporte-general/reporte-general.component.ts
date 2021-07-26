import { Component, OnInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
@Component({
  selector: 'app-reporte-general',
  templateUrl: './reporte-general.component.html',
  styleUrls: ['./reporte-general.component.css']
})
export class ReporteGeneralComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  displayedColumns: string[] = ['idcom', 'tipocuenta', 'numpago', 'fechapago','monpago','refpago','montonetopago',
  'montobruto','montodesc','montoservicio','montoajuste','montoimpuesto','montosaldodebito','numdepositodirecto',
  'cuentabancaria','cuentabancariainter','codigobanco'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  ColumnsHeader:string[] =['fechacreacion','horacreacion', 'numsecuencia','idarchivo','nomarchivo','versionarchivo']
  dataHeader = new MatTableDataSource<header>(ELEMENT_HEADER);

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
export interface header{
  fechacreacion: string;
  horacreacion: string;
  numsecuencia: string;
  idarchivo: string;
  nomarchivo: string;
  versionarchivo: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {idcom: '123', tipocuenta: '2 ',numpago: '065A6808',fechapago: '20210317', monpago: 'MXN',
   refpago:'065A1234',montonetopago:'2760',montobruto: '4000',montodesc: '40',montoservicio: '400',montoajuste:'-800',
   montoimpuesto: '0',montosaldodebito: '0',numdepositodirecto: '0', cuentabancaria: '123654', cuentabancariainter: '',
   codigobanco: '5' },
  // {idcom: '122', tipocuenta: '1',  numpago: '065A6809', fechapago: '20210317', monpago: 'MXN', 
  // refpago:'065A1234',montonetopago:'2760',montobruto: '4000',montodesc: '40',montoservicio: '400',montoajuste:'-800',
  // montoimpuesto: '0',montosaldodebito: '0',numdepositodirecto: '0', cuentabancaria: '123654', cuentabancariainter: '',
  // codigobanco: '5' },

];

const ELEMENT_HEADER: header[] = [
  {fechacreacion: '20210108',horacreacion: '44103',numsecuencia: '1',idarchivo:'GRRCN',nomarchivo: 'Prueba GRRCN', versionarchivo: '201'},
  // {fechacreacion: '20210109',horacreacion: '44104',numsecuencia: '2',idarchivo:'GRRCN',nomarchivo: 'Prueba GRRCN', versionarchivo: '202'},
];