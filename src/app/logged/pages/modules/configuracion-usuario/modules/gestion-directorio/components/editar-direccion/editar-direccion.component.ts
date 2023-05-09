import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/models/user.model';
import { DireccionesService } from 'src/app/services/direcciones.service';

@Component({
  selector: 'app-editar-direccion',
  templateUrl: './editar-direccion.component.html',
  styleUrls: ['./editar-direccion.component.css']
})
export class EditarDireccionComponent implements OnInit {

  user!:User; 
  direccionesForm!:FormGroup;
  constructor(private auth:AuthService,  
    private direccionesService:DireccionesService,
      private fromBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.user = this.auth.usuario; 
    this.direccionesForm = this.fromBuilder.group({
      nombre:[this.user.nombre +' ' +this.user.apellido,[Validators.required]],
      cp:['',[Validators.required]],
      estado:['',[Validators.required]],
      municipio:['',[Validators.required]],
      colonia:['',[Validators.required]],
      calle:['',[Validators.required]],
      num_ext:['',[Validators.required]],
      num_int:['',[Validators.required]],
      e_calle_1:['',[Validators.required]],
      e_calle_2:['',[Validators.required]],
      num_contacto:['',[Validators.required]],
      info_adicional:['',[Validators.required]],
    })
  
  }

  buscarCp(){
    const cp = this.direccionesForm.get('cp')!.value;
    this.direccionesService.getAllByCp(cp).subscribe(resp=>{
      console.log(resp)
    })


    console.log(cp)
  }

}
