import { Component, OnInit } from '@angular/core';
import {Compra} from "../../../../../models/compras.model";
import {ComprasService} from "../../../../../services/compras.service";
import {environment} from "../../../../../../environments/environment";
import {animate, state, style, transition, trigger} from "@angular/animations";


@Component({
  selector: 'app-gestion-ventas-pedidos',
  templateUrl: './gestion-ventas-pedidos.component.html',
  styleUrls: ['./gestion-ventas-pedidos.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class GestionVentasPedidosComponent implements OnInit {
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
    this.columnsToDisplayWithExpand.push('acciones');
    this.columnsToDisplayWithExpand.push('expand');
  }

  ngOnInit(): void {
    this.loading = true
    this.comprasService.listAllCompras().subscribe((resp)=>{
      this.dataSourcePedidos = resp.compras
      console.log(resp.compras)
      this.loading = false
    })
  }

  protected readonly environment = environment;

  confirmarPedidoEntregado(element: Compra){

  }

}
