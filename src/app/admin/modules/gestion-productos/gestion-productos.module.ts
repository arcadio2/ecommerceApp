import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionProductosRoutingModule } from './gestion-productos-routing.module';
import { GestionComponent } from './components/gestion/gestion.component';
import { AgregarProductoComponent } from './components/agregar-producto/agregar-producto.component';
import {MatDialogModule} from "@angular/material/dialog";


@NgModule({
  declarations: [
    GestionComponent,
    AgregarProductoComponent
  ],
  imports: [
    CommonModule,
    GestionProductosRoutingModule,
    MatDialogModule
  ]
})
export class GestionProductosModule { }
