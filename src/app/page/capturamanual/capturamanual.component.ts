import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, FormControl } from "@angular/forms";
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AquirerService } from 'src/app/service/aquirer.service';
import { Rechazo } from 'src/app/model/rechazo.model';
import { Router } from "@angular/router";
import { DatePipe } from "@angular/common";
import { DetalleSintaxis } from 'src/app/model/detallesintaxis.model';
import Swal from 'sweetalert2';
import * as xlsx from 'xlsx';
import * as XLSX from 'xlsx';
import { DetallerechazosModalComponent } from 'src/app/page/detallerechazos-modal/detallerechazos-modal.component';

@Component({
  selector: 'app-capturamanual',
  templateUrl: './capturamanual.component.html',
  styleUrls: ['./capturamanual.component.css']
})
export class CapturamanualComponent implements OnInit {

  fechaactual = new FormControl(new Date());
  serializedDate = new FormControl((new Date()).toISOString());
  CapturaManual: any;
  estatus: any;
  dataRS: any;
  DetalleSintaxis: any;
  constructor(public dialog: MatDialog, private formBuilder: FormBuilder, private router: Router,
    private datePipe: DatePipe, private AquirerService: AquirerService) { }
  sintaxisColumns: string[] = ['myColumn', 'codregistro', 'vNoCuenta', 'vNumNeg', 'tipotrans'
    , 'importe', 'referencia'];
  // 'vArqc', 'vRrn', 'vRegLlave', 'vPlataforma'];
  //dataSource =  new MatTableDataSource<RechazoDTO>(elemen_data);
  dataRechazoSintaxis = new MatTableDataSource();
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  ngOnInit() {

    this.CapturaManual = this.formBuilder.group({
      fechaArribo: [''],
      NumAutoriza: [''],
      codigoTransaccion: ['']
    });

  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DetallerechazosModalComponent, {
      disableClose: true
    });
  }
  onSubmit() {
    var fechaArribo = this.CapturaManual.value.fechaArribo;

    this.CapturaManual.value.fechaArribo = this.datePipe.transform(fechaArribo, 'yyyyMMdd');

    fechaArribo = this.CapturaManual.value.fechaArribo;

    var NumAutoriza = this.CapturaManual.value.NumAutoriza;
    var codigoTransaccion = this.CapturaManual.value.codigoTransaccion;
    //this.AquirerService.getObtieneReporteGRRCN(JSON.parse(JSON.stringify(this.Confirmation.value)))

    this.AquirerService.getFuentepapel()
      .subscribe(
        data => {
          console.log("getConsultaRechSintaxis Request is successful", data);
          if (data.length == 0) {
            Swal.fire({
              icon: 'info',
              text: 'No hay datos!'
            })
            this.dataRechazoSintaxis = new MatTableDataSource(data);
            localStorage.clear();
          } else {
            this.dataRechazoSintaxis = new MatTableDataSource(data);
            localStorage.setItem('dataRechazoSintaxis', JSON.stringify(data));
            this.dataRechazoSintaxis.paginator = this.paginator;
          }

        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Algo salió mal!'
          })
          console.log("Error", error);
          this.dataRechazoSintaxis = new MatTableDataSource();
          localStorage.clear();
        });

  }
}