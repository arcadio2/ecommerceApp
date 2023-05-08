import {Component, NgZone, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {VisualizarComentariosComponent} from "../visualizar-comentarios/visualizar-comentarios.component";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {take} from "rxjs";

@Component({
  selector: 'app-crear-comentario',
  templateUrl: './crear-comentario.component.html',
  styleUrls: ['./crear-comentario.component.css']
})
export class CrearComentarioComponent implements OnInit {
  loading = false


  constructor(
    private dialogRefVisualizar: MatDialogRef<VisualizarComentariosComponent>,
    private dialogRefCrear: MatDialogRef<CrearComentarioComponent>,
    private _ngZone: NgZone
  ) { }

  @ViewChild('autosize') autosize!: CdkTextareaAutosize;
  ngOnInit(): void {

  }
  loadData(){

  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
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
