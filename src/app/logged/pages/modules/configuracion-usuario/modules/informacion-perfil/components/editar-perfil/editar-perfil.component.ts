import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Perfil, User } from 'src/app/models/user.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-completar-consultar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent implements OnInit {


  usuario: User | undefined;
  perfil!:Perfil | undefined;
  perfilForm!:FormGroup;

  loading = false

  constructor(
    private router: Router,
    private authService:AuthService,
    private fromBuilder:FormBuilder,
    private usuarioService:UsuarioService,
    private dialogRef: MatDialogRef<EditarPerfilComponent>
    ) { }

  ngOnInit(): void {
    this.perfilForm = this.fromBuilder.group({
      nombre:['',[Validators.required]],
      apellido:['',[Validators.required]],
      altura:['',[Validators.required]],
      talla_camisa:['',[Validators.required]],
      talla_pantalon:['',[Validators.required]],
      edad:['',[Validators.required]],
      password:['',[Validators.required]],
      sexo:['',[Validators.required]]
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

  editarPerfil() {
    this.loading = true;

    this.dialogRef.close(true);

    this.loading = false;
  }
  cancelar() {
    this.loading = true;

    this.dialogRef.close(false);

    this.loading = false;
  }

}
