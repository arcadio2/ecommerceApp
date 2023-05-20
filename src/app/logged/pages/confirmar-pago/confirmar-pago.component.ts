import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProductosCompra} from "../../../models/producto.model";
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

  constructor(
    public dialogRef: MatDialogRef<ConfirmarPagoComponent>,
    /*@Inject(MAT_DIALOG_DATA) public productosCompra: ProductosCompra,*/
    @Inject(MAT_DIALOG_DATA) public data: {compras: Compra[], idCompraPayment: string},
    private paymentService: PaymentService,
    private comprasService: ComprasService,
    private router: Router
  ) { }

  ngOnInit(): void {

  }

  confirmarCompra() {
    /*this.paymentService.confirmar(this.productosCompra.idCompra.toString()).subscribe({
      next: data =>{
        console.log("Pago confirmado")
      }, error: err => {
        console.log(err)
      }
    })*/

    this.comprasService.crearListaCompras(this.data.compras).subscribe((resp:any)=>{
      console.log("se guardo la lista compras", resp.compras)
    }, error => {
      console.log("No se guardo la lista")
    })

    this.paymentService.confirmar(this.idCompra).subscribe({
      next: data =>{
        console.log("Pago confirmado")
        this.dialogRef.close(true)
        this.router.navigate(['user/configuracion-usuario/gestion-pedidos'])
      }, error: err => {
        console.log(err)
        this.dialogRef.close(false)

      }
    })
  }

  cancelarCompra() {
    /*this.paymentService.confirmar(this.productosCompra.idCompra.toString()).subscribe({
      next: data =>{
        console.log("Pago cancelado")
      }, error: err => {
        console.log(err)
      }
    })*/
    this.paymentService.confirmar(this.idCompra).subscribe({
      next: data =>{
        console.log("Pago cancelado")
        this.dialogRef.close(false)
      }, error: err => {
        console.log(err)
        this.dialogRef.close(false)
      }
    })
  }

}
