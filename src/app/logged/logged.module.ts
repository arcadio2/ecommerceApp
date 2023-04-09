import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoggedRoutingModule } from './logged-routing.module';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { IndexloggedComponent } from './pages/indexlogged/indexlogged.component';
import { CarritoComprasComponent } from '../auth/pages/carrito-compras/carrito-compras.component';


@NgModule({
  declarations: [
    PerfilComponent,
    IndexloggedComponent,
    CarritoComprasComponent
  ],
  imports: [
    CommonModule,
    LoggedRoutingModule
  ]
})
export class LoggedModule { }
