import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestablecerContraseniaComponent } from './restablecer-contrasenia.component';

describe('ForgottenPasswordComponent', () => {
  let component: RestablecerContraseniaComponent;
  let fixture: ComponentFixture<RestablecerContraseniaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestablecerContraseniaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RestablecerContraseniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
