import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/services/auth.service';
import { Router } from '@angular/router';
import {Bolsa, ComentarioProducto, DetalleDto, DetalleProducto} from '../models/producto.model';
import {Compra} from "../models/compras.model";

@Injectable({
  providedIn: 'root'
})
export class ComprasService {
  token = this.authService.token;
  private productos_:DetalleDto []=[];
  private bolsa_:Bolsa [] = []
  private url_base:string = environment.urlBase+'api/compras/';
  constructor(private http:HttpClient, private authService:AuthService,
    private router: Router) {

    }


  listComprasByUsuario(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    })

    return this.http.get<any>(this.url_base+'get',{headers:headers});

  }

  crearListaCompras(compras: Compra[]){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    })

    return this.http.post<any>(this.url_base+'save', compras, {headers:headers});

  }

  listAllCompras(){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    })

    return this.http.get<any>(this.url_base+'get/all',{headers:headers});
  }


    set productos(productos: DetalleDto []) {
      this.productos_= productos;
    }

    get productos() {
      return this.productos_;
    }

    set bolsa(bolsa: Bolsa []) {
      this.bolsa_= bolsa;
    }

    get bolsa() {
      return this.bolsa_;
    }
}
