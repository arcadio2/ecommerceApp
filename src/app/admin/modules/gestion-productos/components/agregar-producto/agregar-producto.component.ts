import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {ProductosService} from "../../../../../services/productos.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Categoria, Color, Producto} from "../../../../../models/producto.model";
import {CategoriaControllersService} from "../../../../../services/categoria-controllers.service";

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent implements OnInit {
  loading = false
  readonly agregarProductoForm;
  coloresDisponibles: Color[] = []
  categoriasDisponibles: Categoria[] = []
  categoriasSeleccionables: Categoria[] =[]
  catalagoHombre = [];
  selectedHombre:boolean = true;

  constructor(
    private dialogRef: MatDialogRef<AgregarProductoComponent>,
    private productoService: ProductosService,
    private categoriaControllers: CategoriaControllersService
  ) {
    this.agregarProductoForm = this.createProductoForm()
  }

  ngOnInit(): void {
    this.categoriaControllers.getColores().subscribe((resp:any)=>{
      this.coloresDisponibles = resp.colores
    })

    this.categoriaControllers.getCategoriasRopa().subscribe((resp: any)=>{
      console.log(resp.categorias)
      this.categoriasDisponibles = resp.categorias
      this.categoriasSeleccionables = this.categoriasDisponibles.filter(r => r.hombre==true)
      console.log("dsnjjkdnsd",this.categoriasSeleccionables)
    })



  }

  cambiarCategoria(event:any){
    console.log(event)
    this.selectedHombre = !this.selectedHombre;
    if(!this.selectedHombre){
      this.categoriasSeleccionables = this.categoriasDisponibles.filter(r => r.mujer==true)
    }else{
      this.categoriasSeleccionables = this.categoriasDisponibles.filter(r => r.hombre==true)

    }
  console.log(this.categoriasSeleccionables)

  }

  createProductoForm(){
    return new FormGroup({
      nombre: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
      descripcion: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
      precio: new FormControl<number>(-1, {nonNullable: true, validators: [Validators.required]}),
      stock: new FormControl<number>(-1, {nonNullable: true, validators: [Validators.required]}),
      sexo: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
      tipoRopa: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
      color: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]})
    })
  }

  registrarNuevoProducto() {
    this.loading = true;
    this.agregarProductoForm.markAllAsTouched();
    if (this.agregarProductoForm.valid) {
      const nuevoProducto: Producto = {
        nombre: this.agregarProductoForm.controls.nombre.value,
        descripcion: this.agregarProductoForm.controls.descripcion.value,
        precio: this.agregarProductoForm.controls.precio.value,
        detalle: [{
          stock: this.agregarProductoForm.controls.stock.value
        }]
      }
      console.log(nuevoProducto)
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


