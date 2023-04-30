import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario:User = new User();
  loginForm!: FormGroup;
  loading: boolean = true

  constructor(private fromBuilder:FormBuilder,
    private authService:AuthService,
    private router:Router,
    private toast:ToastrService) { }

  ngOnInit(): void {
    this.loading = false
    this.loginForm = this.fromBuilder.group({
      username:['',[Validators.required]],
      password:['',[Validators.required]]
    })
  }

  login(){
    this.loading = true
    this.loginForm.markAllAsTouched();
    if(this.loginForm.valid){
      this.usuario.username = this.loginForm.get('username')?.value;
      this.usuario.password = this.loginForm.get('password')?.value;

      this.authService.login(this.usuario).subscribe(res =>{
        this.authService.guardarUsuario(res.access_token);
        this.authService.guardarToken(res.access_token);
        this.usuario = this.authService.usuario;
        this.router.navigateByUrl('/user/configuracion-usuario');
        this.toast.success("Haz iniciado sesión con éxito");
        this.authService._isAuth.next(true);
      },err=>{
        if(err.status==400){

          this.toast.error("Credenciales inválidas");
        }
      });
    }else
      this.toast.error("Ingrese correctamente su información");
    this.loading = false
  }

  irRestablecerContrasenia (){
    this.router.navigate(['auth/restablecer-contraseña'])
  }

}
