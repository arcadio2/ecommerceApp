import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MenuInicioRoutingModule } from './menu-inicio-routing.module';
import { MenuComponent } from './components/menu/menu.component';


@NgModule({
  declarations: [
    MenuComponent
  ],
  imports: [
    CommonModule,
    MenuInicioRoutingModule
  ]
})
export class MenuInicioModule { }
