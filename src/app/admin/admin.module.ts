import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminBarComponent } from './components/admin-bar/admin-bar.component';
import {InicioComponent} from "./components/inicio/inicio.component";
import {MatIconModule} from "@angular/material/icon";



@NgModule({
  declarations: [
    AdminBarComponent,
    InicioComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatIconModule
  ]
})
export class AdminModule { } 
