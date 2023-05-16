import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Comentario } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class IaService {
  url_py = environment.urlPython; 

  constructor(private http:HttpClient) { }

  palabrasClave(comentarios:Comentario[]){
    const headers = new HttpHeaders({ 'Access-Control-Allow-Origin': 'http://localhost:4200' });
    const options = { headers: headers };
    let comments:string[] = comentarios.map(e=>e.comentario!);
    const myObject: { [index: number]: string } = {};

    comments.forEach((value, index) => {
      myObject[index] = value;
    });
    console.log(myObject)
    return this.http.post(this.url_py+'extract',myObject,options);  

  }


}
interface MyObject {
  [key: number]: string;
}