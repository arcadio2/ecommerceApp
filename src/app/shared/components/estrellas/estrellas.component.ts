import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Comentario, Producto } from 'src/app/models/producto.model';

@Component({
  selector: 'app-estrellas',
  templateUrl: './estrellas.component.html',
  styleUrls: ['./estrellas.component.css']
})
export class EstrellasComponent implements OnInit,OnChanges {


  cantidad_estrellas:number = 0;
  recorrido_estrellas:number[] =[];
  recorrido_estrellas_restantes:number=0;
  tiene_comentario:boolean=false;
  @Input() valoracion_total!:number; 

  constructor() { }

  ngOnInit(): void {

  }

  reinicializar(){
    this.cantidad_estrellas =0; 
    this.recorrido_estrellas =[]; 
    this.recorrido_estrellas_restantes=0; 
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.reinicializar()
   this.obtenr()
  }

  obtenr(){

    this.cantidad_estrellas = Math.ceil(this.valoracion_total!) || 0;

    for (let i = 0; i < this.cantidad_estrellas; i++) {
      // Si el número es entero, agregamos elementos con valor 1
      if (Number.isInteger(this.valoracion_total!)) {
        this.recorrido_estrellas.push(1);
      } else {
        // Si el número no es entero, agregamos elementos con valor 0 excepto el último que es 1
        if (i < this.cantidad_estrellas - 1) {
          this.recorrido_estrellas.push(1);
        } else {
          this.recorrido_estrellas.push(0);
        }
      }
    }

    this.recorrido_estrellas_restantes = 5-this.recorrido_estrellas.length;
  }

}
