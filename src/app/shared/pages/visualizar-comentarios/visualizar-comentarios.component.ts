import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Comentario, Producto } from 'src/app/models/producto.model';
import { ComentariosService } from 'src/app/services/comentarios.service';
import {CrearComentarioComponent} from "../crear-comentario/crear-comentario.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";

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
  constructor(
    private dialogRefVisualizar: MatDialogRef<VisualizarComentariosComponent>,
    private dialog: MatDialog,
    private toastService:ToastrService,
    private comentarioService:ComentariosService,
    @Inject(MAT_DIALOG_DATA) public producto: Producto ) { }

  ngOnInit(): void {
    this.loadData()
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
      this.comentarios = resp.comentarios as Comentario[]
      console.log(resp)
    })
  }

  irCrearComentario() {
    this.loading = true
    this.dialog.open(CrearComentarioComponent, {
      data:this.producto,
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
