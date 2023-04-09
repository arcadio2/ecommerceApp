import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexloggedComponent } from './pages/indexlogged/indexlogged.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import {CarritoComprasComponent} from "./pages/carrito-compras/carrito-compras.component";

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
        path:'**',
        redirectTo:'perfil'
      }
    ]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoggedRoutingModule { }
