import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionPedidosRoutingModule } from './gestion-pedidos-routing.module';
import { GestionarPedidosComponent } from './components/gestionar-pedidos/gestionar-pedidos.component';
import { DetallesPedidosComponent } from './components/detalles-pedidos/detalles-pedidos.component';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatIconModule} from "@angular/material/icon";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";


@NgModule({
  declarations: [
    GestionarPedidosComponent,
    DetallesPedidosComponent
  ],
    imports: [
        CommonModule,
        GestionPedidosRoutingModule,
        MatButtonModule,
        MatCardModule,
        MatExpansionModule,
        MatIconModule,
        MatProgressSpinnerModule
    ]
})
export class GestionPedidosModule { }
