import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class NoAdminGuard implements CanActivate, CanLoad {
  constructor(private authService: AuthService,
    private router: Router){

  }

  canActivate(): Observable<boolean > | Promise<boolean > | boolean  {
    if(this.authService.isAdmin()){
      this.router.navigateByUrl("/admin"); 
      return false; 
    }
    return true;
  }
  canLoad(): Observable<boolean > | Promise<boolean > | boolean {
    return true;
  }
}