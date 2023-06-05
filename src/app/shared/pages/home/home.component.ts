import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { Producto } from 'src/app/models/producto.model';
import { ProductosService } from 'src/app/services/productos.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  url_backend:string =  environment.urlBase;
  productos:Producto[]=[]; 
  constructor(
    private productosService:ProductosService
  ) { }

  ngOnInit(): void {
    this.productosService.getNovedades().pipe(
      tap(resp=>{
        console.log("RESPuesgasyuhvdahjvsjhsbvhjdsvj ",resp)
        this.productos = resp; 
      })
    ).subscribe();
  }

}
