import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../auth/services/auth.service";
import {PaymentIntentDto} from "../models/producto.model";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  private url_base:string = environment.urlBase+'api/stripe/';
  constructor(private http:HttpClient, private authService:AuthService) { }

  pagar(paymentIntentDto: PaymentIntentDto){
    const token = this.authService.token;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<string>(this.url_base+'payment', paymentIntentDto,{headers:headers});
  }
  confirmar(id:string){
    const token = this.authService.token;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<string>(this.url_base+'confirm/' + id,{},{headers:headers});
  }
  cancelar(id:string){
    const token = this.authService.token;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<string>(this.url_base+'cancel/' + id,{headers:headers});
  }
}
