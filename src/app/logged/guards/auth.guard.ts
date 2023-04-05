import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})


export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService,
    private router: Router,private toast:ToastrService){}

  canActivate(): Observable<boolean > | boolean  {
    if(this.authService.isAuthenticated()){
      
    if (this.isTokenExpirado()) {
        this.authService.logout();
        this.router.navigateByUrl('/auth'); 
        return false;
      }
      return true;
    }
     /* this.toast.info('Debes iniciar sesión');  */
    this.toast.info('Debes iniciar sesión', ' Error', {
      timeOut: 2000,
    });
    this.router.navigateByUrl('/auth'); 
    return false;
  }
  canLoad(): Observable<boolean >| boolean {

    if(this.authService.isAuthenticated()){
      
      if (this.isTokenExpirado()) {
          this.authService.logout();
          this.router.navigateByUrl('/auth'); 
          return false;
        }
        return true;
      }
       /* this.toast.info('Debes iniciar sesión');  */
      this.toast.info('Debes iniciar sesión', ' Error', {
        timeOut: 2000,
      });
      this.router.navigateByUrl('/auth'); 
      return false;
  }


  isTokenExpirado(): boolean {
    let token = this.authService.token;
    let payload = this.authService.obtenerDatosToken(token!);
    let now = new Date().getTime() / 1000;
    if (payload.exp < now) {
      return true;
    }
    return false;
  }
}
