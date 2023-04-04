import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/models/user.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url_base:string = environment.urlBase+'api/';
  private _usuario!: User | null;
  private _token!: string | null;
  public _isAuth = new BehaviorSubject<boolean>(false);
  //private _isAuth!: boolean; 


  constructor(private http:HttpClient, private router: Router) { 
    this._isAuth.next(this.isAuthenticated());
  }

  public get usuario(): User {
    if (this._usuario != null) {
      return this._usuario;
    } else if (this._usuario == null && sessionStorage.getItem('usuario') != null) {
      let jsonUser = sessionStorage.getItem('usuario') || '';
      if(jsonUser!=''){
        this._usuario = JSON.parse( jsonUser ) as User ;
        return this._usuario;
      }
      
    }
    return new User();
  }

/*   public get isAuth(){
    this._isAuth = this.isAuthenticated();
    return this._isAuth; 
  }
  public set isAuth(isAuth:boolean){
    this._isAuth = isAuth; 
  } */

  public get token(): string | null {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && sessionStorage.getItem('token') != null) {
      const tokenJson = sessionStorage.getItem('token') || '';

      this._token = tokenJson;
      if(tokenJson){
        return this._token;
      }
      
    }
    return null;
  }

  prueba():Observable<any>{
    return this.http.get<any>(this.url_base+'hola');
  } 

  login(usuario: User): Observable<any> {

    const urlEndpoint =  environment.urlBase+'oauth/token';

    const credenciales = btoa('angularApp' + ':' + '12345');

    const httpHeaders = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + credenciales
    });

    let params = new URLSearchParams();
    params.set('grant_type', 'password');
    params.set('username', usuario.username);
    params.set('password', usuario.password!);
    
    return this.http.post<any>(urlEndpoint, params.toString(), { headers: httpHeaders });
  }

  guardarToken(accessToken: string): void {
    this._token = accessToken;
    sessionStorage.setItem('token', accessToken);
  }

  obtenerDatosToken(accessToken: string): any {
    if (accessToken != null) {
      return JSON.parse(atob(accessToken.split(".")[1]));
    }
    return null;
  }

  guardarUsuario(accessToken: string): void {
    let payload = this.obtenerDatosToken(accessToken);
  
    this._usuario = new User();
    this._usuario.nombre = payload.nombre;
    this._usuario.apellido = payload.apellido;
    this._usuario.email = payload.email;
    this._usuario.username = payload.user_name;
    this._usuario.roles = payload.authorities;
    

    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));
  }

  isAuthenticated():boolean{
    let payload = this.obtenerDatosToken(this.token!);
    if (payload != null && payload.user_name && payload.user_name.length > 0) {
      return true;
    }
    return false;
  }
  isAdmin():boolean{
    let user = this.usuario;
    if(!user){
      return false; 
    }
    let ban = false; 
    user.roles.forEach(rol=>{
      if(rol == "ROLE_ADMIN"){
        
        ban = true; 
      }
    })
    return ban;
  }
  isUser():boolean{
    let user = this.usuario;
    if(!user){
      return false; 
    }
    let ban = false; 
    user.roles.forEach(rol=>{
      if(rol == "ROLE_USER"){
        
        ban = true; 
      }
    })
    return ban;
  }


  registerUser(usuario:User){
    return this.http.post<any>(this.url_base+'user/create',usuario)
    .pipe(
      map((response:any)=>{
        return response.usuario as User; 
      }),
      catchError(e=>{
        if (e.status == 400) {
          return throwError(() => e);
        }
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(() => e);
      })
    ) 
  }


  logout(): void {
    this._token = null;
    this._usuario = null;
    sessionStorage.clear();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
  }

  
}
