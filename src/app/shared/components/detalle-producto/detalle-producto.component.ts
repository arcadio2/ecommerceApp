import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Color, DetalleProducto, Producto } from 'src/app/models/producto.model';
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
  detalles_guardados:DetalleProducto[] =[]; 

  constructor(private route: ActivatedRoute,
    private toastService: ToastrService,
    private productoService:ProductosService) { }

  ngOnInit(): void {
    this.color = this.producto.detalle![0].color?.color || '';  
    this.nombre = this.producto.nombre || '';  
    this.detalles_guardados = this.producto?.detalle!.reduce((acumulador: DetalleProducto[], detalle: DetalleProducto) => {
   
      if (detalle.color) {
        
        if (!acumulador.some(det => det.color?.color === detalle.color?.color)) {
          
          acumulador.push(detalle);
        }
      }
      // Devolvemos el acumulador en cada iteración
      return acumulador;
    }, []);
    
  }

  imagen(){
    const url = this.url_backend; 
    const product = this.producto; 

    
    //return`${{url}}imagenes/uploads/img/${{product?.nombre!}}/{{producto?.detalle[0]?.color`
  }


  
}
