import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexAdminComponent } from './pages/index-admin/index-admin.component';

const routes: Routes = [
  {
    path:'',
    component:IndexAdminComponent,
    children:[
      /* {
        path:'',
        component:
      } */
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
