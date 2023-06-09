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
    hombre?:           boolean;
}


export interface Categoria {
    id?:   number;
    tipo?: string;
    hombre?: boolean;
    mujer?: boolean;
    tronco_superior?: boolean
}

export interface Comentario {
    usuario?:    User;
    username?:   string;
    comentario?: string;
    valoracion?: number;
    titulo?:     string;
    id?:         number;
}



export interface DetalleProducto {
    color?: Color;
    stock?: number;
    talla?: Talla | null;
    id?:    number;
    nombre_producto?:string;
    id_producto?:number;
}

export interface Color {
    color?: string;
    id?:    number;
    hexadecimal?: string;
}

export interface Talla {
    talla?: string;
    id?:    number;
    tronco_superior?: boolean
}

export interface Bolsa {
    detalle_producto?: DetalleProducto;
    cantidad?:         number;
    id?:               number;
}


/**
 *
 * Solo para visualización
 *
 */
export interface ProductoCarrito {
    id?: number;
    nombre?: string;
    talla?: string;
    color?: string;
    costo?: number;
    imagen?: string
  }

export  interface ElementoCarrito {
    ropa?: ProductoCarrito;
    cantidad?: number;
  }


  /**SOLO DE VISUALIZACIÓN */
  export interface DetalleDto {
    color?:           Color;
    stock?:           number;
    talla?:           Talla;
    producto?:        Producto;
    nombre_producto?: null | string;
    id?:              number;
  }

  export interface ComentarioProducto{
    comentario:string,
    valoracion:number,
    titulo:string
  }
  export interface PaymentIntentDto{
    token: string;
    descripcion: string;
    amount : number;
    currency: string;
  }

  export interface ProductosCompra {
    idCompra: number,
    productos: ElementoCarrito[]
  }
