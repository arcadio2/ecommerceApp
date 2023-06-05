import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/services/auth.service';
import { Router } from '@angular/router';
import {Bolsa, ComentarioProducto, DetalleDto, DetalleProducto, Producto} from '../models/producto.model';
import {Compra} from "../models/compras.model";

@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  private productos_:DetalleDto []=[];
  private bolsa_:Bolsa [] = []
  private url_base:string = environment.urlBase+'api/compras/';
  constructor(private http:HttpClient, private authService:AuthService,
    private router: Router) {

    }


  listComprasByUsuario(){
    const token = this.authService.token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    return this.http.get<any>(this.url_base+'get',{headers:headers});

  }
  
  listComprasByUsuarioAndProductExist(producto:Producto){
    const token = this.authService.token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    return this.http.get<any>(this.url_base+'get/'+producto.id,{headers:headers});

  }

  crearListaCompras(compras: Compra[]){
    const token = this.authService.token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    return this.http.post<any>(this.url_base+'save', compras, {headers:headers});

  }

  listAllCompras(){
    const token = this.authService.token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    return this.http.get<any>(this.url_base+'get/all',{headers:headers});
  }

  cambiarEstadoPedido(compra:Compra){
    const token = this.authService.token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.put<any>(this.url_base+'estatus',compra,{headers:headers});
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
