import { User } from "./user.model";

export interface Producto {
    nombre?:           string;
    descripcion?:      string;
    precio?:           number;
    valoracion_total?: number;
    detalle?:          DetalleProducto[];
    categoria?:        Categoria;
    comentarios?:      Comentario[];
    id?:               number;
}

export interface Categoria {
    id?:   number;
    tipo?: string;
}

export interface Comentario {
    usuario?:    User;
    username?:   string;
    comentario?: string;
    valoracion?: number;
    id?:         number;
}



export interface DetalleProducto {
    color?: Color;
    stock?: number;
    talla?: Talla | null;
    id?:    number;
}

export interface Color {
    color?: string;
    id?:    number;
}

export interface Talla {
    talla?: string;
    id?:    number;
}
