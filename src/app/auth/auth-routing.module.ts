import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexauthComponent } from './pages/indexauth/indexauth.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { LoggedGuard } from './guards/logged.guard';
import {RestablecerContraseniaComponent} from "./pages/restablecer-contrasenia/restablecer-contrasenia.component";
import {CarritoComprasComponent} from "./pages/carrito-compras/carrito-compras.component";

const routes: Routes = [
  {
    path: '',component:IndexauthComponent,
    children:[
      {
        path:'iniciar-sesion',
        component:LoginComponent,
        canActivate:[LoggedGuard],
        canLoad:[LoggedGuard]
      },
      {
        path:'registro',
        component:RegisterComponent,
        canActivate:[LoggedGuard],
        canLoad:[LoggedGuard]
      },
      {
        path:'restablecer-contraseña',
        component: RestablecerContraseniaComponent,
        canActivate: [LoggedGuard],
        canLoad: [LoggedGuard]
      },
      {
        path:'logout',
        component:LogoutComponent
      },
      {
        path: 'carrito-compras',
        component: CarritoComprasComponent,
        canActivate:[LoggedGuard],
        canLoad: [LoggedGuard]
      },

      {path:'**',redirectTo:'iniciar-sesion'}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
