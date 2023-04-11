import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto.model';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private toastService: ToastrService,
              private productoService:ProductosService) { }

  nombreProducto!:string; 
  producto!:Producto; 

  ngOnInit(): void {
    console.log(this.route.snapshot)
    this.nombreProducto = this.route.snapshot.paramMap.get('producto')!;
    this.productoService.getProducto(this.nombreProducto).subscribe(resp=>{
      console.log(resp);
      this.producto = resp.producto;
    },err=>{
      if(err.status==404){  
        this.toastService.error("No existe el proucto")

      }
     
    })
  }



}
