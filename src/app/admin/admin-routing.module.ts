import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import {InicioComponent} from "./components/inicio/inicio.component";




const routes: Routes = [
  {
    path: "",
    component: InicioComponent,
    children: [
      {
        path: "",
        loadChildren:()=>import('./modules/menu-inicio/menu-inicio.module').then(m=>m.MenuInicioModule)
      },
      {
        path: "gestionar-productos",
        loadChildren:()=>import('./modules/gestion-productos/gestion-productos.module').then(m=>m.GestionProductosModule)
      },
      {
        path: "ventas-pedidos",
        loadChildren:()=>import('./modules/ventas-pedidos/ventas-pedidos.module').then(m=>m.VentasPedidosModule)
      },
      {
        path: "estadisticas",
        loadChildren:()=>import('./modules/estadisticas/estadisticas.module').then(m=>m.EstadisticasModule)
      },
      {
        path: "reporte-general",
        loadChildren:()=>import('./modules/reporte-general/reporte-general.module').then(m=>m.ReporteGeneralModule)
      },
    ]
  },
  {
    path: "**", redirectTo:''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
