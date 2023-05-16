import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";
import {CrearComentarioComponent} from "../../../shared/pages/crear-comentario/crear-comentario.component";
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "../../../auth/services/auth.service";
import {ToastrService} from "ngx-toastr";
import {Bolsa, DetalleDto, PaymentIntentDto, ProductosCompra} from "../../../models/producto.model";
import {ConfirmarPagoComponent} from "../confirmar-pago/confirmar-pago.component";
import {PaymentService} from "../../../services/payment.service";
import {StripeCardComponent, StripeService} from "ngx-stripe";
import {StripeCardElementOptions, StripeElementsOptions} from "@stripe/stripe-js";
import {Direcciones} from "../../../models/user.model";
import { ComprasService } from 'src/app/services/compras.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirmar-compra',
  templateUrl: './confirmar-compra.component.html',
  styleUrls: ['./confirmar-compra.component.css'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
})
export class ConfirmarCompraComponent implements OnInit, AfterViewInit {

  isLinear = false;
  direccionForm = this.createDireccionForm();
  facturacionForm = this.createFacturacionForm()
  productos:DetalleDto[]=[]; 
  bolsa:Bolsa[]=[]; 
  loading = false

  productosCompra?: ProductosCompra
  precioTotal?: number = 1000; 

  direccion!:Direcciones; 

  error: any
  errorDomicilio: boolean = false

  @ViewChild(StripeCardComponent) card?: StripeCardComponent;

  cardOptions: StripeCardElementOptions = {
    style: {
      base: {
        iconColor: '#000000',
        color: '#000000',
        fontWeight: '300',
        fontFamily: '"Be_Vietnam_Pro", sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        },

      }
    }
  };

  elementsOptions: StripeElementsOptions = {
    locale: 'es'
  };

  constructor(
    private _formBuilder: FormBuilder,
    private dialog: MatDialog,
    private router:Router,
    private comprasService:ComprasService,
    private toastService:ToastrService,
    private paymentService: PaymentService,
    private stripeService: StripeService
  ) {

  }

  ngOnInit(): void {
    this.productos  = this.comprasService.productos; 
    this.bolsa = this.comprasService.bolsa; 
    console.log("A comprar",this.bolsa);
    if(this.productos.length==0){
      this.router.navigateByUrl('/listado?genero=hombre&categoria=Ver%20todo')
    }
    window.scrollTo(0, 0);
  }

  ngAfterViewInit(): void {
    window.scrollTo(0, 0);
  }

  loadData(){

  }

  createDireccionForm() {
    return new FormGroup({
      estado: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required]
      }),
      municipio: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required]
      }),
      colonia: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required]
      }),
      codigoPostal: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required]
      }),
      calle: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required]
      }),
      numExt: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required]
      }),
      numInt: new FormControl('', {
        nonNullable: true,
        validators: []
      }),

    })
  }
  createFacturacionForm() {
    return new FormGroup({
      nombreTitular: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required]
      })/*,
      noTarjeta: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required]
      }),
      vencimiento: new FormControl( '', {
        nonNullable: true,
        validators: [Validators.required]
      }),
      cvv: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required]
      })*/
    })
  }

  irConfirmarPago(idCompra: string) {
    this.loading = true
    this.dialog.open(ConfirmarPagoComponent, {
      data: idCompra
    }).afterClosed().subscribe((res) => {
      this.loading = false
      if (res === true) {
        this.loadData()
        this.toastService.success("Pago correcto")
      }
    });
  }

  guardarDireccion(){
    this.loading = true
    this.direccionForm.markAllAsTouched()
    if (this.direccionForm.valid){
      this.errorDomicilio =false
      const direccionUsuario: Direcciones ={
        calle: this.direccionForm.controls.calle.value,
        estado: this.direccionForm.controls.estado.value,
        municipio: this.direccionForm.controls.municipio.value,
        colonia: this.direccionForm.controls.colonia.value,
        num_ext: parseInt(this.direccionForm.controls.numExt.value),
        num_int: parseInt(this.direccionForm.controls.numInt.value),
        cp: parseInt(this.direccionForm.controls.codigoPostal.value)
      }
      this.direccion = direccionUsuario; 
      console.log(direccionUsuario)
      this.loading =false
    }
    else{
      this.errorDomicilio = true
      this.loading = false
    }
  }

  comprar(): void {
    if (this.direccionForm.valid) {

      const name = this.facturacionForm.controls.nombreTitular.value;
      console.log("nombre", name)
      this.stripeService
        .createToken(this.card!.element, { name })
        .subscribe((result) => {
          if (result.token) {
            // Use the token
            console.log(result.token.id);


            const paymentIntentDto: PaymentIntentDto = {
              token: result.token.id,
              amount: this.precioTotal!,
              currency: 'MXN',
              descripcion: "playera verde, playera roja"
            };
            console.log("objeto", paymentIntentDto)

            this.paymentService.pagar(paymentIntentDto).subscribe({
              next:( data:any) =>{
                console.log(data)
                console.log("id",data.id)
                this.irConfirmarPago(data.id)
              }, error: err => {
                console.log("hubo un error", err)
              }
            });

            this.error = undefined
          } else if (result.error) {
            // Error creating the token
            this.error = result.error.message;
          }
        });
    }
  }

  cantidadProductos(precio:number,cantidad:number){
    return cantidad*precio; 
  }

  calcularTotal(){
    let total = 0; 
    this.bolsa.forEach((c,index)=>{
      total+= c.cantidad! * this.productos[index].producto?.precio!; 
    })
    return total;
  }

}


