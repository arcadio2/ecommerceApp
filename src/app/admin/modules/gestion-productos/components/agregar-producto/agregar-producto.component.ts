import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.css']
})
export class AgregarProductoComponent implements OnInit {
  loading = false

  constructor(
    private dialogRef: MatDialogRef<AgregarProductoComponent>
  ) { }

  ngOnInit(): void {
  }

  registrarNuevoProducto() {
    this.loading = true;

    this.dialogRef.close(true);

    this.loading = false;
  }
  cancelar() {
    this.loading = true;

    this.dialogRef.close(false);

    this.loading = false;
  }

}
