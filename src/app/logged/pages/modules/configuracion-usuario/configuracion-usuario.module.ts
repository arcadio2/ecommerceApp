import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfiguracionUsuarioRoutingModule } from './configuracion-usuario-routing.module';
import { InicioClienteComponent } from './components/inicio-cliente/inicio-cliente.component';
import {ConfiguracionBarComponent} from "./components/configuracion-bar/configuracion-bar.component";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    InicioClienteComponent,
    ConfiguracionBarComponent
  ],
  imports: [
    CommonModule,
    ConfiguracionUsuarioRoutingModule,
    MatIconModule
  ]
})
export class ConfiguracionUsuarioModule { }
