import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReporteGeneralRoutingModule } from './reporte-general-routing.module';
import { ReporteComponent } from './components/reporte/reporte.component';


@NgModule({
  declarations: [
    ReporteComponent
  ],
  imports: [
    CommonModule,
    ReporteGeneralRoutingModule
  ]
})
export class ReporteGeneralModule { }
