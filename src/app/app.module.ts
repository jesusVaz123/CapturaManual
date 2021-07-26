import { BrowserModule } from '@angular/platform-browser';
import { NgModule ,ChangeDetectorRef } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AquirerService} from './service/aquirer.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {DatePipe} from "@angular/common";
import { CommonModule } from "@angular/common";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatInputModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import {MatNativeDateModule} from '@angular/material';
import {MatDialogModule} from '@angular/material/dialog';
import { MatSortModule } from '@angular/material';
import { OverlayModule } from "@angular/cdk/overlay";
import {DateAdapter, MAT_DATE_FORMATS} from '@angular/material/core';
import { AppDateAdapter, APP_DATE_FORMATS } from 'src/app/page/gestionrechazo/rechazos-lotes/format-datepicker';
import { SideBarComponent } from './component/side-bar/side-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ButtonComponent } from './component/button/button.component';
import {MatTabsModule} from '@angular/material/tabs';
import { MaterialModule } from './material.module';
import { HomeComponent } from './page/home/home.component';
import { GestionCasosComponent } from './page/recuperacionPagares/gestion-casos/gestion-casos.component';
import { FooterComponent } from './component/footer/footer.component';
import { AdquirienteComponent } from './page/adquiriente/adquiriente.component';
import { ConsultaVentaComponent } from './page/consulta-venta/consulta-venta.component';
import { ConfirmationReportComponent ,venta ,cargoabono,reinyeccion} from './page/confirmation-report/confirmation-report.component';
import { HomeAmexComponent } from './page/home-amex/home-amex.component';
import { VistaConcentradoComponent } from './page/vista-concentrado/vista-concentrado.component';
import { ReporteSumaryComponent } from './page/reportegrrnc/reporte-sumary/reporte-sumary.component';
import { ReporteTrailerComponent } from './page/reportegrrnc/reporte-trailer/reporte-trailer.component';
import { ReporteTransactnComponent } from './page/reportegrrnc/reporte-transactn/reporte-transactn.component';
import { ReporteTxnpricingComponent } from './page/reportegrrnc/reporte-txnpricing/reporte-txnpricing.component';
import { ReporteSubmissionComponent } from './page/reportegrrnc/reporte-submission/reporte-submission.component';
import { VistaModalComponent } from './page/vista-modal/vista-modal.component';
import { ReporteChargebackComponent } from './page/reportegrrnc/reporte-chargeback/reporte-chargeback.component';
import { ReporteGeneralComponent } from './page/reportegrrnc/reporte-general/reporte-general.component';
import { ReporteAdjustmentComponent } from './page/reportegrrnc/reporte-adjustment/reporte-adjustment.component';
import { RechazoSintaxisComponent, obtenerrechazo } from './page/rechazo-sintaxis/rechazo-sintaxis.component';
import { DetallePagosComponent } from './page/reportegrrnc/detalle-pagos/detalle-pagos.component';
import { ConsolidadoPagosComponent } from './page/reportegrrnc/consolidado-pagos/consolidado-pagos.component';
import { RechazosLotesComponent } from './page/gestionrechazo/rechazos-lotes/rechazos-lotes.component';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { RechazosComponent } from './page/revisionrechazosnacional/rechazos/rechazos.component';
import { FuentepapelComponent } from './page/revisionrechazosnacional/fuentepapel/fuentepapel.component';
import { ConsultaarchivoComponent } from './page/revisionrechazosnacional/consultaarchivo/consultaarchivo.component';
import { CapturamanualComponent } from './page/revisionrechazosnacional/capturamanual/capturamanual.component';
import { DetallerechazosModalComponent } from './page/revisionrechazosnacional/detallerechazos-modal/detallerechazos-modal.component';
import { ModalDetalleComponent } from './page/revisionrechazosnacional/modal-detalle/modal-detalle.component';
import { ModalOpcionesComponent } from './page/revisionrechazosnacional/modal-opciones/modal-opciones.component';
import { ModificacionRechazoModalComponent } from './page/revisionrechazosnacional/modificacion-rechazo-modal/modificacion-rechazo-modal.component'
import { CargaadquirenteComponent } from './page/revisionrechazosnacional/cargaadquirente/cargaadquirente.component';
import { CargaemisornacionalComponent } from './page/revisionrechazosnacional/cargaemisornacional/cargaemisornacional.component';
import { ModalCargaEmisorComponent } from './page/revisionrechazosnacional/modal-carga-emisor/modal-carga-emisor.component';
import { ModalCargaAdquirenteComponent } from './page/revisionrechazosnacional/modal-carga-adquirente/modal-carga-adquirente.component';

@NgModule({
  declarations: [
    AppComponent,
    SideBarComponent,
    ButtonComponent,
    HomeComponent,
    GestionCasosComponent,
    FooterComponent,
    AdquirienteComponent,
    ConsultaVentaComponent,
    ConfirmationReportComponent,
    cargoabono,
    reinyeccion,
    venta,
    obtenerrechazo,


    HomeAmexComponent,
    VistaConcentradoComponent,
    ReporteSumaryComponent,
    ReporteTrailerComponent,
    ReporteTransactnComponent,
    ReporteTxnpricingComponent,
    ReporteSubmissionComponent,
    VistaModalComponent,
    ReporteChargebackComponent,
    ReporteGeneralComponent,
    ReporteAdjustmentComponent,
    RechazoSintaxisComponent,
    DetallePagosComponent,
    ConsolidadoPagosComponent,
    RechazosLotesComponent,
    RechazosComponent,
    FuentepapelComponent,
    ConsultaarchivoComponent,
    CapturamanualComponent,
    DetallerechazosModalComponent,
    ModalDetalleComponent,
    ModalOpcionesComponent,
    ModificacionRechazoModalComponent,
    CargaadquirenteComponent,
    CargaemisornacionalComponent,
    ModalCargaEmisorComponent,
    ModalCargaAdquirenteComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
     MatTabsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatPaginatorModule,
    MatTableModule,
    MatGridListModule,
    MatDatepickerModule,
    MatIconModule,
    MatNativeDateModule,
    MatDialogModule,
    MatSortModule,
    MaterialModule,
    OverlayModule,
    MatCheckboxModule,

    CommonModule
  ],

  providers: [AquirerService,DatePipe,ConfirmationReportComponent],
 entryComponents: [venta,cargoabono,reinyeccion,obtenerrechazo,DetallerechazosModalComponent,
  ModificacionRechazoModalComponent,
  ModalOpcionesComponent,
  ModalCargaEmisorComponent,
  ModalCargaAdquirenteComponent,
  ModalDetalleComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
