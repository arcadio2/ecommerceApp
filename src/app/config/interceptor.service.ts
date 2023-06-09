import { Inject, Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth/services/auth.service';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{


  constructor(private auth:AuthService) { 
    
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.auth.token;
   /*  const headers = req.headers.set('Access-Control-Allow-Origin', 'http://localhost:4200');
    const newReq = req.clone({ headers });
    return next.handle(newReq); */
   /*  const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }) */

    
    if(token){
      const apiReq = req.url.includes('http') ? req : req.clone({ url: `${req.url}`,
      setHeaders: {
        authorization: `Bearer ${ token }`,
      }}
      );
   
      return next.handle(apiReq);
    }else{
      const apiReq = req.url.includes('http') ? req : req.clone({ url: `${req.url}`});
      return next.handle(apiReq);
    }
  }
}
