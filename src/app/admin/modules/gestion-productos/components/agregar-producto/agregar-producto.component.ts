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
  readonly agregarProductoForm;
  coloresDisponibles: Color[] = []
  tallasDisponibles: Talla[] = [];
  tallasSeleccionables: Talla[] = [];
  categoriasDisponibles: Categoria[] = []
  categoriasSeleccionables: Categoria[] =[]
  catalagoHombre = [];
  selectedHombre:boolean = true;
  troncoSuperior:boolean = true; 

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
    this.agregarProductoForm = this.createProductoForm()
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
      this.stockSeleccionados.push(0); 
      

    }
    

  }


  createProductoForm(){
   /*  stock: new FormControl<number>(-1, {nonNullable: true, validators: [Validators.required]}), */
    return new FormGroup({
      nombre: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
      descripcion: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
      precio: new FormControl<number>(100, {nonNullable: true, validators: [Validators.required]}),
      
      sexo: new FormControl<string>('0', {nonNullable: true, validators: [Validators.required]}),
      tipoRopa: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
      color: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]})
    })
  }

  registrarNuevoProducto() {
    this.loading = true;
    this.agregarProductoForm.markAllAsTouched();

    console.log(this.agregarProductoForm.controls.nombre.value);
    console.log(this.agregarProductoForm.controls.sexo.value);
    console.log(this.agregarProductoForm.controls.tipoRopa.value);
    if(!this.colorSeleccionado){
      this.toastService.error("Debes seleccionar un color"); 
      return
    }
    if(this.tallasSeleccionadas.length==0){
      this.toastService.error("Debes seleccionar tallas a agregar"); 
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
        precio: this.agregarProductoForm.controls.precio.value,
        detalle:this.detallesSeleccionados,
        categoria:tipo,
        hombre: true ? this.agregarProductoForm.controls.sexo.value =='0':false,
   
      }
      this.productoAdminService.agregarProducto(nuevoProducto).subscribe(resp=>{
        console.log(resp); 
        this.dialogRef.close(true);

        this.loading = false;  
      })
  
    }else{
      console.log("errores ",this.agregarProductoForm.errors)
      this.toastService.error("Los datos son inválidos"); 
    }
    
  }

  cancelar() {
    this.loading = true;

    this.dialogRef.close(false);

    this.loading = false;
  }

}


