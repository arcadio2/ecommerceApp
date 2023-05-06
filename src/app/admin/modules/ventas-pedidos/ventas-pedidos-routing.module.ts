import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GestionVentasPedidosComponent} from "./components/gestion-ventas-pedidos/gestion-ventas-pedidos.component";

const routes: Routes = [
  {
    path: "",
    component: GestionVentasPedidosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VentasPedidosRoutingModule { }
