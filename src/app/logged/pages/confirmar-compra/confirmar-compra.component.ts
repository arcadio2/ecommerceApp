import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from "@angular/cdk/stepper";
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "../../../auth/services/auth.service";
import {ToastrService} from "ngx-toastr";
import {Bolsa, DetalleDto, PaymentIntentDto, ProductosCompra} from "../../../models/producto.model";
import {ConfirmarPagoComponent} from "../confirmar-pago/confirmar-pago.component";
import {PaymentService} from "../../../services/payment.service";
import {StripeCardComponent, StripeService} from "ngx-stripe";
import {StripeCardElementOptions, StripeElementsOptions} from "@stripe/stripe-js";
import {Direcciones} from "../../../models/user.model";
import {ComprasService} from 'src/app/services/compras.service';
import {Router} from '@angular/router';
import {Compra} from "../../../models/compras.model";

@Component({
  selector: 'app-confirmar-compra',
  templateUrl: './confirmar-compra.component.html',
  styleUrls: ['./confirmar-compra.component.css'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true},
  },],
})
export class ConfirmarCompraComponent implements OnInit, AfterViewInit {

  isLinear = true;
  direccionForm = this.createDireccionForm();
  facturacionForm = this.createFacturacionForm()
  productos: DetalleDto[] = [];
  bolsa: Bolsa[] = [];
  compras: Compra[] = []
  loading = false

  productosCompra?: ProductosCompra
  precioTotal?: number = 1000;

  direccion!: Direcciones;

  error: any
  errorDomicilio: boolean = false
  isErrorFacturacion: boolean = false
  errorFacturacion: string = ''

