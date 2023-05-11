import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
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
  contraForm!: FormGroup;
  constructor(private authService:AuthService,
              private router:Router,
              private fromBuilder:FormBuilder,
              private toastService:ToastrService) { }

  ngOnInit(): void {
    this.contraForm = this.fromBuilder.group({
      email:['',[Validators.required,Validators.email]]
    })
  }

  restablecer(){
    this.email = this.contraForm.get('email')?.value;
    if(this.email!=null){

      this.authService.restablecerContra(this.email).subscribe((resp:any)=>{
        this.toastService.info(resp.mensaje);
        this.router.navigateByUrl('/auth'); 
      },error=>{
        this.toastService.error("El email no es válido o no está registrado");
      })
    }


  }


}
