import { Component, OnInit } from '@angular/core';
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

  constructor(
    private dialogRefVisualizar: MatDialogRef<VisualizarComentariosComponent>,
    private dialog: MatDialog,
    private toastService:ToastrService,
  ) { }

  ngOnInit(): void {
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
