import { Component, OnInit } from '@angular/core';
import {AgregarProductoComponent} from "../agregar-producto/agregar-producto.component";
import {MatDialog} from "@angular/material/dialog";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css']
})
export class GestionComponent implements OnInit {

  loading = false

  constructor(private dialog: MatDialog, private toastService:ToastrService,) { }

  ngOnInit(): void {
    this.loadData()
  }

  loadData(){

  }

  agregarNuevoProducto() {
    this.loading = true
    this.dialog.open(AgregarProductoComponent, {

    }).afterClosed().subscribe((res) => {
      this.loading = false
      if (res === true) {
        this.loadData();
        this.toastService.success("Producto agregado exitosamente")
      }
    });
  }

}
