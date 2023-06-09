import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/pages/home/home.component';
import { AuthGuard } from './logged/guards/auth.guard';
import { LoggedGuard } from './auth/guards/logged.guard';
import { ProductoComponent } from './shared/pages/producto/producto.component';
import { ListadoProductosComponent } from './shared/pages/listado-productos/listado-productos.component';
import { AdminGuard } from './admin/guards/admin.guard';
import { NoAdminGuard } from './admin/guards/no-admin.guard';
import { ConfirmComponent } from './shared/pages/confirm/confirm.component';
import { NoactiveGuard } from './auth/guards/noactive.guard';

const routes: Routes = [
  {
    path: "administrador",
    loadChildren:()=>import('./admin/admin.module').then(m=>m.AdminModule)
  },
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'producto/:id/:color/:talla',
    component:ProductoComponent
  },
  {
    path:'listado',
    component:ListadoProductosComponent
  },
  {
    path:'confirm',
    component:ConfirmComponent,
    canActivate:[NoactiveGuard],
    canLoad:[NoactiveGuard]
  },
  {
    path:'auth',
    loadChildren: ()=>import('./auth/auth.module').then(m=>m.AuthModule),

  },
  {
    path:'user',
    loadChildren:()=>import('./logged/logged.module').then(m=>m.LoggedModule),
    canActivate:[AuthGuard,NoAdminGuard],
    canLoad:[AuthGuard,NoAdminGuard],
  },
  {
    path:'admin',
    loadChildren:()=>import('./admin/admin.module').then(m=>m.AdminModule),
    canActivate:[AdminGuard],
    canLoad:[AdminGuard]
  },
  {
    path:'**',redirectTo:'home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
