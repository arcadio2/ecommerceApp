import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionPedidosRoutingModule } from './gestion-pedidos-routing.module';
import { GestionarPedidosComponent } from './components/gestionar-pedidos/gestionar-pedidos.component';


@NgModule({
  declarations: [
    GestionarPedidosComponent
  ],
  imports: [
    CommonModule,
    GestionPedidosRoutingModule
  ]
})
export class GestionPedidosModule { }
