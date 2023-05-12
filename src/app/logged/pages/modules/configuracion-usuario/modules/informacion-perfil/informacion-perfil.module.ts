import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InformacionPerfilRoutingModule } from './informacion-perfil-routing.module';
import {ConsultarPerfilComponent} from "./components/consultar-perfil/consultar-perfil.component";
import {EditarPerfilComponent} from "./components/editar-perfil/editar-perfil.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import { CambiarContraseniaComponent } from './components/cambiar-contrasenia/cambiar-contrasenia.component';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import {TextFieldModule} from "@angular/cdk/text-field";


@NgModule({
  declarations: [
    ConsultarPerfilComponent,
    EditarPerfilComponent,
    CambiarContraseniaComponent
  ],
  imports: [
    CommonModule,
    InformacionPerfilRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    TextFieldModule
  ]
})
export class InformacionPerfilModule { }
