import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReestablecerContraseniaComponent } from './reestablecer-contrasenia.component';

describe('ForgottenPasswordComponent', () => {
  let component: ReestablecerContraseniaComponent;
  let fixture: ComponentFixture<ReestablecerContraseniaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReestablecerContraseniaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReestablecerContraseniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
