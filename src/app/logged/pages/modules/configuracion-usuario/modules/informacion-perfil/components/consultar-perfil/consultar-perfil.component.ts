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
import {CategoriaControllersService} from "../../../../../../../../services/categoria-controllers.service";
import {Talla} from "../../../../../../../../models/producto.model";
import {filter} from "rxjs";
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
  tallasSuperiores: Talla[] =[]
  tallaAlta: string = ''

  constructor(
    private router: Router,
    private authService:AuthService,
    private usuarioService:UsuarioService,
    private dialog: MatDialog,
    private toastService:ToastrService,
    private categoriaControllersService : CategoriaControllersService
  ) {

  }

  ngOnInit(): void {
    this.loadData()
  }

  loadData(){
    this.loading = true
    this.usuarioService.getUserByUsername(this.authService.usuario.username).subscribe((resp:any)=>{
      this.usuario = resp.usuario as User;

      this.usuarioService.getProfileByUsername(this.authService.usuario.username).subscribe((resp:any)=>{

        this.perfil = resp.perfil as Perfil;

        if(this.perfil){
          this.isDatoCompletos = true;
          this.categoriaControllersService.getTallasSuperiores().subscribe({
            next: r => {
              this.tallasSuperiores = r.tallas
              const tallaEncontrada:Talla = this.tallasSuperiores.find(talla=> talla.id == this.perfil?.talla_camisa)!
              this.tallaAlta = tallaEncontrada.talla!
              this.loading = false
            }, error: err=>{
              console.log(err)
              this.loading = false
            }
          })
        }
      })
    })
  }


  irEditarPerfil() {
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

  protected readonly filter = filter;
}



