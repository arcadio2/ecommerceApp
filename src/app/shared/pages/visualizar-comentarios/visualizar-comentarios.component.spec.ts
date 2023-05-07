import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizarComentariosComponent } from './visualizar-comentarios.component';

describe('VisualizarComentariosComponent', () => {
  let component: VisualizarComentariosComponent;
  let fixture: ComponentFixture<VisualizarComentariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizarComentariosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizarComentariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
