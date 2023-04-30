import { Component, OnInit } from '@angular/core';
import {User} from "../../../../../../models/user.model";
import {UsuarioService} from "../../../../../../services/usuario.service";
import {AuthService} from "../../../../../../auth/services/auth.service";

@Component({
  selector: 'app-configuracion-bar',
  templateUrl: './configuracion-bar.component.html',
  styleUrls: ['./configuracion-bar.component.css']
})
export class ConfiguracionBarComponent implements OnInit {
  usuario: User | undefined;
  tipoConfiguracion: TipoConfiguracion = TipoConfiguracion.detalles

  constructor(
    private usuarioService:UsuarioService,
    private authService:AuthService,
  ) { }

  ngOnInit(): void {
    this.usuarioService.getUserByUsername(this.authService.usuario.username).subscribe((resp:any)=>{
      this.usuario = resp.usuario as User;
    })
  }

  seleccionarTipoConfiguracion(idTipo: number){
    if(idTipo === 0)
      this.tipoConfiguracion = TipoConfiguracion.detalles
    else if (idTipo === 1)
      this.tipoConfiguracion = TipoConfiguracion.directorio
    else if (idTipo === 2)
      this.tipoConfiguracion = TipoConfiguracion.pedidos
    else if (idTipo === 3)
      this.tipoConfiguracion = TipoConfiguracion.atencion
  }

}

enum TipoConfiguracion {
  detalles=0, directorio=1, pedidos=2, atencion=3
}
