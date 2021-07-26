import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import {FormBuilder, FormGroup, Validators,FormArray,FormControl} from "@angular/forms";
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
 import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AquirerService } from 'src/app/service/aquirer.service';
@Component({
  selector: 'app-modificacion-rechazo-modal',
  templateUrl: './modificacion-rechazo-modal.component.html',
  styleUrls: ['./modificacion-rechazo-modal.component.css']
})
export class ModificacionRechazoModalComponent implements OnInit {

  constructor(public dialog: MatDialog,) { }

  ngOnInit() {
  }

}
