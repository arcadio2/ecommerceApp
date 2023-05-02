import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PerfilComponent} from "./components/perfil/perfil.component";
import {CompletarPerfilComponent} from "./components/completar-perfil/completar-perfil.component";
import {ConfiguracionBarComponent} from "./components/configuracion-bar/configuracion-bar.component";
import { AuthGuard } from 'src/app/logged/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ConfiguracionBarComponent,
    canActivate:[AuthGuard],
    canLoad:[AuthGuard]
  },
  {
    path: 'completar-perfil',
    component: CompletarPerfilComponent,
    canActivate:[AuthGuard],
    canLoad:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguracionUsuarioRoutingModule { }
