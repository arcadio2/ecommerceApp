import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/services/auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ImagenesService {

  private url_base:string = environment.urlBase+'api/imagenes/';


  constructor(private http:HttpClient, private authService:AuthService,
    private router: Router) { }

    obtenerImagenes(nombre:number,color:string){

      return this.http.get<any>(this.url_base+'productos/'+nombre+'/'+color);
    }


}
