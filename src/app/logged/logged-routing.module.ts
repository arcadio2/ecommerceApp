import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexloggedComponent } from './pages/indexlogged/indexlogged.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import {CarritoComprasComponent} from "./pages/carrito-compras/carrito-compras.component";
import {CompletarPerfilComponent} from "./pages/completar-perfil/completar-perfil.component";
import {InfoDetalladaComponent} from "./pages/info-detallada/info-detallada.component";


const routes: Routes = [
  {
    path:'',component:IndexloggedComponent,
    children:[
      {
        path:'perfil',
        component:PerfilComponent,
      },
      {
        path:'carrito-compras',
        component: CarritoComprasComponent
      },
      {
        path:'Información-detallada-producto',
        component: InfoDetalladaComponent
      },
      {
        path:'completar-perfil',
        component: CompletarPerfilComponent
      },
      {
        path:'**',
        redirectTo:'perfil'
      },
    ]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoggedRoutingModule { }
