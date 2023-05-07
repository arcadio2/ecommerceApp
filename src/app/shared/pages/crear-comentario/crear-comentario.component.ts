import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {VisualizarComentariosComponent} from "../visualizar-comentarios/visualizar-comentarios.component";

@Component({
  selector: 'app-crear-comentario',
  templateUrl: './crear-comentario.component.html',
  styleUrls: ['./crear-comentario.component.css']
})
export class CrearComentarioComponent implements OnInit {
  loading = false
  constructor(
    private dialogRefVisualizar: MatDialogRef<VisualizarComentariosComponent>,
    private dialogRefCrear: MatDialogRef<CrearComentarioComponent>
  ) { }

  ngOnInit(): void {

  }
  loadData(){

  }

  crearComentario() {
    this.loading = true;
    this.dialogRefVisualizar.close(false)
    this.dialogRefCrear.close(true);

    this.loading = false;
  }
  cancelar() {
    this.loading = true;

    this.dialogRefCrear.close(false);

    this.loading = false;
  }


}
