import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Comentario, DetalleDto, Producto } from 'src/app/models/producto.model';
import { ComentariosService } from 'src/app/services/comentarios.service';
import {CrearComentarioComponent} from "../crear-comentario/crear-comentario.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/auth/services/auth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { IaService } from 'src/app/services/ia.service';

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
  comentario!:Comentario;
  usuario!:User;
  constructor(
    private dialogRefVisualizar: MatDialogRef<VisualizarComentariosComponent>,
    private dialog: MatDialog,
    private auth:AuthService,
    private toastService:ToastrService,
    private usuarioService: UsuarioService,
    private iaService:IaService,
    private comentarioService:ComentariosService,
    @Inject(MAT_DIALOG_DATA) public data: {producto: Producto, productoMostrado: DetalleDto} ) { }

  ngOnInit(): void {
    this.loadData();
    this.usuario = this.auth.usuario;

  }

  loadData(): void {
    this.cantidad_estrellas = Math.ceil(this.data.producto.valoracion_total!) || 0;

    for (let i = 0; i < this.cantidad_estrellas; i++) {
      // Si el número es entero, agregamos elementos con valor 1
      if (Number.isInteger(this.data.producto.valoracion_total!)) {
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


    this.comentarioService.getComentariosProducto(this.data.producto.id!).subscribe((resp:any)=>{
      this.comentarios = resp.comentarios as Comentario[];
      this.iaService.palabrasClave(this.comentarios).subscribe(resp=>{
        console.log("IA ",resp)
      })

    })

    this.comentarioService.getByUsernameAndProducto(this.data.producto.id!).subscribe((resp:any)=>{
      if(resp.comentario){
        this.comentario  = resp.comentario;

        this.tiene_comentario = true;
      }
    })
  }

  irCrearComentario() {
    this.loading = true
    this.dialog.open(CrearComentarioComponent, {
      data:{producto: this.data.producto, productoMostrado: this.data.productoMostrado,comentario:this.comentario}
    }).afterClosed().subscribe((res) => {
      this.loading = false
      if (res === true) {
        console.log("hola v")
        this.loadData()
        this.toastService.success("Reseña guardada exitosamente")
        this.dialogRefVisualizar.close(true)
      }
    });
  }

}
