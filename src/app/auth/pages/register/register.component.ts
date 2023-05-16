import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
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
  registerForm!: FormGroup;
  errores:any={};
  @Output() renderizar = new EventEmitter();

  constructor(private fromBuilder:FormBuilder,
              private authService:AuthService,
              private router:Router,
              private toast:ToastrService,) { }

  ngOnInit(): void {
    this.registerForm = this.fromBuilder.group({
      nombre:['',[Validators.required]],
      apellido:['',[Validators.required]],
      username:['',[Validators.required]],
      email:['',[Validators.required, Validators.email]],
      password:['',[Validators.required]]
    })
  }

  register(){

    this.registerForm.markAllAsTouched();

    //if(this.registerForm.valid){
      this.usuario.username = this.registerForm.get('username')?.value;
      this.usuario.nombre = this.registerForm.get('nombre')?.value;
      this.usuario.apellido = this.registerForm.get('apellido')?.value;
      this.usuario.email = this.registerForm.get('email')?.value;
      this.usuario.password = this.registerForm.get('password')?.value;
      this.authService.registerUser(this.usuario).subscribe(resp=>{

        this.toast.success("Te haz registrado con éxito. Por favor, incia seisión.")

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
    //}

  }
}
