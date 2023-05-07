import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Comentario, Producto } from 'src/app/models/producto.model';
import { ComentariosService } from 'src/app/services/comentarios.service';

@Component({
  selector: 'app-visualizar-comentarios',
  templateUrl: './visualizar-comentarios.component.html',
  styleUrls: ['./visualizar-comentarios.component.css']
})
export class VisualizarComentariosComponent implements OnInit {

  comentarios:Comentario[] = []; 

  constructor(private comentarioService:ComentariosService,
    @Inject(MAT_DIALOG_DATA) public producto: Producto ) { }

  ngOnInit(): void {
    this.comentarioService.getComentariosProducto(this.producto.id!).subscribe((resp:any)=>{
      this.comentarios = resp.comentarios as Comentario[]
      console.log(resp)
    })
  }



}
