import { Component, Inject, OnInit } from '@angular/core';
import { DetallerechazosModalComponent } from 'src/app/page/revisionrechazosnacional/detallerechazos-modal/detallerechazos-modal.component';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from "@angular/router";


@Component({
  selector: 'app-modal-opciones',
  templateUrl: './modal-opciones.component.html',
  styleUrls: ['./modal-opciones.component.css']
})
export class ModalOpcionesComponent implements OnInit {
 
  constructor(
    public dialog: MatDialog,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public vFolio: any,

  ) { }

  ngOnInit() {


  }

  openDialog(accion: String): void {
    console.info('elemento rechazo', this.vFolio);
    //this.router.navigate(['/detallerechazo',element], { relativeTo: this.route ,skipLocationChange : true});
    this.router.navigate(['/detallerechazo', accion, this.vFolio]);
    this.dialog.closeAll();
    /*   const dialogRef = this.dialog.open(DetallerechazosModalComponent, {
        disableClose: true, width: '1800px',data: element
      }); */
  }

  // openNoAbono(element): void {
  //   console.info('elemento rechazo', element);
  //   //this.router.navigate(['/detallerechazo',element], { relativeTo: this.route ,skipLocationChange : true});
  //   this.router.navigate(['/noabono',element]);
  // /*   const dialogRef = this.dialog.open(DetallerechazosModalComponent, {
  //     disableClose: true, width: '1800px',data: element
  //   }); */
  // }

  // openSiAbonoIntercambio(element): void {
  //   console.info('elemento rechazo', element);
  //   //this.router.navigate(['/detallerechazo',element], { relativeTo: this.route ,skipLocationChange : true});
  //   this.router.navigate(['/siabonointercambio',element]);
  // /*   const dialogRef = this.dialog.open(DetallerechazosModalComponent, {
  //     disableClose: true, width: '1800px',data: element
  //   }); */
  // }

  // openSoloInyectar(element): void {
  //   console.info('elemento rechazo', element);
  //   //this.router.navigate(['/detallerechazo',element], { relativeTo: this.route ,skipLocationChange : true});
  //   this.router.navigate(['/soloinyectar',element]);
  // /*   const dialogRef = this.dialog.open(DetallerechazosModalComponent, {
  //     disableClose: true, width: '1800px',data: element
  //   }); */
  // }


}
