import { AdquirienteComponent } from './page/adquiriente/adquiriente.component';
import { HomeComponent } from './page/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GestionCasosComponent } from './page/recuperacionPagares/gestion-casos/gestion-casos.component';
import { ConsultaVentaComponent } from './page/consulta-venta/consulta-venta.component';
import { ConfirmationReportComponent } from './page/confirmation-report/confirmation-report.component';
import { HomeAmexComponent } from './page/home-amex/home-amex.component';
import { VistaConcentradoComponent } from './page/vista-concentrado/vista-concentrado.component';
import { ReporteSumaryComponent } from './page/reportegrrnc/reporte-sumary/reporte-sumary.component';
import { ReporteChargebackComponent } from './page/reportegrrnc/reporte-chargeback/reporte-chargeback.component';

import { ReporteTrailerComponent } from './page/reportegrrnc/reporte-trailer/reporte-trailer.component';
import { ReporteTransactnComponent } from './page/reportegrrnc/reporte-transactn/reporte-transactn.component';
import { ReporteTxnpricingComponent } from './page/reportegrrnc/reporte-txnpricing/reporte-txnpricing.component';
import { ReporteSubmissionComponent } from './page/reportegrrnc/reporte-submission/reporte-submission.component';
import { VistaModalComponent } from './page/vista-modal/vista-modal.component';
import { ReporteGeneralComponent } from './page/reportegrrnc/reporte-general/reporte-general.component';
import { ReporteAdjustmentComponent } from './page/reportegrrnc/reporte-adjustment/reporte-adjustment.component';
import { RechazoSintaxisComponent } from './page/rechazo-sintaxis/rechazo-sintaxis.component';
import { ConsolidadoPagosComponent } from './page/reportegrrnc/consolidado-pagos/consolidado-pagos.component';
import { DetallePagosComponent } from './page/reportegrrnc/detalle-pagos/detalle-pagos.component';
import { RechazosLotesComponent } from './page/gestionrechazo/rechazos-lotes/rechazos-lotes.component';
//////////////////////BANORTE///////////////////////////
import { RechazosComponent } from './page/revisionrechazosnacional/rechazos/rechazos.component';
import { FuentepapelComponent } from './page/revisionrechazosnacional/fuentepapel/fuentepapel.component';
import { ConsultaarchivoComponent } from './page/revisionrechazosnacional/consultaarchivo/consultaarchivo.component'
import { DetallerechazosModalComponent } from './page/revisionrechazosnacional/detallerechazos-modal/detallerechazos-modal.component';
import { CapturamanualComponent } from './page/revisionrechazosnacional/capturamanual/capturamanual.component';
import { CargaadquirenteComponent } from './page/revisionrechazosnacional/cargaadquirente/cargaadquirente.component';
import { CargaemisornacionalComponent } from './page/revisionrechazosnacional/cargaemisornacional/cargaemisornacional.component';

const routes: Routes = [
  { path: 'select_acquirer',component: AdquirienteComponent },
  { path: 'home', component: HomeComponent },
  { path: 'home-amex', component: HomeAmexComponent },
  { path: 'confirmation-report', component: ConfirmationReportComponent },
  { path: 'consulta-venta', component: ConsultaVentaComponent },
  { path: 'vista-concentrado', component: VistaConcentradoComponent },
  { path: 'reporte-sumary', component: ReporteSumaryComponent },
  { path: 'reporte-chargeback', component: ReporteChargebackComponent },
  { path: 'reporte-trailer', component: ReporteTrailerComponent },
  { path: 'reporte-transactn', component: ReporteTransactnComponent },
  { path: 'reporte-txnpricing', component: ReporteTxnpricingComponent },
  { path: 'reporte-submission', component: ReporteSubmissionComponent },
  { path: 'rechazo-sintaxis', component: RechazoSintaxisComponent },
  { path: 'vista-modal', component: VistaModalComponent },
  { path: 'reporte-adjustment', component: ReporteAdjustmentComponent },
  { path: 'consolidado-pagos', component: ConsolidadoPagosComponent },
  { path: 'detalle-pagos', component: DetallePagosComponent },
  { path: 'rechazos-lotes', component: RechazosLotesComponent },
  { path: 'recuperacion-pagares/gestion-casos', component: VistaConcentradoComponent },
  //////////////////BANORTE///////////////
  { path: 'rechazos-nacional', component: RechazosComponent },
  { path: 'fuente-papel', component: FuentepapelComponent },
  { path: 'consulta-archivo', component: ConsultaarchivoComponent },
  { path: 'reprte-grrcn', component: ReporteGeneralComponent },
  { path: 'captura-manual', component: CapturamanualComponent },
  { path: 'carga-adquirente', component: CargaadquirenteComponent },
  { path: 'carga-emisor-nacional', component: CargaemisornacionalComponent },
  { path: 'detallerechazo/:accion/:folio', component: DetallerechazosModalComponent},
  { path: '**', redirectTo: 'confirmation-report' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
