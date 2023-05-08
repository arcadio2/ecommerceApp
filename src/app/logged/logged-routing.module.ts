import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexloggedComponent } from './pages/indexlogged/indexlogged.component';
import {CarritoComprasComponent} from "./pages/carrito-compras/carrito-compras.component";
import {ConfirmarCompraComponent} from "./pages/confirmar-compra/confirmar-compra.component";


const routes: Routes = [
  {
    path:'',component:IndexloggedComponent,
    children:[
      {
        path: 'configuracion-usuario',
        loadChildren: () => import('./pages/modules/configuracion-usuario/configuracion-usuario.module')
          .then(m => m.ConfiguracionUsuarioModule)
      },
      {
        path:'carrito-compras',
        component: CarritoComprasComponent
      },
      {
        path:'confirmar-compra',
        component: ConfirmarCompraComponent
      },
      {
        path:'**',
        redirectTo:'configuracion-usuario'
      },
    ]
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoggedRoutingModule { }
