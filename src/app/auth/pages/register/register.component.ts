import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user.model';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  usuario:User = new User();
  errores:any={};
  @Output() renderizar = new EventEmitter();

  registerForm = new FormGroup({
    nombre: new FormControl<string>('',[Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z\\sáéíóúÁÉÍÓÚüÜñÑ]+$')]),
    apellido:new FormControl<string>('',[Validators.required, Validators.minLength(3), Validators.pattern('^[a-zA-Z\\sáéíóúÁÉÍÓÚüÜñÑ]+$')]),
    username: new FormControl<string>('',[Validators.required, Validators.minLength(3)]),
    email: new FormControl<string>('',[Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')]),
    password: new FormControl<string>('',[Validators.required, Validators.minLength(8)])
  })

  constructor(private fromBuilder:FormBuilder,
              private authService:AuthService,
              private router:Router,
              private toast:ToastrService,) { }

  ngOnInit(): void {
  }

  register(){

    this.registerForm.markAllAsTouched();

    if(this.registerForm.valid){
      this.usuario.username = this.registerForm.controls.username.value!;
      this.usuario.nombre = this.registerForm.controls.nombre.value!;
      this.usuario.apellido = this.registerForm.controls.apellido.value!;
      this.usuario.email = this.registerForm.controls.email.value!;
      this.usuario.password = this.registerForm.controls.password.value!;

      this.authService.registerUser(this.usuario).subscribe(resp=>{
        this.toast.success("Te haz registrado con éxito. Por favor, incia seisión. Revisa tu correo para confirmar la cuenta")
        this.router.navigateByUrl('/auth');
     /*    this.authService.login(this.usuario).subscribe(res =>{
          this.authService.guardarUsuario(res.access_token);
          this.authService.guardarToken(res.access_token);
          this.usuario = this.authService.usuario;
          this.router.navigateByUrl('/user/configuracion-usuario');
          this.toast.success("Haz iniciado sesión con éxito")
          this.authService._isAuth.next(true);


        },err=>{
          if(err.status==400){

            this.toast.error("No se pudo iniciar sesión");
          }
        }) */
      }, err=>{
        console.log("error",err)
        if(err.status==400){
          this.toast.error(err.error.mensaje);
          //console.log("Error",err.error.errors)
          this.errores.nombre = err.error.errors.nombre;
          this.errores.username = err.error.errors.username;
          this.errores.apellido = err.error.errors.apellido;
          this.errores.email = err.error.errors.email;
          this.errores.password = err.error.errors.password;
        }else{
          this.toast.error(err.error.mensaje+". Intenta con otro");
        }
      });
    }

  }
}
