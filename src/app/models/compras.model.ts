import { DetalleProducto } from "./producto.model";
import {Direcciones, User} from "./user.model";

export interface Compra {
    Id: number;
    usuario: User;
    detalle_producto: DetalleProducto;
    codigo_seguimiento: string;
    fecha_compra: Date;
    direccion: Direcciones;
  }

