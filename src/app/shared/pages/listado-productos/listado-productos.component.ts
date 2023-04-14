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
    this.route.paramMap.subscribe(params=>{
      this.nombreProducto = params.get('producto')!;
      this.buscarProductos();
    });
  }
  buscarProductos(){
    this.productoService.getSimilar1(this.nombreProducto).subscribe(resp=>{
      console.log(resp);
      this.productos = resp;
    },err=>{
      if(err.status==404){  
        this.toastService.error("No existe el proucto")

      }
     
    })
  }
}