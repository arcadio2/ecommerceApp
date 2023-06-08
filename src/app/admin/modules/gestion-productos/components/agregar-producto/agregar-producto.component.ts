import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {ProductosService} from "../../../../../services/productos.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Categoria, Color, DetalleDto, DetalleProducto, Producto, Talla} from "../../../../../models/producto.model";
import {CategoriaControllersService} from "../../../../../services/categoria-controllers.service";
import { ToastrService } from 'ngx-toastr';
import { ProductosAdminService } from 'src/app/admin/services/productos-admin.service';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent implements OnInit {
  loading = false
  agregarProductoForm = this.createProductoForm()
  coloresDisponibles: Color[] = []
  tallasDisponibles: Talla[] = [];
  tallasSeleccionables: Talla[] = [];
  categoriasDisponibles: Categoria[] = []
  categoriasSeleccionables: Categoria[] =[]
  catalagoHombre = [];
  selectedHombre:boolean = true;
  troncoSuperior:boolean = true;
  fotosSeleccionadas: File[]=[];
  public imagenPrevisualizada: Array<string | ArrayBuffer | null> = [];

  tallasSeleccionadas: Talla[] = [];

  detallesSeleccionados: DetalleProducto[] = [];
  stockSeleccionados:number[] = [];

  colorSeleccionado!:Color;

  constructor(
    private dialogRef: MatDialogRef<AgregarProductoComponent>,
    private productoService: ProductosService,
    private productoAdminService: ProductosAdminService,
    private toastService:ToastrService,
    private categoriaControllers: CategoriaControllersService
  ) {
  }

  ngOnInit(): void {
    this.categoriaControllers.getColores().subscribe((resp:any)=>{
      this.coloresDisponibles = resp.colores
    })
    this.categoriaControllers.getTallas().subscribe((resp:any)=>{
      this.tallasDisponibles = resp.tallas;
      this.tallasSeleccionables = this.tallasDisponibles.filter(t=>t.tronco_superior==true);
    })

    this.categoriaControllers.getCategoriasRopa().subscribe((resp: any)=>{
      console.log(resp.categorias)
      this.categoriasDisponibles = resp.categorias
      this.categoriasSeleccionables = this.categoriasDisponibles.filter(r => r.hombre==true)
      console.log("dsnjjkdnsd",this.categoriasSeleccionables)
    })



  }

  cambiarCategoria(event:any){
    this.tallasSeleccionadas = [];

    this.selectedHombre = !this.selectedHombre;
    if(!this.selectedHombre){
      this.categoriasSeleccionables = this.categoriasDisponibles.filter(r => r.mujer==true)
    }else{
      this.categoriasSeleccionables = this.categoriasDisponibles.filter(r => r.hombre==true)

    }
  console.log(this.categoriasSeleccionables)

  }
  cambiarTalla(event:any){
    this.tallasSeleccionadas = [];

    this.categoriasSeleccionables.forEach(r=>{
      if(r.tipo==event.target.value){
        this.troncoSuperior = r.tronco_superior!;
      }
    })

    if(this.troncoSuperior){
      this.tallasSeleccionables = this.tallasDisponibles.filter(r => r.tronco_superior==true)
    }else{
      this.tallasSeleccionables = this.tallasDisponibles.filter(r => r.tronco_superior==false)

    }

  }

  cambiarColor(color:Color){
    this.colorSeleccionado = color;
  }
  anadirTalla(talla:Talla){

    if(this.tallasSeleccionadas.includes(talla)){

      const indice_elemento =this.tallasSeleccionadas.indexOf(talla);
      if (indice_elemento > -1) {
        this.tallasSeleccionadas.splice(indice_elemento, 1);
        this.stockSeleccionados.splice(indice_elemento, 1);
      }

    }else{

      this.tallasSeleccionadas.push(talla);
      this.stockSeleccionados.push(1);


    }


  }


  createProductoForm(){
   /*  stock: new FormControl<number>(-1, {nonNullable: true, validators: [Validators.required]}), */
    return new FormGroup({
      nombre: new FormControl<string>('', {nonNullable: true, validators: [Validators.required, Validators.minLength(10), Validators.maxLength(200)]}),
      descripcion: new FormControl<string>('', {nonNullable: true, validators: [Validators.required, Validators.minLength(10), Validators.maxLength(1000)]}),
      precio: new FormControl<string>('', {nonNullable: true, validators: [Validators.required, Validators.pattern('[0-9]+(\.[0-9]+)?')]}),

      sexo: new FormControl<string>('0', {nonNullable: true, validators: [Validators.required]}),
      tipoRopa: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
      color: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
      foto: new FormControl<any>('', {nonNullable: true, validators: [Validators.required]})
    })
  }

  registrarNuevoProducto() {
    this.agregarProductoForm.markAllAsTouched();

    console.log(this.agregarProductoForm.controls.nombre.value);
    console.log(this.agregarProductoForm.controls.sexo.value);
    console.log(this.agregarProductoForm.controls.tipoRopa.value);

    const nombre_producto = this.agregarProductoForm.controls.nombre.value;
    const desc_producto = this.agregarProductoForm.controls.descripcion.value;

    if(!nombre_producto || nombre_producto.length>200  || nombre_producto.length<10){
      this.toastService.error("Debes escribir un nombre menor a 200 caracteres y mayor a 10");
      return;
    }

    if(!desc_producto || desc_producto.length>1000 || desc_producto.length<10){
      this.toastService.error("Debes escribir una descripción menor a 1000 caracteres y mayor a 10");
      return;
    }

    if(!this.colorSeleccionado){
      this.toastService.error("Debes seleccionar un color");
      return
    }
    if(this.tallasSeleccionadas.length==0){
      this.toastService.error("Debes seleccionar tallas a agregar");
      return
    }


    if(this.fotosSeleccionadas.length==0){
      this.toastService.error("Debes seleccionar al menos 1 foto");
      return
    }




    if (!this.agregarProductoForm.errors) {


      this.tallasSeleccionadas.forEach((t,index) =>{

        this.detallesSeleccionados.push({
          color:this.colorSeleccionado,
          talla:t,
          stock:this.stockSeleccionados[index],


        })
      });
      let ceros:boolean = true;
      this.detallesSeleccionados.forEach(resp=>{
        if( (resp.stock!) <= 0){
          ceros = false;
        }
      });
      if(!ceros){
        this.toastService.error("Debes agregar stock para cada talla");
        this.detallesSeleccionados=[];
        return
      }
      let tipo!:Categoria;
      this.categoriasDisponibles.forEach(c=>{
        if( c.tipo==this.agregarProductoForm.controls.tipoRopa.value){
          tipo=c;
        }

      });

      console.log("RIPO",tipo)

      const nuevoProducto: Producto = {
        nombre: this.agregarProductoForm.controls.nombre.value,
        descripcion: this.agregarProductoForm.controls.descripcion.value,
        precio: parseInt(this.agregarProductoForm.controls.precio.value),
        detalle:this.detallesSeleccionados,
        categoria:tipo,
        hombre: true ? this.agregarProductoForm.controls.sexo.value =='0':false,

      }

      this.loading = true
      this.productoAdminService.agregarProducto(nuevoProducto).subscribe(resp=>{

        const nuevo:Producto = resp.producto;
        console.log("NUEVO ",nuevo)
        const id_producto = nuevo.id;
        const color_producto = nuevo.detalle![0].color?.color!;
        this.productoAdminService.subirFotos(this.fotosSeleccionadas,id_producto!,color_producto).subscribe(resp=>{
          this.loading = false
        }, error => {
          this.loading = false
        })
        this.dialogRef.close(true);

      }, error => {
        this.loading = false
      })

    }else{
      console.log("errores ",this.agregarProductoForm.errors)
      this.toastService.error("Los datos son inválidos");
    }

  }

  seleccionarFoto(event:any){
    this.fotosSeleccionadas = event.target.files;
    this.imagenPrevisualizada=[];
/*     event.target.files.forEach((r:any)=>{
      let lector = new FileReader();

      lector.onload = () => {
        this.imagenPrevisualizada.push(lector.result as string);
      };
      lector.readAsDataURL(r);
    }) */

    if (this.fotosSeleccionadas) {
      for (let i = 0; i < this.fotosSeleccionadas.length; i++) {
        const file = this.fotosSeleccionadas[i];
        const reader = new FileReader();
        reader.onload = () => {
          this.imagenPrevisualizada.push(reader.result);
        };
        reader.readAsDataURL(file);
      }
    }

  }

  cancelar() {
    this.loading = true;

    this.dialogRef.close(false);

    this.loading = false;
  }

}


