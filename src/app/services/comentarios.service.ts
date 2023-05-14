import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { environment } from 'src/environments/environment';
import { ComentarioProducto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService {
  private url_base:string = environment.urlBase+'api/productos/comentario/';
  token = this.authService.token;
  constructor(private http:HttpClient, private authService:AuthService,
    private router: Router) { }


  guardarComentario(id_producto:number,comentario:ComentarioProducto){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    })
    
    return this.http.post<any>(this.url_base+id_producto,comentario,{headers:headers});

  }
  editComentario(id_producto:number,comentario:ComentarioProducto){
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    })
    
    return this.http.put<any>(this.url_base+id_producto,comentario,{headers:headers});

  }

  getComentariosProducto(id_producto:number){
    return this.http.get(this.url_base+id_producto); 
  }
  getByUsernameAndProducto(id_producto:number,username:string){
    return this.http.get(this.url_base+id_producto); 
  }

 


}
