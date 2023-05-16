import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/services/auth.service';
import { Router } from '@angular/router';
import { Bolsa, DetalleDto, DetalleProducto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ComprasService {

  private productos_:DetalleDto []=[]; 
  private bolsa_:Bolsa [] = []
  private url_base:string = environment.urlBase+'api/comporas/';
  constructor(private http:HttpClient, private authService:AuthService,
    private router: Router) { 
      
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
