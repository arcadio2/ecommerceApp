import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarInformacionGeneralComponent } from './editar-informacion-general.component';

describe('EditarDescripcionGeneralComponent', () => {
  let component: EditarInformacionGeneralComponent;
  let fixture: ComponentFixture<EditarInformacionGeneralComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarInformacionGeneralComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarInformacionGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
