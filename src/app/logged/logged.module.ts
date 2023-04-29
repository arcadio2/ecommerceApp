import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoggedRoutingModule } from './logged-routing.module';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { IndexloggedComponent } from './pages/indexlogged/indexlogged.component';
import {CarritoComprasComponent} from "./pages/carrito-compras/carrito-compras.component";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CompletarPerfilComponent } from './pages/completar-perfil/completar-perfil.component';
import { InfoDetalladaComponent } from './pages/info-detallada/info-detallada.component';
import { ElementoCarritoComponent } from './pages/elemento-carrito/elemento-carrito.component';
import {MatTooltipModule} from "@angular/material/tooltip";

@NgModule({
  declarations: [
    CarritoComprasComponent,
    PerfilComponent,
    IndexloggedComponent,
    CompletarPerfilComponent,
    InfoDetalladaComponent,
    ElementoCarritoComponent,
  ],
    imports: [
        CommonModule,
        LoggedRoutingModule,
        MatIconModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
        MatTooltipModule,
    ]
})
export class LoggedModule { }
