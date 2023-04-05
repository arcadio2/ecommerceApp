import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './shared/pages/home/home.component';
import { AuthGuard } from './logged/guards/auth.guard';
import { LoggedGuard } from './auth/guards/logged.guard';

const routes: Routes = [
  {
    path:'home',
    component:HomeComponent
  },
  {
    path:'auth',
    loadChildren: ()=>import('./auth/auth.module').then(m=>m.AuthModule),
   
  },
  {
    path:'user',
    loadChildren:()=>import('./logged/logged.module').then(m=>m.LoggedModule),
    canActivate:[AuthGuard],
    canLoad:[AuthGuard]
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
