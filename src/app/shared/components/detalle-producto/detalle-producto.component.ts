import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DetalleProducto, Producto } from 'src/app/models/producto.model';
import { ProductosService } from 'src/app/services/productos.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit {


  @Input()
  producto!:Producto; 
  color!:string; 
  nombre!:string; 
  url_backend:string =  environment.urlBase;

  constructor(private route: ActivatedRoute,
    private toastService: ToastrService,
    private productoService:ProductosService) { }

  ngOnInit(): void {
    this.color = this.producto.detalle![0].color?.color || '';  
    this.nombre = this.producto.nombre || '';  
    
  }

  imagen(){
    const url = this.url_backend; 
    const product = this.producto; 

    
    //return`${{url}}imagenes/uploads/img/${{product?.nombre!}}/{{producto?.detalle[0]?.color`
  }


  
}
