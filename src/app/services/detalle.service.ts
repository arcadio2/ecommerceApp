import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DetalleService {


  private url_base:string = environment.urlBase+'api/detalle/';
  token = this.authService.token;

  constructor(private http:HttpClient, private authService:AuthService,
    private router: Router) { }

    getDetalleProdcutoCompra(id:number,color:string,talla:string){
      return this.http.get<any>(this.url_base+'detalle/'+id+"/"+color+"/"+talla);
    }



}
