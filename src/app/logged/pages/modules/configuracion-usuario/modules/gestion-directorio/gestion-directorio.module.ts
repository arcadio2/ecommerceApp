import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionDirectorioRoutingModule } from './gestion-directorio-routing.module';
import { GestionarDirectorioComponent } from './components/gestionar-directorio/gestionar-directorio.component';
import { AgregarDireccionComponent } from './components/agregar-direccion/agregar-direccion.component';
import {MatDialogModule} from "@angular/material/dialog";
import { EditarDireccionComponent } from './components/editar-direccion/editar-direccion.component';
import {MatButtonModule} from "@angular/material/button";


@NgModule({
  declarations: [
    GestionarDirectorioComponent,
    AgregarDireccionComponent,
    EditarDireccionComponent
  ],
  imports: [
    CommonModule,
    GestionDirectorioRoutingModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class GestionDirectorioModule { }
