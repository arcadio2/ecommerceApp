import { Injectable } from '@angular/core';
import { AuthService } from '../auth/services/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Perfil, User } from '../models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private url_base:string = environment.urlBase+'api/';

  private _usuario!: User | null;

  constructor(private http:HttpClient, private router: Router,
    private authService:AuthService) {
      /* this.getUserByUsername(this.authService.usuario.username).subscribe((resp:any)=>{
        this._usuario = resp.usuario as User; 
      }) */
      

  }

    private _perfil!:Perfil;


    get perfil(){
      if(!this._perfil){
        this.renovarPerfil(); 
      }
      return this._perfil; 
    }
    set setPerfil(perfil:Perfil){
      this._perfil=perfil;
    }

    get usuario(){
      
      if(!this._usuario){
       
        this.renovarUsuario();
      }
      return this._usuario; 
    }
  
    guardarPerfil(perfil:Perfil){
      this._perfil = perfil; 
    }

    renovarPerfil(){
      this.getProfileByUsername(this.authService.usuario.username).subscribe((resp:any)=>{
        console.log(resp.perfil)
        this._perfil = resp.perfil as Perfil; 
      })
    }

    renovarUsuario(){
      this.getUserByUsername(this.authService.usuario.username).subscribe((resp:any)=>{
        this._usuario = resp.usuario as User; 
      })
    }


    getProfileByUsername(username:string){
      const token = this.authService.token;
  
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
  
      return this.http.get(this.url_base+'user/profile/'+username,{headers:headers})
    }

    activarUsuario(token:string){
      /* const token = this.authService.token;
  
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }) */
  
      return this.http.post(this.url_base+'user/confirm',token)
    }

    getUserByUsername(username:string){
      const token = this.authService.token;
  
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
  
      return this.http.get(this.url_base+'get/user',{headers:headers})
    }

    cambiarContrasena(contrasenia:string,viejaContra:string){
      const token = this.authService.token;
  
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
      const body = {
        contrasenia:contrasenia,
        vieja:viejaContra
      }
  
      return this.http.put(this.url_base+'user/contrasenia',body,{headers:headers})
    }


    saveProfile(perfil:Perfil){
      const token = this.authService.token;
      //const userSend:User = new User(); 
      //userSend.username = perfil.usuario?.username || '';
      
      //perfil.usuario = userSend; 
  
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
      
      return this.http.post(this.url_base+'user/profile',perfil,{headers:headers});
    }

    edit(perfil:Perfil){
      const token = this.authService.token;
      const userSend:User = new User(); 
      userSend.username = perfil.usuario?.username || '';
      
      perfil.usuario = userSend; 
  
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      })
      
      return this.http.put(this.url_base+'user/profile',perfil,{headers:headers});
    }

    subirFoto(archivo: File, username:string) {
      let formData = new FormData();
      formData.append("file", archivo);
      formData.append("username", username);
      const token = this.authService.token;
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      })
      
  
      return this.http.post(this.url_base+'usuarios/upload',formData,{headers:headers});
    }

}
