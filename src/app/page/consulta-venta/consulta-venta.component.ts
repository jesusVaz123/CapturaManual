import { Component, OnInit } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-consulta-venta',
  templateUrl: './consulta-venta.component.html',
  styleUrls: ['./consulta-venta.component.css']
})
export class ConsultaVentaComponent implements OnInit {
displayedColumns: string[] = ['position', 'name', 'weight', 'symbol', 'accion'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  //@ViewChild(MatPaginator) paginator: MatPaginator;
ngOnInit() {
    // this.dataSource.paginator = this.paginator;
  }
}
export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  accion: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'SUM', weight: 9008, symbol: 'RECIBIDO', accion: 'qas'},
  {position: 2, name: 'SUM', weight: 9009, symbol: 'RECIBIDO', accion: 'qas'},
  {position: 3, name: 'SUM', weight: 9010, symbol: 'RECIBIDO', accion: 'qas'},
  {position: 4, name: 'SUM', weight: 9011, symbol: 'RECIBIDO', accion: 'qas'},
  {position: 5, name: 'SUM', weight: 9012, symbol: 'RECIBIDO', accion: 'qas'},
  // {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  // {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  // {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  // {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  // {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  // {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  // {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  // {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  // {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  // {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  // {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  // {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  // {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  // {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  // {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];