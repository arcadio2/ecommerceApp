import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GestionarDirectorioComponent} from "./components/gestionar-directorio/gestionar-directorio.component";

const routes: Routes = [
  {
    path: '',
    component: GestionarDirectorioComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestionDirectorioRoutingModule { }
