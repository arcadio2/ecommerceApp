import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GestionarPedidosComponent} from "./components/gestionar-pedidos/gestionar-pedidos.component";

const routes: Routes = [
  {
    path: "",
    component: GestionarPedidosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionPedidosRoutingModule { }
