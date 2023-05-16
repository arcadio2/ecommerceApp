import { DetalleProducto } from "./producto.model";
import { Direcciones } from "./user.model";

export interface Usuario {
    Id: number;
    usuario: Usuario;
    detalle_producto: DetalleProducto;
    codigo_seguimiento: string;
    fecha_compra: Date;
    direccion: Direcciones;
  }

  