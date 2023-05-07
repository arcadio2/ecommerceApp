import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionarDirectorioComponent } from './gestionar-directorio.component';

describe('GestionarDirectorioComponent', () => {
  let component: GestionarDirectorioComponent;
  let fixture: ComponentFixture<GestionarDirectorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionarDirectorioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionarDirectorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
