import { Component, OnInit,Input } from '@angular/core';
import { zip } from 'rxjs';
import {Router} from "@angular/router";
import { AuthService } from 'src/app/auth/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Perfil, User } from 'src/app/models/user.model';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  usuario: User | undefined;  
  perfil!:Perfil | undefined; 

  
  isDatoCompletos:boolean = false;

  constructor(
    private router: Router,
    private authService:AuthService,
    private usuarioService:UsuarioService,
  ) {

  }

  ngOnInit(): void {
    this.usuarioService.getUserByUsername(this.authService.usuario.username).subscribe((resp:any)=>{
      this.usuario = resp.usuario as User;  
    })
    this.usuarioService.getProfileByUsername(this.authService.usuario.username).subscribe((resp:any)=>{
 
      this.perfil = resp.perfil as Perfil;  
      if(this.perfil){
        this.isDatoCompletos = true; 
      }
    })
  
  }


  irCompletarPerfil(){
    this.router.navigate(['user/completar-perfil'])
  }

}



