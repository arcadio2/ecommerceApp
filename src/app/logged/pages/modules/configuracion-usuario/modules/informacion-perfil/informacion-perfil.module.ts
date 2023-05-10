import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InformacionPerfilRoutingModule } from './informacion-perfil-routing.module';
import {ConsultarPerfilComponent} from "./components/consultar-perfil/consultar-perfil.component";
import {EditarPerfilComponent} from "./components/editar-perfil/editar-perfil.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";


@NgModule({
  declarations: [
    ConsultarPerfilComponent,
    EditarPerfilComponent
  ],
    imports: [
        CommonModule,
        InformacionPerfilRoutingModule,
        ReactiveFormsModule,
        MatDialogModule,
        FormsModule
    ]
})
export class InformacionPerfilModule { }
