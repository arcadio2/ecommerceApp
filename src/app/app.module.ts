import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { HomeComponent } from './shared/pages/home/home.component';
import { ToastrModule } from 'ngx-toastr';
import { InterceptorService } from './config/interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductoComponent } from './shared/pages/producto/producto.component';
import {MatButtonModule} from "@angular/material/button";
import { DetalleProductoComponent } from './shared/components/detalle-producto/detalle-producto.component';
import { ListadoProductosComponent } from './shared/pages/listado-productos/listado-productos.component';
import { DialogComponentComponent } from './shared/components/dialog-component/dialog-component.component';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { ButtonComponent } from './shared/compinents/button/button.component';
import {LoggedModule} from "./logged/logged.module";
import {MatIconModule} from "@angular/material/icon";
import { VisualizarComentariosComponent } from './shared/pages/visualizar-comentarios/visualizar-comentarios.component';
import { CrearComentarioComponent } from './shared/pages/crear-comentario/crear-comentario.component';
import {TextFieldModule} from "@angular/cdk/text-field";


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    ProductoComponent,
    DetalleProductoComponent,
    ListadoProductosComponent,
    DialogComponentComponent,
    ButtonComponent,
    VisualizarComentariosComponent,
    CrearComentarioComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    ToastrModule.forRoot(
      {
        positionClass: 'toast-bottom-center', timeOut: 5000,
        preventDuplicates: true,
        closeButton: true,
        maxOpened: 1,

        autoDismiss: true,
        enableHtml: true
      },
    ),
    HttpClientModule,
    MatButtonModule,
    MatDialogModule,
    LoggedModule,
    MatIconModule,
    TextFieldModule
  ],
  providers: [
/*     {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }, */

    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}

   /*  {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }, */
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
