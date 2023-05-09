import { Component, OnInit, Input, OnChanges, ElementRef, HostListener, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from 'src/app/models/user.model';
import {Router} from "@angular/router";
import {ToastrService} from "ngx-toastr";
import { ProductosService } from 'src/app/services/productos.service';
import { Categoria, Producto } from 'src/app/models/producto.model';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnChanges{

  constructor(
    private elementRef: ElementRef,
    private authService: AuthService,
    private router: Router,
    private usuarioService:UsuarioService,
    private productoService:ProductosService,
    private toast:ToastrService
  ) { }

  @Input() user!:User;
  @ViewChild('xd') xd!: ElementRef;

  public auth!:boolean;
  showSearchInput = false;
  textoBuscado:string = ''; 
  productoSeleccionado!:Producto;
  indexProductoSeleccionado:number=-1; 
  isHover:boolean = false; 
  haveMouse:boolean = true;
  usuario!:User;
  
  showSubMenu:boolean = false; 

  productos:Producto[]=[];

  categoria_hombre:Categoria[] =[]; 
  categoria_mujer:Categoria[] =[]; 


  ngOnInit(): void {
    //this.auth = this.user?.email ? true : false;
    this.authService._isAuth.subscribe(v =>{
      this.auth=v;
      this.usuarioService.getUserByUsername(this.authService.usuario.username).subscribe((resp:any)=>{
        this.user = resp.usuario as User;
      })
      this.authService.usuariochange.subscribe(resp=>{
        this.usuarioService.getUserByUsername(this.authService.usuario.username).subscribe((resp:any)=>{
          this.user = resp.usuario as User;
        })
      })
      //this.user = this.authService.usuario;

    }); 

    this.productoService.getCategoriaBySexo("Hombre").subscribe(resp=>{
      this.categoria_hombre = resp; 
      console.log(this.categoria_hombre)
    }); 
    this.productoService.getCategoriaBySexo("Mujer").subscribe(resp=>{
      this.categoria_mujer = resp; 
    }); 

  }
  ngOnChanges() {

    
  }


  logout(){
    this.auth=false;
  }
  login(){
    this.auth=true;
  }

  irCarritoCompras(){
    if (this.auth){
      this.router.navigate(['user/carrito-compras'])

    }
    else{
      this.toast.warning("Debes iniciar sesion");
      this.router.navigate(['auth/iniciar-sesion'])
    }
  }

  buscarProducto(event:any){
    
    if(this.textoBuscado!=""){
      if(event.keyCode==13){
        this.redirigir(this.productos[this.indexProductoSeleccionado].nombre!)
      }else{
        this.productoService.getProductoByNombre(this.textoBuscado).subscribe(resp=>{
          this.productos = resp; 
        })
      }
      
    }
    
  }
  seleccionarProducto(evento:any) {

   

    if (evento.keyCode === 38) {
      // Flecha hacia arriba
      if(this.indexProductoSeleccionado<=0){
        this.indexProductoSeleccionado = this.productos.length-1; 
      }else{
        this.indexProductoSeleccionado-=1;
      }
     
      //&& this.productos.indexOf(this.productoSeleccionado) < this.productos.length - 1
    } else if (evento.keyCode === 40 ) {
      // Flecha hacia abajo
      if(this.indexProductoSeleccionado<0){
        this.indexProductoSeleccionado = 0; 
      }
      else if(this.indexProductoSeleccionado>=this.productos.length-1){
        this.indexProductoSeleccionado = 0;
      }else{
        this.indexProductoSeleccionado+=1;
    
      }
      
    }
  }
  seleccionarMouse(event:any,index:number){

    this.indexProductoSeleccionado=index; 
  }


  redirigir(nombreProducto:string){
    this.showSearchInput = false;
    this.showSubMenu = false;
    this.textoBuscado ='';
    this.router.navigate(['/listado'],{queryParams:{producto:nombreProducto} });
  }


  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const clickedInside = this.elementRef.nativeElement.contains(target);
    //const clickedInside = this.xd.nativeElement.contains(target)
    if (!clickedInside) {
      this.showSearchInput = false;
      this.showSubMenu = false;
    }



  }


  
  
  @HostListener('document:keydown.escape')
  onEscapeKeyDown() {
    this.showSubMenu = false; 
    this.showSearchInput = false;
  }

}
