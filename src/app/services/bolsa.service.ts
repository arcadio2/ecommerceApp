import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/services/auth.service';
import { Bolsa } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class BolsaService {
  private url_base:string = environment.urlBase+'api/productos/';
  token = this.authService.token;
  constructor(private http:HttpClient, private authService:AuthService,
    private router: Router) { }

    guardarCarrito(carrito:Bolsa){
      console.log(carrito)
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
      return this.http.post<any>(this.url_base+'bolsa',carrito,{headers:headers});
    }
    eliminarCarrito(id:number){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
      return this.http.delete<any>(this.url_base+'bolsa/'+id,{headers:headers});
    }

    obtenerCarrito(){
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.token}`
      })
      return this.http.get<any>(this.url_base+'get/bolsa',{headers:headers});
    }
}
