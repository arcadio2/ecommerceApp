import { AfterViewInit, Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-confirmar-compra',
  templateUrl: './confirmar-compra.component.html',
  styleUrls: ['./confirmar-compra.component.css']
})
export class ConfirmarCompraComponent implements OnInit,AfterViewInit {

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });
  isLinear = false;
  readonly direccionForm;

  constructor(private _formBuilder: FormBuilder) {
    this.direccionForm = this.createForm()
  }

  ngOnInit(): void {
    window.scrollTo(0, 0);
  }

  ngAfterViewInit(): void {
    window.scrollTo(0, 0);
  }

  createForm() {
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
        validators: [Validators.required]
      }),
      telefono: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required]
      })
    })
  }

}


