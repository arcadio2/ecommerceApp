import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoggedRoutingModule } from './logged-routing.module';
import { PerfilComponent } from './pages/modules/configuracion-usuario/components/perfil/perfil.component';
import { IndexloggedComponent } from './pages/indexlogged/indexlogged.component';
import {CarritoComprasComponent} from "./pages/carrito-compras/carrito-compras.component";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { CompletarPerfilComponent } from './pages/modules/configuracion-usuario/components/completar-perfil/completar-perfil.component';
import { InfoDetalladaComponent } from './pages/info-detallada/info-detallada.component';
import { ElementoCarritoComponent } from './pages/elemento-carrito/elemento-carrito.component';
import {MatTooltipModule} from "@angular/material/tooltip";
import { ConfiguracionBarComponent } from './pages/modules/configuracion-usuario/components/configuracion-bar/configuracion-bar.component';

@NgModule({
  declarations: [
    CarritoComprasComponent,
    PerfilComponent,
    IndexloggedComponent,
    CompletarPerfilComponent,
    InfoDetalladaComponent,
    ElementoCarritoComponent,
    ConfiguracionBarComponent,
  ],
  exports: [
    ConfiguracionBarComponent
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
