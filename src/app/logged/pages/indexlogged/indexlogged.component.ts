import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Producto } from 'src/app/models/producto.model';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-indexlogged',
  templateUrl: './indexlogged.component.html',
  styleUrls: ['./indexlogged.component.css']
})
export class IndexloggedComponent implements OnInit {

  constructor(private authService:AuthService,private productoService:ProductosService) { }

  ngOnInit(): void {
    this.productoService.getProducto("playera verde").subscribe(resp=>{
      //console.log(resp)
      let producto: Producto = resp.producto; 
      this.productoService.addComentario(producto).subscribe(resp=>{
        
        console.log(resp)
      }); 
    })
   
  }

}
