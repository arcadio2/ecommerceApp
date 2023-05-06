import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GestionComponent} from "./components/gestion/gestion.component";

const routes: Routes = [
  {
    path: "",
    component: GestionComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionProductosRoutingModule { }
