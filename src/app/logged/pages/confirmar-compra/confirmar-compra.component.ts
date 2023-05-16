import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";
import {CrearComentarioComponent} from "../../../shared/pages/crear-comentario/crear-comentario.component";
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "../../../auth/services/auth.service";
import {ToastrService} from "ngx-toastr";
import {PaymentIntentDto, ProductosCompra} from "../../../models/producto.model";
import {ConfirmarPagoComponent} from "../confirmar-pago/confirmar-pago.component";
import {PaymentService} from "../../../services/payment.service";
import {StripeCardComponent, StripeService} from "ngx-stripe";
import {StripeCardElementOptions, StripeElementsOptions} from "@stripe/stripe-js";
import {Direcciones} from "../../../models/user.model";

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

  loading = false

  productosCompra?: ProductosCompra
  precioTotal?: number = 1000

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
    private toastService:ToastrService,
    private paymentService: PaymentService,
    private stripeService: StripeService
  ) {

  }

  ngOnInit(): void {
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
        delegacion: this.direccionForm.controls.municipio.value,
        colonia: this.direccionForm.controls.colonia.value,
        num_ext: parseInt(this.direccionForm.controls.numExt.value),
        num_int: parseInt(this.direccionForm.controls.numInt.value),
        cp: parseInt(this.direccionForm.controls.codigoPostal.value)
      }
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

}


