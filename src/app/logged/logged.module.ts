import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoggedRoutingModule } from './logged-routing.module';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { IndexloggedComponent } from './pages/indexlogged/indexlogged.component';


@NgModule({
  declarations: [
    PerfilComponent,
    IndexloggedComponent,
  ],
  imports: [
    CommonModule,
    LoggedRoutingModule
  ]
})
export class LoggedModule { }
