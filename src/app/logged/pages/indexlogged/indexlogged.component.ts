import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Producto } from 'src/app/models/producto.model';
import { User } from 'src/app/models/user.model';
import { ProductosService } from 'src/app/services/productos.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-indexlogged',
  templateUrl: './indexlogged.component.html',
  styleUrls: ['./indexlogged.component.css']
})
export class IndexloggedComponent implements OnInit {

  public usuario!:User; 


  constructor(private authService:AuthService,
    private productoService:ProductosService) { }

  ngOnInit(): void {
   
  }

}
