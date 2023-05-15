import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarPagoComponent } from './confirmar-pago.component';

describe('CompraConfirmacionModalComponent', () => {
  let component: ConfirmarPagoComponent;
  let fixture: ComponentFixture<ConfirmarPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmarPagoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmarPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
