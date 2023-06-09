import { Component, OnInit } from '@angular/core';
import {ProductosService} from "../../../services/productos.service";
import { UsuarioService } from 'src/app/services/usuario.service';
import { User } from 'src/app/models/user.model';
import { Bolsa, DetalleDto, DetalleProducto, ElementoCarrito, Producto, ProductoCarrito } from 'src/app/models/producto.model';
import { AuthService } from 'src/app/auth/services/auth.service';
import {  ToastrService } from 'ngx-toastr';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponentComponent } from 'src/app/shared/components/dialog-component/dialog-component.component';
import { forkJoin } from 'rxjs';
import { environment } from 'src/environments/environment';
import { BolsaService } from 'src/app/services/bolsa.service';
import { ComprasService } from 'src/app/services/compras.service';


@Component({
  selector: 'app-carrito-compras',
  templateUrl: './carrito-compras.component.html',
  styleUrls: ['./carrito-compras.component.css']
})
export class CarritoComprasComponent implements OnInit {
  carritoCompras: ElementoCarrito[] = [];
  bolsa!:Bolsa[];
  productos:DetalleDto[] = [];
  usuario:User | undefined;
  url_backend = environment.urlBase;

  loading = false

  constructor(
    private productoService: ProductosService,
    private usuarioService:UsuarioService,
    private authService:AuthService,
    private toastService:ToastrService,
    public dialog: MatDialog,
    private comprasService:ComprasService,
    private bolsaService:BolsaService
  ) {}

  ngOnInit(): void {

    this.loading = true
    /*
    this.bolsaService.obtenerCarrito().subscribe((resp:any)=>{
      this.bolsa = resp.bolsa;
    },err=>{

    })*/
    this.usuarioService.getUserByUsername(this.authService.usuario.username).subscribe((resp:any)=>{
      this.usuario = resp.usuario as User;
      const elementos_bolsa:Bolsa[] = this.usuario?.bolsa!;

      this.bolsa = elementos_bolsa;
      this.productos = this.bolsa.map(v=>v.detalle_producto as DetalleDto)

      const observables = elementos_bolsa.map(elemento =>
        this.productoService.getProducto(elemento.detalle_producto?.nombre_producto!)
      );

      forkJoin(observables).subscribe(respuestas => {
        respuestas.forEach((resp, index) => {
          if(elementos_bolsa[index].cantidad! >elementos_bolsa[index].detalle_producto?.stock!){
            elementos_bolsa[index].cantidad = elementos_bolsa[index].detalle_producto?.stock;
            this.actualizarCantidad(elementos_bolsa[index]);
          }

          const producto: Producto = resp.producto;
          this.productos[index].producto=producto;
          const elemento_producto: ProductoCarrito = {
            costo: producto.precio!,
            nombre: producto.nombre!,
            id: producto.id,
            color: elementos_bolsa[index].detalle_producto?.color?.color || '',
            talla: elementos_bolsa[index].detalle_producto?.talla?.talla || '',
          };

          const elemento_carro: ElementoCarrito = {
            ropa: elemento_producto,
            cantidad: elementos_bolsa[index].cantidad,
          };

          this.carritoCompras.push(elemento_carro);
        });

        //console.log('Carro', this.carritoCompras);
      });

      this.loading = false
    });


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
      this.toastService.clear();
      this.toastService.warning("No hay mas stock disponible");
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


    })
  }

  eliminarProducto(idxElemento: number){

    if(this.bolsa[idxElemento]?.id){
      this.productoService.deleteElementoCarrito(this.bolsa[idxElemento]?.id!).subscribe((resp:any)=>{
        this.toastService.success(resp.mensaje);
      },(err:any)=>{
        if(err.status==404){

          this.toastService.error(err.error.mensaje);
        }
      });
      this.carritoCompras.splice(idxElemento, 1  );
      this.bolsa.splice(idxElemento, 1  );
    }else{
      this.toastService.error("Ha ocurrido un error al eliminar el elemento");
    }


  }

  eliminar(idxElemento:number) {
    this.loading = true

    const dialogRef = this.dialog.open(DialogComponentComponent, {
      width: '30%',
      data: '¿Está seguro que desea eliminar este elemento?'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loading = false
      if (result === 'yes') {
       this.eliminarProducto(idxElemento);
      } else {

      }
    });
  }

  calcularCostoProducto(cantidad:number,precio:number){
    return cantidad*precio;
  }

  guardarProductos(){
    this.comprasService.productos = this.productos! || [];
    this.comprasService.bolsa = this.bolsa || [];
  }
}


/**
 *
 * elementos_bolsa.forEach(elemento=>{

        this.productoService.getProducto(elemento.detalle_producto?.nombre_producto!).subscribe((resp)=>{


          const producto:Producto = resp.producto;
          const elemento_producto:ProductoCarrito={
            costo:producto.precio!
            ,nombre:producto.nombre!
            ,color:elemento.detalle_producto?.color?.color || ''
            ,talla:elemento.detalle_producto?.talla?.talla || ''
          };



          let elemento_carro:ElementoCarrito={
            ropa:elemento_producto,
            cantidad:elemento.cantidad

          }

          this.carritoCompras.push(elemento_carro);
          console.log("Carro",this.carritoCompras);
        })


      });
 *
 */

/**
 *
 * {
    ropa : {
      id: 1, nombre: 'Playera', talla: 'M', color: 'Negro', costo: 500, imagen: 'playera.png'
    },
    cantidad: 4
  }
 */
