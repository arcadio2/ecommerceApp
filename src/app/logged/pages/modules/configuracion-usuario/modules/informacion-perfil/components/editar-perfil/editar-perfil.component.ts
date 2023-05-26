import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Perfil, User } from 'src/app/models/user.model';
import { UsuarioService } from 'src/app/services/usuario.service';
import {MatDialogRef} from "@angular/material/dialog";
import { Sexo } from 'src/app/models/user.model';
import {ToastrService} from "ngx-toastr";
import {CategoriaControllersService} from "../../../../../../../../services/categoria-controllers.service";
import {Categoria, Talla} from "../../../../../../../../models/producto.model";
import * as events from "events";

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
  errores:any={};

  loading = false

  edad:number = 0

  tallasSuperiores: Talla[] =[]
  tallasInferiores: Talla[] =[]

  tallaAlta: number = 0
  tallaBaja: number = 0


  constructor(
    private router: Router,
    private authService:AuthService,
    private fromBuilder:FormBuilder,
    private usuarioService:UsuarioService,
    private dialogRef: MatDialogRef<EditarPerfilComponent>,
    private toastService:ToastrService,
    private categoriaControllersService : CategoriaControllersService
    ) { }

  ngOnInit(): void {
    this.perfilForm = this.fromBuilder.group({
      nombre:['',[Validators.required, Validators.pattern('^[a-zA-Z\\sáéíóúÁÉÍÓÚüÜñÑ]+$')]],
      apellido:['',[Validators.required, Validators.pattern('^[a-zA-Z\\sáéíóúÁÉÍÓÚüÜñÑ]+$')]],
      altura:['',[Validators.pattern('[0-9]+(\.[0-9]+)?')]],
      talla_camisa:['',[]],
      talla_pantalon:['',[]],
      edad:['',[]],
      sexo:['',[]],
      fecha:['',[]]
    })

    this.usuarioService.getUserByUsername(this.authService.usuario.username).subscribe((resp:any)=>{
      this.usuario = resp.usuario as User;
      this.perfilForm.get('nombre')?.setValue(this.usuario?.nombre);
      this.perfilForm.get('apellido')?.setValue(this.usuario?.apellido);

    }, error => {
      console.log(error)
    })

    this.categoriaControllersService.getTallasSuperiores().subscribe({
      next: r => {
        this.tallasSuperiores = r.tallas

      }, error: err=>{
        console.log(err)
      }
    })

    this.categoriaControllersService.getTallasInferiores().subscribe({
      next: r => {
        this.tallasInferiores = r.tallas
        console.log(this.tallasInferiores)
      }, error: err=>{
        console.log(err)
      }
    })

    this.usuarioService.getProfileByUsername(this.authService.usuario.username).subscribe((resp:any)=>{

      this.perfil = resp.perfil as Perfil;

      if(this.perfil){
        console.log("talla", this.perfil.talla_camisa)
        this.perfilForm.get('altura')?.setValue(this.perfil.altura);
        this.perfilForm.get('edad')?.setValue(this.perfil.edad);
        this.perfilForm.get('talla_pantalon')?.setValue(this.perfil.talla_pantalon);
        this.perfilForm.get('talla_camisa')?.setValue(this.perfil.talla_camisa);
        //this.perfilForm.get('talla_camisa')?.setValue(this.perfil.sexo?.sexo);
        this.perfilForm.patchValue({
          sexo: this.perfil.sexo?.id
        });
      }

      //this.usuario = resp.usuario as User;
      //if(this.usuario){
      //  this.perfilForm.get('nombre')?.setValue(this.usuario.nombre);
      //}

    },err=>{
      console.log(err)
    })

  }

  calcularEdad(event: Event): void {
    const input = event.target as HTMLInputElement;
    const fecha = input.value;
    const fechaNacimiento: Date = new Date(fecha);
    console.log(fechaNacimiento)
    const edad: number = Math.floor((Date.now() - fechaNacimiento.getTime()) / (1000 * 60 * 60 * 24 * 365));
    console.log(`Edad: ${edad}`);
    this.perfilForm.get('edad')?.setValue(edad);
    this.edad = edad
  }

  ver(event:any){
    let a = this.perfilForm.get('talla_camisa')!.value
    console.log(a)
  }

  editarPerfil() {
    this.perfilForm.markAllAsTouched()
    if (this.perfilForm.valid){
      this.perfilForm.disable()
      const nombre = this.perfilForm.get('nombre')!.value;
      const apellido = this.perfilForm.get('apellido')!.value;
      const edad = this.perfilForm.get('edad')!.value;
      const altura = this.perfilForm.get('altura')!.value;
      const tallaCamisa = this.perfilForm.get('talla_camisa')!.value;
      const tallaPantalon = this.perfilForm.get('talla_pantalon')!.value;
      const fecha = this.perfilForm.get('fecha')!.value;
      const sexo = this.perfilForm.get('sexo')!.value;


      console.log(nombre, apellido, edad, altura, tallaCamisa, tallaPantalon, sexo);
      const perfil_save:Perfil = this.perfil! || {};

      const usuario_save:User = this.usuario!;

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
      this.loading = true;
      this.usuarioService.saveProfile(perfil_save).subscribe({
        next: resp=>{
          this.authService.usuariochange.next(!this.authService.usuariochange.value);
          this.dialogRef.close(true);
          this.loading = false;
          this.perfilForm.enable()
        },
        error: err => {
          if(err.status==400) {
            this.toastService.error(err.error.mensaje);
            //console.log("Error",err.error.errors)
            this.errores.nombre = err.error.errors.nombre;
            this.errores.username = err.error.errors.username;
            this.errores.apellido = err.error.errors.apellido;
            this.errores.email = err.error.errors.email;
            this.errores.password = err.error.errors.password;
            this.loading = false;
            this.perfilForm.enable()
            console.log(err)
          }
        }
      })
    } else{
      this.toastService.warning("Complete correctamente su formulario")
    }


  }
  cancelar() {
    this.loading = true;

    this.dialogRef.close(false);

    this.loading = false;
  }

  protected readonly HTMLInputElement = HTMLInputElement;
  protected readonly parseInt = parseInt;
}




