import { Component, OnInit,OnChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Color, DetalleDto, DetalleProducto, Producto, Talla } from 'src/app/models/producto.model';
import { User } from 'src/app/models/user.model';
import { DetalleService } from 'src/app/services/detalle.service';
import { ImagenesService } from 'src/app/services/imagenes.service';
import { ProductosService } from 'src/app/services/productos.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

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

  
  detalle_colores_disponibles:DetalleProducto[] | undefined=[]; 
  detalle_tallas_disponibles:DetalleProducto[] | undefined=[]; 
  tallas_disponibles:Talla[] = []; 


  constructor(private route: ActivatedRoute,
              private toastService: ToastrService,
              private usuarioService:UsuarioService,
              private authService:AuthService,
              private router:Router,
              private imagenesService:ImagenesService,
           
              private detalleService:DetalleService,
              private productoService:ProductosService
              ) { }

  

  ngOnInit(): void {
    
    this.route.paramMap.subscribe(params=>{
      this.idProducto = parseInt(params.get('id')!);

      this.colorProducto = params.get('color')!;
      this.tallaProducto = params.get('talla')!;
      this.buscarProducto(); 
    
    });
    if(this.authService.usuario.username){
      this.usuarioService.getUserByUsername(this.authService.usuario!.username).subscribe((resp:any)=>{
        this.usuario = resp.usuario as User; 
        this.isAuth = true; 
        
       
        
      }); 
    }
  }


  agregarCarrito(){
    if(this.isAuth){
      //Función para agregar al carrito 

    }else{
      this.toastService.warning("Debes iniciar sesión"); 
    }
  }

  isInBolsa(){
    if(!this.isAuth){
      return false; 
    }

    let inBolsa = false; 

    this.usuario.bolsa?.forEach(elemento=>{
      if(elemento.detalle_producto?.id==this.productoMostrado!.id){
        inBolsa = true;
        
      }
    })

    return inBolsa; 
  }


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
      this.detalle_tallas_disponibles = this.producto?.detalle!.reduce((acumulador: DetalleProducto[], detalle: DetalleProducto) => {
   
        if (detalle.talla) {
          
          if (!acumulador.some(det => det.talla?.talla === detalle.talla?.talla)) {
            
            acumulador.push(detalle);
          }
        }
        // Devolvemos el acumulador en cada iteración
        return acumulador;
      }, []);

     /*  this.producto.detalle?.forEach(detalle=>{

        if(detalle.color?.color==this.colorProducto){
          this.detalle_tallas_disponibles?.push(detalle)
        }
      })

      this.producto.detalle?.forEach(detalle=>{

        if(detalle.talla?.talla==this.tallaProducto){
          this.detalle_colores_disponibles?.push(detalle)
        }
      }) */
  
      if(!this.productoMostrado){
        
      }

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
        this.toastService.error("No existe el proucto 2")
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
  

}


