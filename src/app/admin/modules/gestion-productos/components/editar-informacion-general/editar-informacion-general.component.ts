import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Producto} from "../../../../../models/producto.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProductosService} from "../../../../../services/productos.service";
import { ProductosAdminService } from 'src/app/admin/services/productos-admin.service';

@Component({
  selector: 'app-editar-informacion-general',
  templateUrl: './editar-informacion-general.component.html',
  styleUrls: ['./editar-informacion-general.component.css']
})
export class EditarInformacionGeneralComponent implements OnInit {

  loading = false
  readonly editarInfoGeneralForm
  constructor(
    private dialogRef: MatDialogRef<EditarInformacionGeneralComponent>,
    private productoService: ProductosService,
    private productoAdminService: ProductosAdminService,
    @Inject(MAT_DIALOG_DATA) public producto: Producto
  ) {
    this.editarInfoGeneralForm = this.createProductoForm()
  }

  ngOnInit(): void {
  }

  createProductoForm(){
    return new FormGroup({
      nombre: new FormControl<string>(this.producto.nombre!, {nonNullable: true, validators: [Validators.required]}),
      descripcion: new FormControl<string>(this.producto.descripcion!, {nonNullable: true, validators: [Validators.required]}),
      precio: new FormControl<number>(this.producto.precio!, {nonNullable: true, validators: [Validators.required]}),
    })
  }

  guardarCambios(){
    this.loading = true;
    this.editarInfoGeneralForm.markAllAsTouched();
    if (this.editarInfoGeneralForm.valid) {
      const nuevoProducto: Producto = {
        id:this.producto.id,
        nombre: this.editarInfoGeneralForm.controls.nombre.value,
        descripcion: this.editarInfoGeneralForm.controls.descripcion.value,
        precio: this.editarInfoGeneralForm.controls.precio.value,

      }
      console.log(nuevoProducto)
      this.productoAdminService.editProducto(nuevoProducto).subscribe(resp=>{
        console.log(resp)
      })
    }
    this.dialogRef.close(true);

    this.loading = false;
  }

  cancelar() {
    this.loading = true;

    this.dialogRef.close(false);

    this.loading = false;
  }

}
