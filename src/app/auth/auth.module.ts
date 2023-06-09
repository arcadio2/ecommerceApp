import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { IndexauthComponent } from './pages/indexauth/indexauth.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LogoutComponent } from './pages/logout/logout.component';
import { ReestablecerContraseniaComponent } from './pages/reestablecer-contrasenia/reestablecer-contrasenia.component';
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";


@NgModule({
  declarations: [
    IndexauthComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    ReestablecerContraseniaComponent,

  ],
    imports: [
        CommonModule,
        AuthRoutingModule,
        ReactiveFormsModule,
        MatProgressSpinnerModule
    ]
})
export class AuthModule { }
