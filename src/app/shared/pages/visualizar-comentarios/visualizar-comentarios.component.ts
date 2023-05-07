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

  constructor(
    private dialogRefVisualizar: MatDialogRef<VisualizarComentariosComponent>,
    private dialog: MatDialog,
    private toastService:ToastrService,
    private comentarioService:ComentariosService,
    @Inject(MAT_DIALOG_DATA) public producto: Producto ) { }

  ngOnInit(): void {
    this.comentarioService.getComentariosProducto(this.producto.id!).subscribe((resp:any)=>{
      this.comentarios = resp.comentarios as Comentario[]
      console.log(resp)
    })
  }

  loadData(): void {
  }

  irCrearComentario() {
    this.loading = true
    this.dialogRefVisualizar.close(false)
    this.dialog.open(CrearComentarioComponent, {
      width: '80%',
    }).afterClosed().subscribe((res) => {
      this.loading = false
      if (res === true) {
        this.toastService.success("Reseña guardada exitosamente")
      }
    });
  }

}
