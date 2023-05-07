import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { AuthService } from 'src/app/auth/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Perfil, User } from 'src/app/models/user.model';
import {MatDialog} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {
  AgregarProductoComponent
} from "../../../../../../../../admin/modules/gestion-productos/components/agregar-producto/agregar-producto.component";
import {EditarPerfilComponent} from "../editar-perfil/editar-perfil.component";
@Component({
  selector: 'app-consultar-perfil',
  templateUrl: './consultar-perfil.component.html',
  styleUrls: ['./consultar-perfil.component.css']
})
export class ConsultarPerfilComponent implements OnInit {

  usuario: User | undefined;
  perfil!:Perfil | undefined;


  isDatoCompletos:boolean = false;

  loading = false

  constructor(
    private router: Router,
    private authService:AuthService,
    private usuarioService:UsuarioService,
    private dialog: MatDialog,
    private toastService:ToastrService,
  ) {

  }

  ngOnInit(): void {
    this.loadData()
  }

  loadData(){
    this.usuarioService.getUserByUsername(this.authService.usuario.username).subscribe((resp:any)=>{
      this.usuario = resp.usuario as User;
    })
    this.usuarioService.getProfileByUsername(this.authService.usuario.username).subscribe((resp:any)=>{

      this.perfil = resp.perfil as Perfil;
      if(this.perfil){
        this.isDatoCompletos = true;
      }
    })
  }


  editarPerfil() {
    this.loading = true
    this.dialog.open(EditarPerfilComponent, {
      width: '80%'
    }).afterClosed().subscribe((res) => {
      this.loading = false
      if (res === true) {
        this.loadData();
        this.toastService.success("Perfil editado exitosamente")
      }
    });
  }

}



