import { Bolsa, Color, DetalleProducto, Talla } from "./producto.model";

export interface Sexo{
    id:number;
    sexo:string;
}
export class User {
    id!:number;
    username!:    string;
    enabled!:     boolean;
    active!:      boolean;
    bolsa?:       Bolsa[];
    compras?:     any[]; //TODO
    nombre!:      string;
    apellido!:    string;
    email!:       string;
    password!:    string;
    token!:       string;
   /*  roles!:Role[] */
    roles!:       string[];
}





export interface Role{
    id:number,
    nombre:string,
}



export interface DiaSemana{
    id:number;
    dia:string;
}




export interface Perfil {
    id?:             number;
    usuario?:        User;
    sexo?:           Sexo;
    foto?:           string;
    edad?:           number;
    altura?:         number;
    talla_camisa?:   number;
    talla_pantalon?: number;
    fecha_nacimiento: Date;
    direcciones?:    Direcciones[];
}

export interface Direcciones {
    cp?:number,
    colonia?:string;
    municipio?:string;
    num_int?:number;
    num_ext?:number;
    estado?: string;
    calle?: string;

}

