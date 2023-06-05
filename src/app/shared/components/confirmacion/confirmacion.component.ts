import { Component, Inject, OnInit } from '@angular/core';
import { DialogComponentComponent } from '../dialog-component/dialog-component.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmacion',
  templateUrl: './confirmacion.component.html',
  styleUrls: ['./confirmacion.component.css']
})
export class ConfirmacionComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogComponentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) { }


    ngOnInit(): void {

    }

  confirm(): void {
    this.dialogRef.close('yes');
  }

  cancel(): void {
    this.dialogRef.close();
  }


}
