import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ConsultarPerfilComponent} from "./components/consultar-perfil/consultar-perfil.component";
import {EditarPerfilComponent} from "./components/editar-perfil/editar-perfil.component";
import {CambiarContraseniaComponent} from "./components/cambiar-contrasenia/cambiar-contrasenia.component";

const routes: Routes = [
  {
    path: '',
    component: ConsultarPerfilComponent
  },
  {
    path: 'editar-perfil',
    component: EditarPerfilComponent
  },
  {
    path: 'cambiar-contraseña',
    component: CambiarContraseniaComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InformacionPerfilRoutingModule { }
