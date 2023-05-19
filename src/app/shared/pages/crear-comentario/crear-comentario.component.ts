import {Component, Inject, NgZone, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {VisualizarComentariosComponent} from "../visualizar-comentarios/visualizar-comentarios.component";
import {CdkTextareaAutosize} from "@angular/cdk/text-field";
import {take} from "rxjs";
import {ComentariosService} from "../../../services/comentarios.service";
import {Comentario, ComentarioProducto, DetalleDto, Producto} from "../../../models/producto.model";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {environment} from "../../../../environments/environment";
import {ImagenesService} from "../../../services/imagenes.service";

@Component({
  selector: 'app-crear-comentario',
  templateUrl: './crear-comentario.component.html',
  styleUrls: ['./crear-comentario.component.css']
})
export class CrearComentarioComponent implements OnInit {
  loading = false
  comentarioForm = this.createComentarioForm();
  /* new FormGroup({
    valoracion: new FormControl<number>(0, {nonNullable: true, validators: [Validators.required]}),
    titulo: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    descripcion: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
  }); */
  imagenes:string[]=[];

  url_backend:string =  environment.urlBase;


  constructor(
    private dialogRefVisualizar: MatDialogRef<VisualizarComentariosComponent>,
    private dialogRefCrear: MatDialogRef<CrearComentarioComponent>,
    private _ngZone: NgZone,

    private imagenesService:ImagenesService,
    private comentariosService: ComentariosService,
    @Inject(MAT_DIALOG_DATA) public data: {producto: Producto, productoMostrado: DetalleDto,comentario:Comentario}
  ) {

  }

  @ViewChild('autosize') autosize!: CdkTextareaAutosize;
  ngOnInit(): void {

    this.loadData()
  }
  loadData(){
    this.imagenesService.obtenerImagenes(this.data.producto?.id!,this.data.productoMostrado?.color?.color!).subscribe(img=>{
      this.imagenes = img.rutas;
    },err=>{
    })

    console.log('api/imagenes/productos/uploads/img/'+this.data.producto.id +'/'+this.data.productoMostrado!.color?.color +'/'+this.imagenes[0])
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable.pipe(take(1)).subscribe(() => this.autosize.resizeToFitContent(true));
  }

  createComentarioForm(){
    const comentario = this.data.comentario;

    if(comentario){
      return new FormGroup({
        valoracion: new FormControl<number>(comentario.valoracion!, {nonNullable: true, validators: [Validators.required]}),
        titulo: new FormControl<string>(comentario.titulo!, {nonNullable: true, validators: [Validators.required]}),
        descripcion: new FormControl<string>(comentario.comentario!, {nonNullable: true, validators: [Validators.required]}),
      })
    }else{
    return new FormGroup({
      valoracion: new FormControl<number>(1, {nonNullable: true, validators: [Validators.required]}),
      titulo: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
      descripcion: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    })

    }
  }

  crearComentario() {
    this.comentarioForm.markAllAsTouched()
    if (this.comentarioForm.valid){
      this.loading = true;
      this.comentarioForm.disable()


      if(this.data.comentario){
        const comentarioNuevo = this.data.comentario;
        comentarioNuevo.valoracion = this.comentarioForm.controls.valoracion.value;
        comentarioNuevo.titulo= this.comentarioForm.controls.titulo.value;
        comentarioNuevo.comentario = this.comentarioForm.controls.descripcion.value;
        this.comentariosService.editComentario(this.data.producto.id!,comentarioNuevo as ComentarioProducto).subscribe(resp=>{
          this.loading = false
          this.comentarioForm.enable()
          this.dialogRefVisualizar.close(true)
        },(error)=>{
          this.loading = false
          this.comentarioForm.enable()
          this.dialogRefVisualizar.close(false)
        });
      }else{
        const comentarioNuevo: ComentarioProducto= {
          titulo: this.comentarioForm.controls.titulo.value,
          comentario: this.comentarioForm.controls.descripcion.value,
          valoracion: this.comentarioForm.controls.valoracion.value
        }
        this.comentariosService.guardarComentario(this.data.producto?.id!, comentarioNuevo ).subscribe((resp)=>{
          this.loading = false
          this.comentarioForm.enable()
          this.dialogRefVisualizar.close(true);
          this.comentariosService.comentarioChange.next(!this.comentariosService.comentarioChange.value);
        },(error)=>{
          this.loading = false
          this.comentarioForm.enable()
          this.dialogRefVisualizar.close(false)
        });
      }

    }

  }
  cancelar() {
    this.loading = true;

    this.dialogRefCrear.close(false);

    this.loading = false;
  }


}
