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
import { PerfilComponent } from './logged/pages/perfil/perfil.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ToastrModule.forRoot(
      {
          positionClass: 'toast-bottom-center', timeOut: 5000,
          preventDuplicates: true,
          closeButton: true,
          maxOpened: 1,
          
          autoDismiss: true,
          enableHtml: true},
    ),
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    },
   /*  {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorService,
      multi: true
    }, */
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
