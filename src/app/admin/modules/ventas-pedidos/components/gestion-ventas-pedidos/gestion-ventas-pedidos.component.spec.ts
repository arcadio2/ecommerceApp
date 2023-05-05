import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionVentasPedidosComponent } from './gestion-ventas-pedidos.component';

describe('GestionVentasPedidosComponent', () => {
  let component: GestionVentasPedidosComponent;
  let fixture: ComponentFixture<GestionVentasPedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionVentasPedidosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionVentasPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
