import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {ProductosService} from "../../../../../services/productos.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Producto} from "../../../../../models/producto.model";

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent implements OnInit {
  loading = false
  agregarProductoForm:FormGroup = new FormGroup({
    nombre: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    descripcion: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
    precio: new FormControl<number>(-1, {nonNullable: true, validators: [Validators.required]}),
    stock: new FormControl<number>(-1, {nonNullable: true, validators: [Validators.required]})

  })
  constructor(
    private dialogRef: MatDialogRef<AgregarProductoComponent>,
    private productoService: ProductosService
  ) { }

  ngOnInit(): void {
  }

  registrarNuevoProducto() {
    this.loading = true;

    this.dialogRef.close(true);

    this.loading = false;
  }
  cancelar() {
    this.loading = true;

    this.dialogRef.close(false);

    this.loading = false;
  }

}
