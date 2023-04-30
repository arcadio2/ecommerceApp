import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto.model';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-listado-productos',
  templateUrl: './listado-productos.component.html',
  styleUrls: ['./listado-productos.component.css']
})
export class ListadoProductosComponent implements OnInit {

  nombreProducto!:string;
  categoriaProducto:string = "Ver todo";
  generoProducto!:string;
  catalagoMujer: string[] = CatalagoRopaMujer
  catalagoHombre: string[] = CatalagoRopaHombre

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

  seleccionarCateogoria(categoriaSeleccionada:string){
    this.categoriaProducto = categoriaSeleccionada
    this.buscarProductos()
  }
}

const CatalagoRopaMujer: string[] = [
  "Ver todo", "Playeras", "Blusas", "Pantalones", "Vestidos", "Tenis", "Sueteres"
]

const CatalagoRopaHombre: string[] = [
  "Ver todo", "Playeras", "Pantalones", "Camisas", "Tenis", "Sueteres"
]
