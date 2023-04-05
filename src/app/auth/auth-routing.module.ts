import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexauthComponent } from './pages/indexauth/indexauth.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { LogoutComponent } from './pages/logout/logout.component';
import { LoggedGuard } from './guards/logged.guard';

const routes: Routes = [
  {
    path: '',component:IndexauthComponent,
    children:[
      {
        path:'login',
        component:LoginComponent,
        canActivate:[LoggedGuard],
        canLoad:[LoggedGuard]
      },
      {
        path:'registro',
        component:RegisterComponent,
        canActivate:[LoggedGuard],
        canLoad:[LoggedGuard]
      },
      {
        path:'logout',
        component:LogoutComponent
      },
  
      {path:'**',redirectTo:'login'}
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
