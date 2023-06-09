import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {PaymentService} from "../../../services/payment.service";
import {Compra} from "../../../models/compras.model";
import {ComprasService} from "../../../services/compras.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-confirmar-pago',
  templateUrl: './confirmar-pago.component.html',
  styleUrls: ['./confirmar-pago.component.css']
})
export class ConfirmarPagoComponent implements OnInit {

  idCompra = this.data.idCompraPayment
  loading = false

  constructor(
    public dialogRef: MatDialogRef<ConfirmarPagoComponent>,
    /*@Inject(MAT_DIALOG_DATA) public productosCompra: ProductosCompra,*/
    @Inject(MAT_DIALOG_DATA) public data: { compras: Compra[], idCompraPayment: string },
    private paymentService: PaymentService,
    private comprasService: ComprasService,
    private router: Router
  ) {
  }

  ngOnInit(): void {

  }

  confirmarCompra() {
    this.loading = true
    this.paymentService.confirmar(this.idCompra).subscribe((resp) => {

      this.comprasService.crearListaCompras(this.data.compras).subscribe((resp: any) => {
        this.loading = false
        this.dialogRef.close(true)
        this.router.navigate(['user/configuracion-usuario/gestion-pedidos'])
      }, error => {
        this.loading = false
        this.dialogRef.close(false)
      })

    }, _ => {
      this.loading = false
      this.dialogRef.close(false)
    })
  }

  cancelarCompra() {
    this.loading = true
    this.paymentService.confirmar(this.idCompra).subscribe({
      next: data => {
        this.loading = false
        this.dialogRef.close(false)
      }, error: err => {
        this.loading = false
        this.dialogRef.close(false)
      }
    })
  }

}
