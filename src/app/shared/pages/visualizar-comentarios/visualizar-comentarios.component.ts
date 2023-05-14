import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Comentario, Producto } from 'src/app/models/producto.model';
import { ComentariosService } from 'src/app/services/comentarios.service';
import {CrearComentarioComponent} from "../crear-comentario/crear-comentario.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-visualizar-comentarios',
  templateUrl: './visualizar-comentarios.component.html',
  styleUrls: ['./visualizar-comentarios.component.css']
})
export class VisualizarComentariosComponent implements OnInit {

  loading = false
  comentarios:Comentario[] = [];
  cantidad_estrellas:number = 0;
  recorrido_estrellas:number[] =[];
  recorrido_estrellas_restantes:number=0;
  tiene_comentario:boolean=false; 
  usuario!:User; 
  constructor(
    private dialogRefVisualizar: MatDialogRef<VisualizarComentariosComponent>,
    private dialog: MatDialog,
    private auth:AuthService,
    private toastService:ToastrService,
    private usuarioService: UsuarioService,
    private comentarioService:ComentariosService,
    @Inject(MAT_DIALOG_DATA) public producto: Producto ) { }

  ngOnInit(): void {
    this.loadData(); 
   if(this.auth.usuario){
    this.usuarioService.getUserByUsername(this.auth.usuario.username!).subscribe((resp:any)=>{
      this.usuario = resp.usuario; 
      console.log(this.usuario)
    })
   }
    

  }

  loadData(): void {
    this.cantidad_estrellas = Math.ceil(this.producto.valoracion_total!) || 0;

    for (let i = 0; i < this.cantidad_estrellas; i++) {
      // Si el número es entero, agregamos elementos con valor 1
      if (Number.isInteger(this.producto.valoracion_total!)) {
        this.recorrido_estrellas.push(1);
      } else {
        // Si el número no es entero, agregamos elementos con valor 0 excepto el último que es 1
        if (i < this.cantidad_estrellas - 1) {
          this.recorrido_estrellas.push(1);
        } else {
          this.recorrido_estrellas.push(0);
        }
      }
    }

    //this.recorrido_estrellas = Array.from(Array(this.cantidad_estrellas).keys()).map(i => i + 1);
    console.log(this.recorrido_estrellas)
    this.recorrido_estrellas_restantes = 5-this.recorrido_estrellas.length;


    this.comentarioService.getComentariosProducto(this.producto.id!).subscribe((resp:any)=>{
      this.comentarios = resp.comentarios as Comentario[]; 
      
   
    })
  }

  irCrearComentario() {
    this.loading = true
    this.dialog.open(CrearComentarioComponent, {
      data:this.producto?.id!,
    }).afterClosed().subscribe((res) => {
      this.loading = false
      if (res === true) {
        console.log("hola v")
        this.toastService.success("Reseña guardada exitosamente")
        this.dialogRefVisualizar.close(true)
      }
    });
  }

}
