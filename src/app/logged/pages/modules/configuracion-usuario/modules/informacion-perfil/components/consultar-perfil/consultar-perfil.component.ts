import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { AuthService } from 'src/app/auth/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Perfil, User } from 'src/app/models/user.model';
import {MatDialog} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {EditarPerfilComponent} from "../editar-perfil/editar-perfil.component";
import {CategoriaControllersService} from "../../../../../../../../services/categoria-controllers.service";
import {Talla} from "../../../../../../../../models/producto.model";
import {filter} from "rxjs";
import {CambiarContraseniaComponent} from "../cambiar-contrasenia/cambiar-contrasenia.component";
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

      this.usuarioService.getProfileByUsername(this.authService.usuario.username).subscribe({
        next: (resp:any)=>{
          this.perfil = resp.perfil as Perfil;
          console.log("talla", this.perfil.talla_camisa)
          if(this.perfil){
            this.isDatoCompletos = true;

            this.categoriaControllersService.getTallasSuperiores().subscribe({
              next: r => {
                this.tallasSuperiores = r.tallas
                console.log("talla", this.perfil?.talla_camisa)
                console.log(this.tallasSuperiores)
                this.tallaAlta = this.tallasSuperiores.find(talla=> talla.id == this.perfil?.talla_camisa)?.talla ?? 'Sin registrar'

              }, error: err=>{
                console.log(err)

              }
            })
          }

        },error: err => {
          console.log(err)
        }
      })


      this.loading=false
    }, error => {
      this.loading=false
      console.log(error)
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

  irCambiarContrasenia(){
    this.loading = false
    this.dialog.open(CambiarContraseniaComponent, {
    }).afterClosed().subscribe((res) => {
      this.loading = false
      if (res === true) {
        this.loadData();
        this.toastService.success("Contraseña editada exitosamente")
      }
    });
  }

  protected readonly filter = filter;
}



