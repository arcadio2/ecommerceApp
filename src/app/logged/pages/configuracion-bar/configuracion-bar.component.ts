import { Component, OnInit } from '@angular/core';
import {User} from "../../../models/user.model";
import {UsuarioService} from "../../../services/usuario.service";
import {AuthService} from "../../../auth/services/auth.service";

@Component({
  selector: 'app-configuracion-bar',
  templateUrl: './configuracion-bar.component.html',
  styleUrls: ['./configuracion-bar.component.css']
})
export class ConfiguracionBarComponent implements OnInit {
  usuario: User | undefined;
  constructor(
    private usuarioService:UsuarioService,
    private authService:AuthService,
  ) { }

  ngOnInit(): void {
    this.usuarioService.getUserByUsername(this.authService.usuario.username).subscribe((resp:any)=>{
      this.usuario = resp.usuario as User;
    })
  }

}
