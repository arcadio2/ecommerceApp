import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DetalleProducto, Producto } from 'src/app/models/producto.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductosAdminService {


  private url_base:string = environment.urlBase+'api/productos/';
  private url_base_detalle:string = environment.urlBase+'api/detalle/';

  constructor(private http:HttpClient, private authService:AuthService,
       private router: Router) { }

  getAllProductos(){
    return this.http.get<any>(environment.urlBase+'api/productos')
  }

  editProducto(producto:Producto){
    const token = this.authService.token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    return this.http.put<any>(this.url_base+'edit',producto,{headers:headers})
  }

  
  editDetalleProducto(detalle:DetalleProducto){
    const token = this.authService.token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    return this.http.put<any>(this.url_base_detalle+'edit',detalle,{headers:headers})
  }
       
}
