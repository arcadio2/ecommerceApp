import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {MatDialogRef} from "@angular/material/dialog";
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/services/usuario.service';
import { tap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-cambiar-contrasenia',
  templateUrl: './cambiar-contrasenia.component.html',
  styleUrls: ['./cambiar-contrasenia.component.css']
})
export class CambiarContraseniaComponent implements OnInit {
  loading = false;
  contraForm!: FormGroup;

  errores:any={};

  constructor(
    private userService:UsuarioService,
    private toast:ToastrService,
    private fromBuilder:FormBuilder,
    private dialogRef: MatDialogRef<CambiarContraseniaComponent>
  ) { }

  ngOnInit(): void {
    this.contraForm = this.fromBuilder.group({
      viejaContra:['',[Validators.required]],
      confirmar:['',[Validators.required]],
      nueva:['',[Validators.required]]
    })
  }

  cambiarContrasenia(){

    const viejaContra = this.contraForm.get('viejaContra')?.value;
    const confirmar = this.contraForm.get('confirmar')?.value;
    const nueva = this.contraForm.get('nueva')?.value;
    if(!this.contraForm.valid){
      this.toast.error("Debes llenar todos los campos"); 
      return
    }
    if(nueva!=confirmar){
      this.toast.error("Las contraseñas no coinciden"); 
      return
    }
    this.userService.cambiarContrasena(nueva, viejaContra)
    .pipe(
      tap(resp => {
        this.loading = true
        this.dialogRef.close(true)
        console.log(resp);
      }),
      catchError(error => {
        if(error.status==400){
          this.toast.error(error.error.mensaje);
          if(error.error.errors!=undefined){
            this.toast.error(error.error.errors.contrasenia);
          }
        }
        return []; 
      })
    )
    .subscribe();


   
  }

  cancelar(){
    this.loading = true
    this.dialogRef.close()
  }

}
