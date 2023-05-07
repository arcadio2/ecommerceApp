import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ConsultarPerfilComponent} from "./modules/informacion-perfil/components/consultar-perfil/consultar-perfil.component";
import {EditarPerfilComponent} from "./modules/informacion-perfil/components/editar-perfil/editar-perfil.component";
import {ConfiguracionBarComponent} from "./components/configuracion-bar/configuracion-bar.component";
import { AuthGuard } from 'src/app/logged/guards/auth.guard';
import {InicioClienteComponent} from "./components/inicio-cliente/inicio-cliente.component";

const routes: Routes = [
  {
    path: '',
    component: InicioClienteComponent,
    canActivate:[AuthGuard],
    canLoad:[AuthGuard],
    children: [
      {
        path: "",
        loadChildren:()=>import('./modules/informacion-perfil/informacion-perfil.module').then(m=>m.InformacionPerfilModule)
      },
      {
        path: "gestion-pedidos",
        loadChildren:()=>import('./modules/gestion-pedidos/gestion-pedidos.module').then(m=>m.GestionPedidosModule)
      },
      {
        path: "gestion-directorio",
        loadChildren:()=>import('./modules/gestion-directorio/gestion-directorio.module').then(m=>m.GestionDirectorioModule)
      }
    ]
  },
  {
    path: "**", redirectTo:''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfiguracionUsuarioRoutingModule { }
