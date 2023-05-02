import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmarCompraComponent } from './confirmar-compra.component';

describe('ConfirmarCompraComponent', () => {
  let component: ConfirmarCompraComponent;
  let fixture: ComponentFixture<ConfirmarCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmarCompraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmarCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
