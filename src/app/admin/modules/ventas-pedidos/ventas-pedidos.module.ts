import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VentasPedidosRoutingModule } from './ventas-pedidos-routing.module';
import { GestionVentasPedidosComponent } from './components/gestion-ventas-pedidos/gestion-ventas-pedidos.component';


@NgModule({
  declarations: [
    GestionVentasPedidosComponent
  ],
  imports: [
    CommonModule,
    VentasPedidosRoutingModule
  ]
})
export class VentasPedidosModule { }
