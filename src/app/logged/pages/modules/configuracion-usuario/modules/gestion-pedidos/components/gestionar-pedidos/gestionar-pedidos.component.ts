import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../../../../../../environments/environment";
import {Producto} from "../../../../../../../../models/producto.model";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {Compra} from "../../../../../../../../models/compras.model";
import {ComprasService} from "../../../../../../../../services/compras.service";
import {zip} from "rxjs";

@Component({
  selector: 'app-gestionar-pedidos',
  templateUrl: './gestionar-pedidos.component.html',
  styleUrls: ['./gestionar-pedidos.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class GestionarPedidosComponent implements OnInit {
  loading = false

  dataSourcePedidos?: Compra[] ;
  columnsToDisplay: string[] = ['id', 'precio', 'fecha_compra'];
  labelsColumns: string[] = ['ID', 'Precio', 'Fecha de compra'];
  columnasZip: [string, string][] = this.columnsToDisplay.map((value, index) => [value, this.labelsColumns[index]]);
  nombreProductoIndex = 1; // Índice en el que deseas insertar el nombre del producto
  columnsToDisplayWithExpand = [...this.columnsToDisplay];


  expandedElement?:  | null;
  imagenes:string[]=[];

  url_backend = environment.urlBase;
  constructor(
    private comprasService: ComprasService
  ) {
    this.columnsToDisplayWithExpand.splice(this.nombreProductoIndex, 0, 'nombre_producto');
    this.columnsToDisplayWithExpand.push('active');
    this.columnsToDisplayWithExpand.push('expand');
  }

  ngOnInit(): void {
    this.comprasService.listComprasByUsuario().subscribe((resp)=>{
      this.dataSourcePedidos = resp.compras
      console.log(resp.compras)
    })
  }

  protected readonly environment = environment;

}
