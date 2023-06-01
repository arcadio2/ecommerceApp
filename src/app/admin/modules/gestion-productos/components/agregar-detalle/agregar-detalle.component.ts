import { Component, Inject,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ProductosAdminService } from 'src/app/admin/services/productos-admin.service';
import { Categoria, Color, DetalleDto, DetalleProducto, Producto, Talla } from 'src/app/models/producto.model';
import { CategoriaControllersService } from 'src/app/services/categoria-controllers.service';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-agregar-detalle',
  templateUrl: './agregar-detalle.component.html',
  styleUrls: ['./agregar-detalle.component.css']
})
export class AgregarDetalleComponent implements OnInit {

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
  fotosSeleccionadas: File[]=[];

  tallasSeleccionadas: Talla[] = [];

  detallesSeleccionados: DetalleDto[] = [];
  stockSeleccionados:number[] = [];

  colorSeleccionado!:Color;

  public imagenPrevisualizada: Array<string | ArrayBuffer | null> = [];

  constructor(
      private dialogRef: MatDialogRef<AgregarDetalleComponent>,
      private productoService: ProductosService,
      private productoAdminService: ProductosAdminService,
      private toastService:ToastrService,
      private categoriaControllers: CategoriaControllersService,
      @Inject(MAT_DIALOG_DATA) public producto: Producto,
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
      nombre: new FormControl<string>({value:this.producto.nombre!,disabled:true}, {nonNullable: true, validators: [Validators.required]}),
      descripcion: new FormControl<string>({value:this.producto.descripcion!,disabled:true}, {nonNullable: true, validators: [Validators.required]}),
      precio: new FormControl<number>({value:this.producto.precio!,disabled:true}, {nonNullable: true, validators: [Validators.required]}),



      color: new FormControl<string>('', {nonNullable: true, validators: [Validators.required]}),
      foto: new FormControl<any>('', {nonNullable: true, validators: [Validators.required]})
    })
  }

  registrarNuevoProducto() {
    this.loading = true;
    this.agregarProductoForm.markAllAsTouched();

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
          producto:this.producto

        })
      });
      let tipo!:Categoria;

     /*  const nuevoProducto: Producto = {
        nombre: this.agregarProductoForm.controls.nombre.value,
        descripcion: this.agregarProductoForm.controls.descripcion.value,
        precio: this.agregarProductoForm.controls.precio.value,
        detalle:this.detallesSeleccionados,
        categoria:tipo,
        hombre: true ? this.agregarProductoForm.controls.sexo.value =='0':false,

      } */
      const detalle:DetalleDto = this.detallesSeleccionados as DetalleDto;
      //detalle.producto = this.producto;
      //console.log("El que se envia",detalle)

      this.productoAdminService.agregarDetalle(detalle).subscribe(resp=>{

        const nuevo:DetalleProducto = resp.subproducto;

        const color_producto = nuevo.color?.color!;
        this.productoAdminService.subirFotos(this.fotosSeleccionadas,this.producto.id!,color_producto).subscribe(resp=>{
        this.loading = false
        })
        this.dialogRef.close(true);
        this.loading = false;
      }, _ => {
        this.loading = false
      })

    }else{
      console.log("errores ",this.agregarProductoForm.errors)
      this.dialogRef.close();
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
