import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EstadisticasRoutingModule } from './estadisticas-routing.module';
import { EstadisticasComponent } from './components/estadisticas/estadisticas.component';


@NgModule({
  declarations: [
    EstadisticasComponent
  ],
  imports: [
    CommonModule,
    EstadisticasRoutingModule
  ]
})
export class EstadisticasModule { }
