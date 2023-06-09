import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexloggedComponent } from './pages/indexlogged/indexlogged.component';
import {CarritoComprasComponent} from "./pages/carrito-compras/carrito-compras.component";
import {ConfirmarCompraComponent} from "./pages/confirmar-compra/confirmar-compra.component";
import { ConfirmComponent } from './pages/confirm/confirm.component';
import { ActiveGuard } from '../auth/guards/active.guard';
import { NoactiveGuard } from '../auth/guards/noactive.guard';


const routes: Routes = [
  {
    path:'',component:IndexloggedComponent,
    children:[
      {
        path: 'configuracion-usuario',
        loadChildren: () => import('./pages/modules/configuracion-usuario/configuracion-usuario.module')
          .then(m => m.ConfiguracionUsuarioModule),
        canActivate:[ActiveGuard],
        canLoad:[ActiveGuard]
      },
      {
        path:'carrito-compras',
        component: CarritoComprasComponent,
        canActivate:[ActiveGuard],
        canLoad:[ActiveGuard]
      },
      {
        path:'confirmar-compra',
        component: ConfirmarCompraComponent,
        canActivate:[ActiveGuard],
        canLoad:[ActiveGuard]
      },
      {
        path:'confirm',
        component:ConfirmComponent,
        canActivate:[NoactiveGuard],
        canLoad:[NoactiveGuard]
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
