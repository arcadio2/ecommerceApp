import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VentasPedidosRoutingModule } from './ventas-pedidos-routing.module';
import { GestionVentasPedidosComponent } from './components/gestion-ventas-pedidos/gestion-ventas-pedidos.component';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatTableModule} from "@angular/material/table";
import {MatTooltipModule} from "@angular/material/tooltip";


@NgModule({
  declarations: [
    GestionVentasPedidosComponent
  ],
  imports: [
    CommonModule,
    VentasPedidosRoutingModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatTooltipModule
  ]
})
export class VentasPedidosModule { }
