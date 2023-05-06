import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GestionComponent} from "./components/gestion/gestion.component";
import {AgregarProductoComponent} from "./components/agregar-producto/agregar-producto.component";

const routes: Routes = [
  {
    path: "",
    component: GestionComponent
  },
  {
    path: "agregar-producto",
    component: AgregarProductoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionProductosRoutingModule { }
