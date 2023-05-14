import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../../../../../../environments/environment";
import {Producto} from "../../../../../../../../models/producto.model";

@Component({
  selector: 'app-gestionar-pedidos',
  templateUrl: './gestionar-pedidos.component.html',
  styleUrls: ['./gestionar-pedidos.component.css']
})
export class GestionarPedidosComponent implements OnInit {
  loading = false
  constructor() { }

  ngOnInit(): void {
  }

  protected readonly environment = environment;
}

interface pedidos{
  productos?: Producto[];
  cantidad?: number;
  costoTotal?: number;
  fecha?: Date
}

const pedidosMock = {

}
