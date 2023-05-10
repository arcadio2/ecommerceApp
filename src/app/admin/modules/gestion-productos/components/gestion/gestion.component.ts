import {Component, OnInit} from '@angular/core';
import {AgregarProductoComponent} from "../agregar-producto/agregar-producto.component";
import {MatDialog} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {ProductosService} from "../../../../../services/productos.service";
import {DetalleProducto, Producto} from "../../../../../models/producto.model";
import {environment} from "../../../../../../environments/environment";
import {EditarInformacionGeneralComponent} from "../editar-informacion-general/editar-informacion-general.component";
import { ProductosAdminService } from 'src/app/admin/services/productos-admin.service';

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css']
})
export class GestionComponent implements OnInit {

  loading = false
  panelOpenState = false;
  productosAgregados: Producto[] = []

  constructor(
    private dialog: MatDialog,
    private toastService: ToastrService,
    private productosService: ProductosService,
    private productoAdminService: ProductosAdminService
  ) {
  }

  ngOnInit(): void {
    console.log("aaaaa")
    this.loadData()
  }

  loadData() {
    this.loading = true
    this.productosService.getAllProductos().subscribe({
      next: r => {
        this.loading = false
        this.productosAgregados = r
        console.log("que ped", r)
      },
      error: error =>{
        this.loading = false
        console.log(error)
      }
    })
  }

  agregarNuevoProducto() {
    this.loading = true
    this.dialog.open(AgregarProductoComponent, {}).afterClosed().subscribe((res) => {
      this.loading = false
      if (res === true) {
        this.loadData();
        this.toastService.success("Producto agregado exitosamente")
      }
    });
  }

  irEditarInformacionGeneral(nombreProducto: string){
    this.loading = true
    this.dialog.open(EditarInformacionGeneralComponent, {data: nombreProducto}).afterClosed().subscribe((res) => {
      this.loading = false
      if (res === true) {
        this.loadData();
        this.toastService.success("Descripción general editada exitosamente")
      }
    });
  }

  protected readonly environment = environment;
}

