import { Component, OnInit,OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Bolsa, Color, DetalleDto, DetalleProducto, Producto, Talla } from 'src/app/models/producto.model';
import { User } from 'src/app/models/user.model';
import { BolsaService } from 'src/app/services/bolsa.service';
import { DetalleService } from 'src/app/services/detalle.service';
import { ImagenesService } from 'src/app/services/imagenes.service';
import { ProductosService } from 'src/app/services/productos.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import {
  AgregarProductoComponent
} from "../../../admin/modules/gestion-productos/components/agregar-producto/agregar-producto.component";
import {MatDialog} from "@angular/material/dialog";
import {VisualizarComentariosComponent} from "../visualizar-comentarios/visualizar-comentarios.component";
@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit,OnChanges {

  usuario!:User;
  colorSelected!:Color;
  tallaSelected!:Talla;
  idProducto!:number;
  colorProducto!:string;
  tallaProducto!:string;
  producto!:Producto | undefined;
  isAuth:boolean=false;
  productoMostrado!:DetalleDto | undefined;
  imagenes:string[]=[];
  url_backend:string =  environment.urlBase;
  cantidad:number=1;


  detalle_colores_disponibles:DetalleProducto[] | undefined=[];
  detalle_tallas_disponibles:DetalleProducto[] | undefined=[];
  tallas_disponibles:(Talla| undefined)[] = [];

  inBolsa: boolean = false;
  cambiaEstado:boolean = false;
  textoCarrito: string = "Agregar al carrito";
  loading = false
  //inBolsaS = new BehaviorSubject <boolean>(false);


  constructor(private route: ActivatedRoute,
              private toastService: ToastrService,
              private usuarioService:UsuarioService,
              private authService:AuthService,
              private router:Router,
              private imagenesService:ImagenesService,
              private bolsaService:BolsaService,
              private dialog: MatDialog,

              private detalleService:DetalleService,
              private productoService:ProductosService
              ) { }



  ngOnInit(): void {

    this.route.paramMap.subscribe(params=>{
      this.cambiaEstado = false;
      this.idProducto = parseInt(params.get('id')!);

      this.colorProducto = params.get('color')!;
      this.tallaProducto = params.get('talla')!;

     this.textoCarrito = "Agregar al carrito";
     this.inBolsa = false;

      this.buscarProducto();
      this.tallas_disponibles = [];
      this.cantidad=1;

    });
    if(this.authService.usuario.username){
      this.usuarioService.getUserByUsername(this.authService.usuario!.username).subscribe((resp:any)=>{
        this.usuario = resp.usuario as User;
        this.isAuth = true;



      });
    }
  }

  ngOnChanges(): void {

    /* this.tallas_disponibles = [];
    this.buscarProducto(); */
  }


  agregarCarrito(){
    if(this.isAuth){
      //Función para agregar al carrito
      if(!this.isInBolsa()){

        const  detalle:DetalleProducto = this.productoMostrado as DetalleProducto;
        detalle.nombre_producto = this.productoMostrado?.producto?.nombre;

        let carrito:Bolsa = {
          detalle_producto:detalle,
          cantidad:this.cantidad
        }
        this.bolsaService.guardarCarrito(carrito).subscribe(resp=>{
          console.log(resp)
          this.router.navigateByUrl("/user/carrito-compras")
        })
        this.toastService.success("Producto agregado correctamente")

       
        this.inBolsa = true;
        this.cambiaEstado = true;
        //window.location.reload();
        //this.inBolsaS.next(true);
      }else{
        this.textoCarrito = "Agregar al carrito"
        this.inBolsa = false;
        //this.bolsaService.eliminarCarrito.
      }


    }else{
      this.toastService.warning("Debes iniciar sesión");
    }
  }

  isInBolsa(){
    if(!this.isAuth){

      return false;
    }
    let bandera = false;

    this.usuario.bolsa?.forEach(elemento=>{
      if(elemento.detalle_producto?.id==this.productoMostrado!.id){
        bandera = true;


        //this.textoCarrito = "En el carrito";


      }
    })

    return bandera;
  }

/*   obtener(){
    this.inBolsaS.subscribe(resp=>{
      this.inBolsa = resp;
    })
  } */


  buscarProducto(){
    this.productoService.getDetalleProdcutoCompra(this.idProducto,this.colorProducto,this.tallaProducto).subscribe(resp=>{

      //this.producto = resp.producto;
      this.productoMostrado = resp.detalle;
      this.producto = this.productoMostrado!.producto! || null;

      this.detalle_colores_disponibles = this.producto?.detalle!.reduce((acumulador: DetalleProducto[], detalle: DetalleProducto) => {

        if (detalle.color) {

          if (!acumulador.some(det => det.color?.color === detalle.color?.color)) {

            acumulador.push(detalle);
          }
        }
        // Devolvemos el acumulador en cada iteración
        return acumulador;
      }, []);

      this.producto.detalle!.forEach(resp=>{
        if(resp.color?.color==this.colorProducto){
          this.tallas_disponibles.push(resp.talla!) ;
        }
      })
      const dataArr = new Set(this.tallas_disponibles);

      this.tallas_disponibles = [...dataArr];



      if(!this.productoMostrado){

      }

     //this.inBolsaS.next(this.isInBolsa());

      this.imagenesService.obtenerImagenes(this.producto?.nombre!,this.productoMostrado?.color?.color!).subscribe(img=>{

        this.imagenes = img.rutas;
      },err=>{
        this.toastService.error("No se han encontrado las imagenes");
      })

    },err=>{
      if(err.status==404){
        this.toastService.error("No existe el proucto")
        window.history.back();

      }else{
        this.toastService.error("Ha ocurrido un error");
        window.history.back();
      }

    })
  }

  cambiarColor(color:string){
    console.log(color)
    let talla:string | undefined = this.tallaProducto;

    this.producto?.detalle!.forEach(resp=>{
      if(resp.color?.color==color){
        talla = resp.talla?.talla;

      }
    })

    this.router.navigate(['producto',this.producto?.id,color,talla])

  }
  cambiarTalla(talla:string){

    let color:string | undefined = this.colorProducto;

    this.producto?.detalle!.forEach(resp=>{
      if(resp.talla?.talla==talla){
        color = resp.color?.color;

      }
    })

    this.router.navigate(['producto',this.producto?.id,color,talla])

  }
  reducir(){
    if(this.cantidad>1){
      this.cantidad-=1;
    }
  }

  aumentar(){
    if(this.cantidad<this.productoMostrado?.stock!){
      this.cantidad+=1;
    }
    else {
      this.toastService.warning("No hay mas stock disponible")
    }
  }

  existeTalla(talla:string){
    let existe:boolean=false;
    this.detalle_tallas_disponibles?.forEach(resp=>{
      if(resp.color?.color==this.colorProducto){
        console.log(resp.color.color)
         existe = true;
      }
    })
    return existe;
  }

  verComentarios() {
    this.loading = true
    this.dialog.open(VisualizarComentariosComponent, {
      width: '80%',
      data:this.productoMostrado?.producto!,
      hasBackdrop: true
    }).afterClosed().subscribe((res) => {
      this.loading = false
      if (res === true) {
      }
    });
  }

}


