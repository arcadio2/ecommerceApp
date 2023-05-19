import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/services/auth.service';
import { Bolsa, DetalleProducto } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  private url_base:string = environment.urlBase+'api/productos/';


  constructor(private http:HttpClient, private authService:AuthService,
       private router: Router) { }


  getProducto(nombre_producto:string){
    return this.http.get<any>(this.url_base+'producto/'+nombre_producto);
  }

  getAllProductos(){
    return this.http.get<any>(environment.urlBase+'api/productos')
  }

  addValoracion(xd:any){
    const token = this.authService.token;
    let objeto = {
      valoracion:3.7,
      usuario:{
        id:'1'
      },
      producto:xd
    }
    console.log(objeto)
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    return this.http.post<any>(this.url_base+'valoracion',objeto,{headers:headers})

  }

  getDetalleProdcutoCompra(id:number,color:string,talla:string){
    return this.http.get<any>(environment.urlBase+'api/detalle/'+id+"/"+color+"/"+talla);
  }


  addComentario(p:any){
    const token = this.authService.token;
    let objeto = {
      comentario:'xddddd',
      usuario:{
        id:1,
        username:'arcadio'
      },
      producto:p
    }
    console.log(objeto)
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    return this.http.post<any>(this.url_base+'comentario',objeto,{headers:headers})
  }

  editDetalle(detalle:DetalleProducto){
    const token = this.authService.token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    return this.http.post<any>(this.url_base+'bolsa',detalle,{headers:headers})
  }

  editElementoCarrito(bolsa:Bolsa){
    const token = this.authService.token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })

    return this.http.put<any>(this.url_base+'bolsa',bolsa,{headers:headers});
  }

  deleteElementoCarrito(id:number){
    const token = this.authService.token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })


    return this.http.delete<any>(this.url_base+'bolsa/'+id,{headers:headers});
  }

  getProductoByNombre(nombre:string){
    return this.http.get<any>(this.url_base+'get/'+nombre);
  }


  getSimilar1(nombre:string | undefined, categoria:string | undefined, genero:string | undefined ){
    const token = this.authService.token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.get<any>(this.url_base+'listado?nombre='+nombre+"&categoria="+categoria+"&genero="+genero,{headers});
    if(nombre && categoria && genero){
      return this.http.get<any>(this.url_base+'listado?nombre='+nombre+"?categoria="+categoria+"?genero="+genero);
    }
    if(!nombre && categoria && genero){

    }
    if(!nombre && !categoria && genero){

    }
    if(nombre && !categoria && !genero){
      return this.http.get<any>(this.url_base+'listado?nombre='+nombre);
    }


  }

  getCategoriaBySexo(sexo:string){
    return this.http.get<any>(this.url_base+'categoria/'+sexo);
  }

}
