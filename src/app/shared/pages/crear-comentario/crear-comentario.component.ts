import {Component, Inject, NgZone, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {VisualizarComentariosComponent} from "../visualizar-comentarios/visualizar-comentarios.component";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {take} from "rxjs";
import {ComentariosService} from "../../../services/comentarios.service";
import {ComentarioProducto, Producto} from "../../../models/producto.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {environment} from "../../../../environments/environment";

@Component({
  selector: 'app-crear-comentario',
  templateUrl: './crear-comentario.component.html',
  styleUrls: ['./crear-comentario.component.css']
})
export class CrearComentarioComponent implements OnInit {
  loading = false
  comentarioForm = new FormGroup({
    valoracion: new FormControl<number>(0, {nonNullable: true, validators: [Validators.required]}),
    titulo: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    descripcion: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
  });

  url_backend:string =  environment.urlBase;


  constructor(
    private dialogRefVisualizar: MatDialogRef<VisualizarComentariosComponent>,
    private dialogRefCrear: MatDialogRef<CrearComentarioComponent>,
    private _ngZone: NgZone,
    private comentariosService: ComentariosService,
    @Inject(MAT_DIALOG_DATA) public producto: Producto,
  ) {

  }

  @ViewChild('autosize') autosize!: CdkTextareaAutosize;
  ngOnInit(): void {

  }
  loadData(){

  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }

  createComentarioForm(){
    return new FormGroup({
      valoracion: new FormControl<number>(0, {nonNullable: true, validators: [Validators.required]}),
      titulo: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
      descripcion: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    })
  }

  crearComentario() {
    this.comentarioForm.markAllAsTouched()
    if (this.comentarioForm.valid){
      this.loading = true;
      this.comentarioForm.disable()
      const comentarioNuevo: ComentarioProducto= {
        titulo: this.comentarioForm.controls.titulo.value,
        comentario: this.comentarioForm.controls.descripcion.value,
        valoracion: this.comentarioForm.controls.valoracion.value
      }

      this.comentariosService.guardarComentario(this.producto?.id!, comentarioNuevo ).subscribe((resp)=>{
        this.loading = false
        this.comentarioForm.enable()
        this.dialogRefVisualizar.close(true)
      },(error)=>{
        this.loading = false
        this.comentarioForm.enable()
        this.dialogRefVisualizar.close(false)
      })
    }

  }
  cancelar() {
    this.loading = true;

    this.dialogRefCrear.close(false);

    this.loading = false;
  }


}
