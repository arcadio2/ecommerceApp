import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-restablecer-contrasenia',
  templateUrl: './restablecer-contrasenia.component.html',
  styleUrls: ['./restablecer-contrasenia.component.css']
})
export class RestablecerContraseniaComponent implements OnInit {

  email:string=''; 
  contraForm!: FormGroup;
  constructor(private authService:AuthService,
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
      },error=>{
        this.toastService.error("El email no es válido o no está registrado"); 
      })
    }
    
  
  }

}
