import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-cambiar-contrasenia',
  templateUrl: './cambiar-contrasenia.component.html',
  styleUrls: ['./cambiar-contrasenia.component.css']
})
export class CambiarContraseniaComponent implements OnInit {
  loading = false

  constructor(
    private dialogRef: MatDialogRef<CambiarContraseniaComponent>
  ) { }

  ngOnInit(): void {
  }

  cambiarContrasenia(){
    this.loading = true
    this.dialogRef.close(true)
  }

  cancelar(){
    this.loading = true
    this.dialogRef.close()
  }

}
