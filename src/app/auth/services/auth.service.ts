import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from 'src/app/models/user.model';
import { BehaviorSubject } from 'rxjs';
import { openDB } from 'idb';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url_base:string = environment.urlBase+'api/';
  private _usuario!: User | null;
  private _token!: string | null;
  
  public _isAuth = new BehaviorSubject<boolean>(false);
  //private _isAuth!: boolean; 
  private dbPromise = openDB('mi-base-de-datos', 1, {
    upgrade(db) {
      db.createObjectStore('usuarios', { keyPath: 'id' });
    },
  });


  constructor(private http:HttpClient, private router: Router) { 
    this._isAuth.next(this.isAuthenticated());
  }

  public get usuario(): User {
    if (this._usuario != null) {
      return this._usuario;
    } else if (this._usuario == null && localStorage.getItem('usuario') != null) {
      let jsonUser = localStorage.getItem('usuario') || '';
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
    } else if (this._token == null && localStorage.getItem('token') != null) {
      const tokenJson = localStorage.getItem('token') || '';

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
    this.dbPromise.then((db) => {
      const tx = db.transaction('usuarios', 'readwrite');
      const usuarios = tx.objectStore('usuarios');
      usuarios.put({ id: 'token', value: accessToken });
      return tx.oncomplete;
    });
    localStorage.setItem('token', accessToken);
    
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
    this._usuario.id = payload.id; 
    this._usuario.nombre = payload.nombre;
    this._usuario.apellido = payload.apellido;
    this._usuario.email = payload.email;
    this._usuario.username = payload.user_name;
    this._usuario.roles = payload.authorities;
    

    localStorage.setItem('usuario', JSON.stringify(this._usuario));
  }

  isAuthenticated():boolean{
    
    let payload = this.obtenerDatosToken(this.token!);
    if (payload != null && payload.user_name && payload.user_name.length > 0) {
      let now = new Date().getTime() / 1000;
   
      if (payload.exp < now) {
        localStorage.clear();
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');
        return false;
      }
      return true;

    }
    return false;
  }
  isAdmin():boolean{
    let user = this.usuario;

    if(!this.isAuthenticated()){
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
   
    if(!this.isAuthenticated()){
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

  eliminarSesion(){
    const token = this.token;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    })
    return this.http.post<any>(environment.urlBase+'api/logout',null,{headers:headers})
  }

  logout(): void {
    
    this._token = null;
    this._usuario = null;
    localStorage.clear();
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

  
  }

  
}
