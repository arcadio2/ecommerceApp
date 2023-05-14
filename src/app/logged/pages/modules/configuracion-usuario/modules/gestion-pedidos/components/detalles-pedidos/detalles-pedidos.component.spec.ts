import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallesPedidosComponent } from './detalles-pedidos.component';

describe('DetallesPedidosComponent', () => {
  let component: DetallesPedidosComponent;
  let fixture: ComponentFixture<DetallesPedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallesPedidosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetallesPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
