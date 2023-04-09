import { Component, OnInit } from '@angular/core';
import {ProductosService} from "../../../services/productos.service";


@Component({
  selector: 'app-carrito-compras',
  templateUrl: './carrito-compras.component.html',
  styleUrls: ['./carrito-compras.component.css']
})
export class CarritoComprasComponent implements OnInit {
  carritoCompras: elementoCarrito[] = [];

  constructor(
    private productoService: ProductosService
  ) {}

  ngOnInit(): void {
    this.carritoCompras = carritoComprasMock
  }

  obtenerCostoTotal(){
    let costoTotal: number = 0;
    if (this.carritoCompras != undefined){
      this.carritoCompras.forEach((elemento)=>{
        console.log(elemento)
        costoTotal += Number(elemento.ropa.costo);
      });
    }

    return costoTotal
  }

  aumentarElemento(idxElemento: number){
    this.carritoCompras[idxElemento].cantidad += 1
  }

  disminuirElemento(idxElemento: number) {
    this.carritoCompras[idxElemento].cantidad -= 1;
  }

  eliminarProducto(idxElemento: number){
    this.carritoCompras.splice(idxElemento, 1  )
  }
}


interface Ropa {
  id: number;
  nombre: string;
  talla: string;
  color: string;
  costo: number;
  imagen: string
}

interface elementoCarrito {
  ropa: Ropa;
  cantidad: number;
}

const carritoComprasMock: elementoCarrito[] = [
  {
    ropa : {
      id: 1, nombre: 'Playera', talla: 'M', color: 'Negro', costo: 500, imagen: 'playera.png'
    },
    cantidad: 5
  },
  {
    ropa : {
      id: 1, nombre: 'Playera', talla: 'M', color: 'Negro', costo: 500, imagen: 'playera.png'
    },
    cantidad: 4
  },
  {
    ropa : {
      id: 1, nombre: 'Playera', talla: 'M', color: 'Negro', costo: 500, imagen: 'playera.png'
    },
    cantidad: 4
  }
]
