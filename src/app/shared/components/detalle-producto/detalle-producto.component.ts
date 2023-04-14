import { Component, OnInit,Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Producto } from 'src/app/models/producto.model';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit {


  @Input()
  producto!:Producto; 

  constructor(private route: ActivatedRoute,
    private toastService: ToastrService,
    private productoService:ProductosService) { }

  ngOnInit(): void {
    
  }


  
}
