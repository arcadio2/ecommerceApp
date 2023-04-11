import { Component, OnInit } from '@angular/core';
import {ProductosService} from "../../../services/productos.service";
import { UsuarioService } from 'src/app/services/usuario.service';
import { User } from 'src/app/models/user.model';
import { Bolsa, DetalleProducto, ElementoCarrito, Producto, ProductoCarrito } from 'src/app/models/producto.model';
import { AuthService } from 'src/app/auth/services/auth.service';
import {  ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-carrito-compras',
  templateUrl: './carrito-compras.component.html',
  styleUrls: ['./carrito-compras.component.css']
})
export class CarritoComprasComponent implements OnInit {
  carritoCompras: ElementoCarrito[] = [];
  bolsa!:Bolsa[];

  usuario:User | undefined; 

  constructor(
    private productoService: ProductosService,
    private usuarioService:UsuarioService,
    private authService:AuthService,
    private toastService:ToastrService
  ) {}

  ngOnInit(): void {
    this.usuarioService.getUserByUsername(this.authService.usuario.username).subscribe((resp:any)=>{
      this.usuario = resp.usuario as User; 
      const elementos_bolsa:Bolsa[] = this.usuario?.bolsa!;
      this.bolsa = elementos_bolsa; 
      elementos_bolsa.forEach(elemento=>{
      
        this.productoService.getProducto(elemento.detalle_producto?.nombre_producto!).subscribe((resp)=>{
          

          const producto:Producto = resp.producto; 
          const elemento_producto:ProductoCarrito={
            costo:producto.precio!
            ,nombre:producto.nombre!
            ,color:elemento.detalle_producto?.color?.color || ''
            ,talla:elemento.detalle_producto?.talla?.talla || ''
          }; 
          
          /* elemento_producto.costo=producto.precio!; 
          elemento_producto.nombre=producto.nombre!;
          elemento_producto.color=elemento.detalle_producto?.color?.color || '';
          elemento_producto.talla=elemento.detalle_producto?.talla?.talla || '';  */
          
          let elemento_carro:ElementoCarrito={
            ropa:elemento_producto,
            cantidad:elemento.cantidad

          }
        
          this.carritoCompras.push(elemento_carro);
        })
        

      })
      
    })

  }

  obtenerCostoTotal(){
    let costoTotal: number = 0;
    if (this.carritoCompras != undefined){
      this.carritoCompras.forEach((elemento)=>{
        
        costoTotal += Number(elemento?.ropa?.costo!*elemento?.cantidad!);
      });
    }

    return costoTotal
  }

  aumentarElemento(idxElemento: number){
    if(this.carritoCompras[idxElemento].cantidad!<this.bolsa[idxElemento].detalle_producto?.stock!){
      this.carritoCompras[idxElemento].cantidad! += 1

      this.bolsa[idxElemento].cantidad = this.carritoCompras[idxElemento].cantidad!; 

  
      this.actualizarCantidad(this.bolsa[idxElemento]); 

    }else{
      this.toastService.info("No hay mas stock disponible");
    }
    
  }

  disminuirElemento(idxElemento: number) {
    if(this.carritoCompras[idxElemento].cantidad!>1){
      this.carritoCompras[idxElemento].cantidad! -= 1;
      this.bolsa[idxElemento].cantidad = this.carritoCompras[idxElemento].cantidad!; 
      this.actualizarCantidad(this.bolsa[idxElemento]); 
      //this.actualizarCantidad(this.bolsa[idxElemento].detalle_producto!); 
    }
    
  }

  actualizarCantidad(detalle:DetalleProducto){
    this.productoService.editElementoCarrito(detalle).subscribe(resp=>{
      console.log(resp);
      
    })
  }

  eliminarProducto(idxElemento: number){
    this.carritoCompras.splice(idxElemento, 1  )
  }

  calcularCostoProducto(cantidad:number,precio:number){
    return cantidad*precio; 
  }
}




/**
 * 
 * {
    ropa : {
      id: 1, nombre: 'Playera', talla: 'M', color: 'Negro', costo: 500, imagen: 'playera.png'
    },
    cantidad: 4
  }
 */
