import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PerfilComponent} from "./components/perfil/perfil.component";
import {CompletarPerfilComponent} from "./components/completar-perfil/completar-perfil.component";
import {ConfiguracionBarComponent} from "./components/configuracion-bar/configuracion-bar.component";

const routes: Routes = [
  {
    path: '',
    component: ConfiguracionBarComponent
  },
  {
    path: 'completar-perfil',
    component: CompletarPerfilComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguracionUsuarioRoutingModule { }
