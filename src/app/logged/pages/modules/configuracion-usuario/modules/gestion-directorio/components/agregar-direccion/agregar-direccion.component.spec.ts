import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarDireccionComponent } from './agregar-direccion.component';

describe('AgregarDireccionComponent', () => {
  let component: AgregarDireccionComponent;
  let fixture: ComponentFixture<AgregarDireccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgregarDireccionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarDireccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
