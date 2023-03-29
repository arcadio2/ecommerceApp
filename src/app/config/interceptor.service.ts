import { Inject, Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../auth/services/auth.service';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor{


  constructor(private auth:AuthService,@Inject('BASE_API_URL') private baseUrl: string) { 
    
  }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.auth.token;
    if(token){
      const apiReq = req.url.includes('http') ? req : req.clone({ url: `${this.baseUrl}${req.url}`,
      setHeaders: {
        authorization: `Bearer ${ token }`
      }}
      );
      return next.handle(apiReq);
    }else{
      const apiReq = req.url.includes('http') ? req : req.clone({ url: `${this.baseUrl}${req.url}`});
      return next.handle(apiReq);
    }
  }
}
