import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioClienteComponent } from './inicio-cliente.component';

describe('InicioComponent', () => {
  let component: InicioClienteComponent;
  let fixture: ComponentFixture<InicioClienteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InicioClienteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InicioClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
