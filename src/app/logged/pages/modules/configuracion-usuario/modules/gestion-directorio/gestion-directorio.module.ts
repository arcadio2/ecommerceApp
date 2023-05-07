import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GestionDirectorioRoutingModule } from './gestion-directorio-routing.module';
import { GestionarDirectorioComponent } from './components/gestionar-directorio/gestionar-directorio.component';


@NgModule({
  declarations: [
    GestionarDirectorioComponent
  ],
  imports: [
    CommonModule,
    GestionDirectorioRoutingModule
  ]
})
export class GestionDirectorioModule { }
