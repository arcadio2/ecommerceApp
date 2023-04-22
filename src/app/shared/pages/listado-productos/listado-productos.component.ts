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
  productos:Producto[]=[];
  
  constructor(private route: ActivatedRoute,
    private toastService: ToastrService,
    private productoService:ProductosService) { }

  ngOnInit(): void {
    
    this.route.queryParamMap.subscribe(params=>{
      this.nombreProducto = params.get('producto')!;
      //console.log(this.route.snapshot.queryParamMap.get("categoria"))
      this.buscarProductos();
    });
  }
  buscarProductos(){
    this.productoService.getSimilar1(this.nombreProducto).subscribe(resp=>{
      console.log(resp.productos);
      this.productos = resp.productos;
    },err=>{
      if(err.status==404){  
        this.toastService.error("No existe el proucto")

      }
     
    })
  }
}
