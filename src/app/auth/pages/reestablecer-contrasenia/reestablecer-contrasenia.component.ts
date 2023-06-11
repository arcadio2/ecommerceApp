import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {ToastrService} from "ngx-toastr";
import { Router } from '@angular/router';

@Component({
  selector: 'app-reestablecer-contrasenia',
  templateUrl: './reestablecer-contrasenia.component.html',
  styleUrls: ['./reestablecer-contrasenia.component.css']
})
export class ReestablecerContraseniaComponent implements OnInit {

  email:string='';
  contraForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$')])
  })
  loading = false

  constructor(private authService:AuthService,
              private router:Router,
              private fromBuilder:FormBuilder,
              private toastService:ToastrService) { }

  ngOnInit(): void {
  }

  restablecer(){

    if(this.contraForm.valid){
      this.loading = true
      this.email = this.contraForm.controls.email.value!
      this.authService.restablecerContra(this.email).subscribe((resp:any)=>{
        this.toastService.info(resp.mensaje);
        this.router.navigateByUrl('/auth');
        this.loading = false
      },error=>{
        this.toastService.error("El email no es válido o no está registrado");
        this.loading = false
      })
    }


  }


}
