import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../auth/services/auth.service";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CategoriaControllersService {

  private url_base:string = environment.urlBase+'api/categorias/';
  constructor(private http:HttpClient, private authService:AuthService) { }

  getColores(){
    const token = this.authService.token;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    return this.http.get<any>(this.url_base+'colores',{headers:headers});
  }

  getCategoriasRopa(){
    const token = this.authService.token;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    return this.http.get<any>(this.url_base+'categorias',{headers:headers});
  }


  getTallas(){
    const token = this.authService.token;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })


    return this.http.get<any>(this.url_base+'tallas',{headers:headers});
  }

  getTallasSuperiores() {
    const token = this.authService.token;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })


    return this.http.get<any>(this.url_base+'tallas/true',{headers:headers});
  }


  getTallasInferiores(){
    const token = this.authService.token;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    return this.http.get<any>(this.url_base+'tallas/false',{headers:headers});
  }

}
