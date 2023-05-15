import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProductosCompra} from "../../../models/producto.model";
import {PaymentService} from "../../../services/payment.service";

@Component({
  selector: 'app-confirmar-pago',
  templateUrl: './confirmar-pago.component.html',
  styleUrls: ['./confirmar-pago.component.css']
})
export class ConfirmarPagoComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ConfirmarPagoComponent>,
    @Inject(MAT_DIALOG_DATA) public productosCompra: ProductosCompra,
    private paymentService: PaymentService,
  ) { }

  ngOnInit(): void {

  }

  confirmarCompra() {
    this.paymentService.confirmar(this.productosCompra.idCompra.toString()).subscribe({
      next: data =>{
        console.log("Pago confirmado")
      }, error: err => {
        console.log(err)
      }
    })
  }

  cancelarCompra() {
    this.paymentService.confirmar(this.productosCompra.idCompra.toString()).subscribe({
      next: data =>{
        console.log("Pago cancelado")
      }, error: err => {
        console.log(err)
      }
    })
  }

}