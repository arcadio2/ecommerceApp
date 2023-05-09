import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from '../auth/services/auth.service';
@Injectable({
  providedIn: 'root'
})
export class DireccionesService {

  /* api_key = environment.api_key_dipomex;
  url_api = environment.direcciones_api; 

  token_sepomex = environment.sepomex_api;
  url_sepomex = "https://api.copomex.com/query/"; 
   */
  url_api = environment.postali; 

  constructor(private http:HttpClient,private authService:AuthService) { }

  getAllByCp(cp:string){

 
    return this.http.get(this.url_api+'codigo-postal/'+cp+'.json')  

  }

 /*  getEstados(){
    return this.http.get(this.url_sepomex+'/get_estados?token='+this.token_sepomex)

  } */


}
