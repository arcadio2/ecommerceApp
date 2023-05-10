import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionProductosRoutingModule } from './gestion-productos-routing.module';
import { GestionComponent } from './components/gestion/gestion.component';
import { AgregarProductoComponent } from './components/agregar-producto/agregar-producto.component';
import {MatDialogModule} from "@angular/material/dialog";
import {TextFieldModule} from "@angular/cdk/text-field";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSelectModule} from "@angular/material/select";
import {MatIconModule} from "@angular/material/icon";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatButtonModule} from "@angular/material/button";
import {MatExpansionModule} from "@angular/material/expansion";
import {MatCardModule} from "@angular/material/card";
import {MatListModule} from "@angular/material/list";
import {MatProgressBarModule} from "@angular/material/progress-bar";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";


@NgModule({
  declarations: [
    GestionComponent,
    AgregarProductoComponent
  ],
  imports: [
    CommonModule,
    GestionProductosRoutingModule,
    MatDialogModule,
    TextFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule,
    MatTooltipModule,
    MatButtonModule,
    MatExpansionModule,
    MatCardModule,
    MatListModule,
    MatProgressBarModule,
    FormsModule,
    MatProgressSpinnerModule
  ]
})
export class GestionProductosModule { }
