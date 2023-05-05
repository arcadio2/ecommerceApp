import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-admin-bar',
  templateUrl: './admin-bar.component.html',
  styleUrls: ['./admin-bar.component.css']
})
export class AdminBarComponent implements OnInit {

  moduloAdmin: ModulosAdmin = ModulosAdmin.inicio

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  seleccionarModuloAdmin(idTipo: number){
    if (idTipo === 0){
      this.moduloAdmin = ModulosAdmin.inicio
    }
    else if(idTipo === 1){
      this.moduloAdmin = ModulosAdmin.ventasPedidos
    }
    else if (idTipo === 2){
      this.moduloAdmin = ModulosAdmin.gestionProductos
    }
    else if (idTipo === 3)
      this.moduloAdmin = ModulosAdmin.estadisticas
    else if (idTipo === 4)
      this.moduloAdmin = ModulosAdmin.reporteGeneral
  }

}

enum ModulosAdmin {
  inicio = 0, ventasPedidos=1, gestionProductos=2, estadisticas=3, reporteGeneral=4
}
