import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class ActiveGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService,
    private router: Router,private toast:ToastrService){}


  canActivate(): Observable<boolean>  | boolean {

    if(!this.authService.isActive()){
      this.router.navigateByUrl('/user/confirm'); 
      this.toast.error("Por favor, confirma tu correo electronico")
      return false; 
    }
    return true; 
  }
  canLoad(): Observable<boolean > | boolean  {
    if(!this.authService.isActive()){
      this.router.navigateByUrl('/user/confirm'); 
      this.toast.error("Por favor, confirma tu correo electronico")
      return false; 
    }
    return true; 
  }
}
