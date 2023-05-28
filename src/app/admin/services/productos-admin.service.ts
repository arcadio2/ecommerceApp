import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { DetalleDto, DetalleProducto, Producto } from 'src/app/models/producto.model';
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
  eliminarProducto(producto:string){
    const token = this.authService.token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    return this.http.delete<any>(this.url_base+'delete/'+producto,{headers:headers})
  }

  agregarProducto(producto:Producto){
    const token = this.authService.token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    return this.http.post<any>(this.url_base+'create',producto,{headers:headers})
  }

  editarAgregarProducto(producto:Producto){
    const token = this.authService.token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    return this.http.post<any>(this.url_base+'edit',producto,{headers:headers})
  }

  eliminarDetalle(id:number){
    const token = this.authService.token;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    return this.http.delete<any>(this.url_base_detalle+'delete/'+id,{headers:headers})
  }
  agregarDetalle(detalle:DetalleDto){
    const token = this.authService.token;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })

    return this.http.post<any>(this.url_base_detalle+'add',detalle,{headers:headers})
  }

  subirFotos(archivos: File[], id_producto:number,color:string) {
    let formData = new FormData();
    console.log(color,id_producto,archivos)
    
    formData.append("id_producto", id_producto+'');
    formData.append("color", color+'');
    for(let i = 0; i < archivos.length; i++){
      formData.append("file", archivos[i]);
    }
    console.log("DATA",formData.get("file"))
    
    const token = this.authService.token;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    

    return this.http.post(this.url_base+'productos/upload',formData,{headers:headers});
  }
       
}
