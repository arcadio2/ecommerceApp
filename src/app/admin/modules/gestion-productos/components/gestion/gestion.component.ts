import {Component, OnInit} from '@angular/core';
import {AgregarProductoComponent} from "../agregar-producto/agregar-producto.component";
import {MatDialog} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";
import {ProductosService} from "../../../../../services/productos.service";
import {DetalleProducto, Producto} from "../../../../../models/producto.model";
import {environment} from "../../../../../../environments/environment";
import {EditarInformacionGeneralComponent} from "../editar-informacion-general/editar-informacion-general.component";
import { ProductosAdminService } from 'src/app/admin/services/productos-admin.service';
import { DialogComponentComponent } from 'src/app/shared/components/dialog-component/dialog-component.component';
import { AgregarDetalleComponent } from '../agregar-detalle/agregar-detalle.component';

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
  agregarNuevoSub(product:Producto) {
    this.loading = true
    this.dialog.open(AgregarDetalleComponent, {data: product}).afterClosed().subscribe((res) => {
      this.loading = false
      if (res === true) {
        this.loadData();
        this.toastService.success("Producto agregado exitosamente")
      }
    });
  }

  disminuir(subProducto:DetalleProducto){
    const stock = subProducto.stock;
    if((stock!) >1){
      subProducto.stock!-=1; 
      this.productoAdminService.editDetalleProducto(subProducto).subscribe(resp=>{
        
      })
    }
  }
  aumentar(subProducto:DetalleProducto){
    subProducto.stock!+=1; 
    this.productoAdminService.editDetalleProducto(subProducto).subscribe(resp=>{
        
    })
  }

  irEditarInformacionGeneral(product: Producto){
    this.loading = true
    this.dialog.open(EditarInformacionGeneralComponent, {data: product}).afterClosed().subscribe((res) => {
      this.loading = false
      if (res === true) {
        this.loadData();
        this.toastService.success("Descripción general editada exitosamente")
      }
    });
  }

  eliminar(producto:Producto) {
    this.loading = true

    const dialogRef = this.dialog.open(DialogComponentComponent, {
      width: '30%',
      data: '¿Está seguro que desea eliminar este elemento?'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loading = false
      if (result === 'yes') {
       this.eliminarProducto(producto);
      } else {
        console.log('Operación de eliminación cancelada.');
      }
    });
  }

  eliminarProducto(producto:Producto){
    this.productoAdminService.eliminarProducto(producto.nombre!).subscribe(resp=>{
      const indice_elemento =this.productosAgregados.indexOf(producto);
      this.productosAgregados.splice(indice_elemento, 1);
      this.toastService.info("Se ha eliminado el producto")
    })
  }

  eliminarDetalle(detalle:DetalleProducto){
    this.loading = true

    const dialogRef = this.dialog.open(DialogComponentComponent, {
      width: '30%',
      data: '¿Está seguro que desea eliminar este elemento?'
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loading = false
      if (result === 'yes') {
       this.eliminarSub(detalle);
      } else {
        console.log('Operación de eliminación cancelada.');
      }
    });
  }

  eliminarSub(detalle:DetalleProducto){
    this.productoAdminService.eliminarDetalle(detalle.id!).subscribe(resp=>{
      this.toastService.info("Se ha eliminado el sub producto")
    })
  }

  protected readonly environment = environment;
}

