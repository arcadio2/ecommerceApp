import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoggedRoutingModule } from './logged-routing.module';
import { IndexloggedComponent } from './pages/indexlogged/indexlogged.component';
import {CarritoComprasComponent} from "./pages/carrito-compras/carrito-compras.component";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { InfoDetalladaComponent } from './pages/info-detallada/info-detallada.component';
import { ElementoCarritoComponent } from './pages/elemento-carrito/elemento-carrito.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import { ConfirmarCompraComponent } from './pages/confirmar-compra/confirmar-compra.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatStepperModule} from "@angular/material/stepper";
import {MatInputModule} from "@angular/material/input";

@NgModule({
  declarations: [
    CarritoComprasComponent,
    IndexloggedComponent,
    InfoDetalladaComponent,
    ElementoCarritoComponent,
    ConfirmarCompraComponent,
  ],
  exports: [
  ],
  imports: [
    CommonModule,
    LoggedRoutingModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatStepperModule,
    MatInputModule,
  ]
})
export class LoggedModule { }
