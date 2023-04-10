import { Component, OnInit } from '@angular/core';
import { zip } from 'rxjs';
import {Router} from "@angular/router";
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  usuario: Usuario  = {
    id: '',
    correo: "",
    nombre: "",

  }

  isDatoCompletos:boolean = false

  constructor(
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.loadData()
  }

  loadData(){
    //this.usuario = usuarioMock1
    this.usuario = usuarioMock2
    const numAtributos = Object.keys(this.usuario).length
    if (numAtributos > 3){
      this.isDatoCompletos = true
    }
  }

  irCompletarPerfil(){
    this.router.navigate(['completar-perfil'])
  }

}

interface Usuario{
  id: string;
  correo: string;
  nombre: string;
  edad?: number;
  sexo?: string;
  altura?: number;
  tallaSuperior?: string;
  tallaInferior?: string;
}

const usuarioMock1 : Usuario = {
  id: 'JuanGL',
  correo: "juan_garcia@gmail.com",
  nombre: "Juan Garcia",
  edad: 18,
  sexo: "Masculino",
  altura: 170,
  tallaSuperior: 'M',
  tallaInferior: '32'
}
const usuarioMock2 : Usuario = {
  id: 'JuanGL',
  correo: "juan_garcia@gmail.com",
  nombre: "Juan Garcia",

}