  municipios?: string[];
  estadoSeleccionado?: string;
  municipioSeleccionado?: string;
  estados: Estado[] = estados

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
    private router: Router,
    private comprasService: ComprasService,
    private toastService: ToastrService,
    private paymentService: PaymentService,
    private stripeService: StripeService,
    private authService: AuthService
  ) {

  }

  ngOnInit(): void {
    this.productos = this.comprasService.productos;
    this.bolsa = this.comprasService.bolsa;
    console.log("A comprar", this.bolsa);
    if (this.productos.length == 0) {
      this.router.navigateByUrl('/listado?genero=hombre&categoria=Ver%20todo')
    }
    window.scrollTo(0, 0);
  }

  ngAfterViewInit(): void {
    window.scrollTo(0, 0);
  }

  loadData() {

  }

  cargarMunicipios(): void {
    const estado = this.estados?.find(e => e.nombre === this.direccionForm.controls.estado.value);
    if (estado) {
      this.municipios = estado.municipios;
    } else {
      this.municipios = [];
    }
  }

  createDireccionForm() {
    return new FormGroup({
      estado: new FormControl('', {
        nonNullable: true, validators: [Validators.required]
      }), municipio: new FormControl('', {
        nonNullable: true, validators: [Validators.required]
      }), colonia: new FormControl('', {
        nonNullable: true, validators: [Validators.required]
      }), codigoPostal: new FormControl('', {
        nonNullable: true, validators: [Validators.required, Validators.pattern('^[0-9]{5}')]
      }), calle: new FormControl('', {
        nonNullable: true, validators: [Validators.required]
      }), numExt: new FormControl('', {
        nonNullable: true, validators: [Validators.required]
      }), numInt: new FormControl('', {
        nonNullable: true, validators: []
      }),

    })
  }

  createFacturacionForm() {
    return new FormGroup({
      nombreTitular: new FormControl('', {
        nonNullable: true, validators: [Validators.required, Validators.pattern('^[a-zA-Z\\sáéíóúÁÉÍÓÚüÜñÑ]+$')]
      })
    })
  }

  irConfirmarPago(compras: Compra[], idCompraPayment: string) {
    console.log(compras)
    this.dialog.open(ConfirmarPagoComponent, {
      data: {compras, idCompraPayment}
    }).afterClosed().subscribe((res) => {
      this.loading = false
      if (res === true) {
        this.loadData()
        this.toastService.success("Pago correcto")
      }
    });
  }

  guardarDireccion() {
    this.loading = true
    this.direccionForm.markAllAsTouched()
    this.direccionForm.disabled

    if (this.direccionForm.valid) {
      this.errorDomicilio = false
      const direccionUsuario: Direcciones = {
        calle: this.direccionForm.controls.calle.value,
        estado: this.direccionForm.controls.estado.value,
        municipio: this.direccionForm.controls.municipio.value,
        colonia: this.direccionForm.controls.colonia.value,
        num_ext: parseInt(this.direccionForm.controls.numExt.value),
        num_int: parseInt(this.direccionForm.controls.numInt.value),
        cp: parseInt(this.direccionForm.controls.codigoPostal.value)
      }
      this.direccion = direccionUsuario;
      this.loading = false
      this.direccionForm.enabled
    } else {
      this.errorDomicilio = true
      this.loading = false
      this.direccionForm.enabled
    }
  }

  confirmarDatosPago() {
    this.facturacionForm.markAllAsTouched()
    if (this.facturacionForm.valid) {

      const name = this.facturacionForm.controls.nombreTitular.value

      this.loading = true
      this.stripeService.createToken(this.card!.element, {name}).subscribe((result) => {
        if (result.error) {
          this.isErrorFacturacion = true
          this.errorFacturacion = result.error.message ?? ''
          this.toastService.error(result.error.message )
        }
        this.loading = false
        this.isErrorFacturacion = false
      }, _ => {
        this.loading = true
      })

    }
  }

  comprar(): void {
    this.direccionForm.markAllAsTouched()
    this.facturacionForm.markAllAsTouched()
    if (this.direccionForm.valid && this.facturacionForm.valid) {

      const name = this.facturacionForm.controls.nombreTitular.value;
      this.loading = true
      this.stripeService.createToken(this.card!.element, {name}).subscribe((result) => {
        if (result.token) {

          let i = 0
          const fechaHoy: Date = new Date();
          let descripcion = ""

          this.bolsa.forEach((c, index) => {
            let compra: Compra = {
              direccion: this.direccion,
              usuario: this.authService.usuario,
              fecha_compra: fechaHoy,
              codigo_seguimiento: result.token.id,
              detalle_producto: c.detalle_producto!,
              cantidad: c.cantidad!,
              active: true,
              precio: this.cantidadProductos(this.productos[i].producto?.precio!, c.cantidad!)
            }
            this.compras?.push(compra)
            descripcion += c.detalle_producto?.nombre_producto + ", "
            i++
          })

          const paymentIntentDto: PaymentIntentDto = {
            token: result.token.id,
            amount: this.precioTotal!,
            currency: 'MXN',
            descripcion: descripcion
          };
          this.loading = true
          this.paymentService.pagar(paymentIntentDto).subscribe({
            next: (data: any) => {
              this.irConfirmarPago(this.compras!, data.id)
              this.loading = false
            }, error: err => {
              this.loading = false
            }
          });

          this.error = undefined
        } else if (result.error) {
          // Error creating the token
          this.error = result.error.message;
          
        }
      }, _ =>{
        this.loading = false
      });
    }
  }

  cantidadProductos(precio: number, cantidad: number) {
    return cantidad * precio;
  }

  calcularTotal() {
    let total = 0;

    this.bolsa.forEach((c, index) => {
      total += c.cantidad! * this.productos[index].producto?.precio!;

    })
    return total;
  }

  irMenuPrincipal(){
    this.router.navigateByUrl('')
  }

}

const estados: Estado[] = [
  { nombre: 'Estado de México', municipios: ['Ecatepec', 'Coacalco', 'Toluca'] },
  { nombre: 'Ciudad de México', municipios: ['Miguel Hidalgo', 'Itztapalapa', 'Xochimilco'] },
  // ... más estados
];

interface Estado {
  nombre: string
  municipios: string[]
}


