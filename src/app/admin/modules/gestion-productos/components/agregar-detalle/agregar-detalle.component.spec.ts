import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarDetalleComponent } from './agregar-detalle.component';

describe('AgregarDetalleComponent', () => {
  let component: AgregarDetalleComponent;
  let fixture: ComponentFixture<AgregarDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarDetalleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
