import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoggedRoutingModule } from './logged-routing.module';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { IndexloggedComponent } from './pages/indexlogged/indexlogged.component';
import {CarritoComprasComponent} from "./pages/carrito-compras/carrito-compras.component";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    CarritoComprasComponent,
    PerfilComponent,
    IndexloggedComponent,
  ],
  imports: [
    CommonModule,
    LoggedRoutingModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
  ]
})
export class LoggedModule { }
