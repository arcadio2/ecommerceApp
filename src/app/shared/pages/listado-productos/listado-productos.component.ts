import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import {Categoria, Producto} from 'src/app/models/producto.model';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-listado-productos',
  templateUrl: './listado-productos.component.html',
  styleUrls: ['./listado-productos.component.css']
})
export class ListadoProductosComponent implements OnInit {

  nombreProducto!:string;
  categoriaProducto?:string;
  generoProducto!:string;
  catalagoMujer: Categoria[] =[]
  catalagoHombre: Categoria[] =[]

  productos:Producto[]=[];

  constructor(private route: ActivatedRoute,
    private toastService: ToastrService,
    private productoService:ProductosService) { }

  ngOnInit(): void {

    this.route.queryParamMap.subscribe(params=>{
      this.nombreProducto = params.get('producto')!;
      this.categoriaProducto = params.get('categoria')!;
      this.generoProducto = params.get('genero')!;
      //console.log(this.route.snapshot.queryParamMap.get("categoria"))
      this.buscarProductos();
    });

    this.productoService.getCategoriaBySexo("Hombre").subscribe(resp=>{
      this.catalagoHombre = resp;
    });
    this.productoService.getCategoriaBySexo("Mujer").subscribe(resp=>{
      this.catalagoMujer = resp;
    });
  }
  buscarProductos(){

    if (this.categoriaProducto === 'Ver todo'){
      this.productoService.getSimilar1(this.nombreProducto,'null',this.generoProducto).subscribe(resp=>{
        console.log(resp.productos);
        this.productos = resp.productos;
      },err=>{
        if(err.status==404){
          this.toastService.error("No existe el producto")

        }

      })
    } else {
      this.productoService.getSimilar1(this.nombreProducto,this.categoriaProducto,this.generoProducto).subscribe(resp=>{
        console.log(resp.productos);
        this.productos = resp.productos;
      },err=>{
        if(err.status==404){
          this.toastService.error("No existe el producto")

        }

      })
    }
  }

  seleccionarCateogoria(categoriaSeleccionada:string | undefined){
    this.categoriaProducto = categoriaSeleccionada
    this.buscarProductos()
  }
}
