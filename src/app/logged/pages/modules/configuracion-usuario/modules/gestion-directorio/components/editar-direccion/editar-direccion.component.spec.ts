import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarDireccionComponent } from './editar-direccion.component';

describe('EditarDireccionComponent', () => {
  let component: EditarDireccionComponent;
  let fixture: ComponentFixture<EditarDireccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarDireccionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarDireccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
