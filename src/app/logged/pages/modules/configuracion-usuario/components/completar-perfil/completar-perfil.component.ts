import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Perfil, User } from 'src/app/models/user.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-completar-perfil',
  templateUrl: './completar-perfil.component.html',
  styleUrls: ['./completar-perfil.component.css']
})
export class CompletarPerfilComponent implements OnInit {


  usuario: User | undefined;
  perfil!:Perfil | undefined;
  perfilForm!:FormGroup;

  constructor(private router: Router,
    private authService:AuthService,
    private fromBuilder:FormBuilder,
    private usuarioService:UsuarioService,) { }

  ngOnInit(): void {
    this.perfilForm = this.fromBuilder.group({
      nombre:['',[Validators.required]],
      apellido:['',[Validators.required]],
      altura:['',[Validators.required]],
      talla_camisa:['',[Validators.required]],
      talla_pantalon:['',[Validators.required]],
      edad:['',[Validators.required]],
      password:['',[Validators.required]]
    })

    this.usuarioService.getUserByUsername(this.authService.usuario.username).subscribe((resp:any)=>{
      this.usuario = resp.usuario as User;
    })

    this.usuarioService.getProfileByUsername(this.authService.usuario.username).subscribe((resp:any)=>{

      this.perfil = resp.perfil as Perfil;
      console.log(this.perfil)
      if(this.perfil){

        this.perfilForm.get('nombre')?.setValue(this.perfil.usuario?.nombre);
        this.perfilForm.get('apellido')?.setValue(this.perfil.usuario?.apellido);
        this.perfilForm.get('altura')?.setValue(this.perfil.altura);
        this.perfilForm.get('edad')?.setValue(this.perfil.edad);
        this.perfilForm.get('talla_pantalon')?.setValue(this.perfil.talla_camisa);
        this.perfilForm.get('talla_camisa')?.setValue(this.perfil.talla_pantalon);


      }
      this.usuario = resp.usuario as User;
      //if(this.usuario){
      //  this.perfilForm.get('nombre')?.setValue(this.usuario.nombre);
      //}
    },err=>{

    })
  }

}
