import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionProductosRoutingModule } from './gestion-productos-routing.module';
import { GestionComponent } from './components/gestion/gestion.component';


@NgModule({
  declarations: [
    GestionComponent
  ],
  imports: [
    CommonModule,
    GestionProductosRoutingModule
  ]
})
export class GestionProductosModule { }
