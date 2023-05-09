import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Perfil, User } from 'src/app/models/user.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import {MatDialogRef} from "@angular/material/dialog";
import { Sexo } from 'src/app/models/user.model';

@Component({
  selector: 'app-completar-consultar-perfil',
  templateUrl: './editar-perfil.component.html',
  styleUrls: ['./editar-perfil.component.css']
})
export class EditarPerfilComponent implements OnInit {


  usuario: User | undefined;
  perfil!:Perfil | undefined;
  perfilForm!:FormGroup;
  hombre:Sexo={
    id:1,
    sexo:"Hombre"
  }
  mujer:Sexo={
    id:2,
    sexo:"Mujer"
  }

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
      sexo:['',[Validators.required]],
      fecha:['',[Validators.required]]
    })

    this.usuarioService.getUserByUsername(this.authService.usuario.username).subscribe((resp:any)=>{
      this.usuario = resp.usuario as User;
      this.perfilForm.get('nombre')?.setValue(this.usuario?.nombre);
      this.perfilForm.get('apellido')?.setValue(this.usuario?.apellido);

    })

    this.usuarioService.getProfileByUsername(this.authService.usuario.username).subscribe((resp:any)=>{

      this.perfil = resp.perfil as Perfil;
      console.log(this.perfil)
      if(this.perfil){

       
        this.perfilForm.get('altura')?.setValue(this.perfil.altura);
        this.perfilForm.get('edad')?.setValue(this.perfil.edad);
        this.perfilForm.get('talla_pantalon')?.setValue(this.perfil.talla_pantalon);
        this.perfilForm.get('talla_camisa')?.setValue(this.perfil.talla_camisa);
        //this.perfilForm.get('talla_camisa')?.setValue(this.perfil.sexo?.sexo);
        console.log(this.perfil.sexo)
        this.perfilForm.patchValue({
          sexo: this.perfil.sexo?.id
        });

      }
      //this.usuario = resp.usuario as User;
      //if(this.usuario){
      //  this.perfilForm.get('nombre')?.setValue(this.usuario.nombre);
      //}
    },err=>{

    })
  }

  editarPerfil() {

    const nombre = this.perfilForm.get('nombre')!.value;
    const apellido = this.perfilForm.get('apellido')!.value;
    const edad = this.perfilForm.get('edad')!.value;
    const altura = this.perfilForm.get('altura')!.value;
    const tallaCamisa = this.perfilForm.get('talla_camisa')!.value;
    const tallaPantalon = this.perfilForm.get('talla_pantalon')!.value;
    const fecha = this.perfilForm.get('fecha')!.value;
    const sexo = this.perfilForm.get('sexo')!.value;


    //console.log(nombre, apellido, edad, altura, tallaCamisa, tallaPantalon, sexo);
    const perfil_save:Perfil = this.perfil! || {};

    const usuario_save:User = this.usuario!; 

    console.log(altura)
    usuario_save.apellido = apellido; 
    usuario_save.nombre = nombre; 

    
    perfil_save.altura = altura; 
    perfil_save.edad = edad; 
    perfil_save.talla_camisa = tallaCamisa; 
    perfil_save.talla_pantalon = tallaPantalon; 
    perfil_save.usuario = usuario_save; 
    perfil_save.fecha_nacimiento = fecha; 

    if(sexo==1){
      perfil_save.sexo = this.hombre; 
    }else{
      perfil_save.sexo = this.mujer;
    }

    this.usuarioService.saveProfile(perfil_save).subscribe(resp=>{
      this.authService.usuariochange.next(!this.authService.usuariochange.value); 
      console.log(resp)
    },err=>{
      console.log(err)
    })

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
