import { Component, OnInit } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AgregarDireccionComponent} from "../agregar-direccion/agregar-direccion.component";
import {ToastrService} from "ngx-toastr";
import {EditarDireccionComponent} from "../editar-direccion/editar-direccion.component";

@Component({
  selector: 'app-gestionar-pedidos',
  templateUrl: './gestionar-directorio.component.html',
  styleUrls: ['./gestionar-directorio.component.css']
})
export class GestionarDirectorioComponent implements OnInit {
  loading = false

  constructor(
    private dialog: MatDialog,
    private toastService:ToastrService
  ) { }

  ngOnInit(): void {
    this.loadData()
  }

  loadData(){

  }

  agregarNuevaDireccion(){
    this.loading = true
    const dialogRef = this.dialog.open(AgregarDireccionComponent, {
    }).afterClosed().subscribe((res) => {
      this.loading = false
      if (res === true) {
        this.loadData();
        this.toastService.success("Dirección agregada exitosamente")
      }
    });
  }
  editarDireccion(){
    this.loading = true
    const dialogRef = this.dialog.open(EditarDireccionComponent, {
    }).afterClosed().subscribe((res) => {
      this.loading = false
      if (res === true) {
        this.loadData();
        this.toastService.success("Dirección editada exitosamente")
      }
    });
  }

}
