import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { IndexauthComponent } from './pages/indexauth/indexauth.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LogoutComponent } from './pages/logout/logout.component';
import { RestablecerContraseniaComponent } from './pages/restablecer-contrasenia/restablecer-contrasenia.component';
import { CarritoComprasComponent } from './pages/carrito-compras/carrito-compras.component';


@NgModule({
  declarations: [
    IndexauthComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    RestablecerContraseniaComponent,
    CarritoComprasComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule
  ]
})
export class AuthModule { }
