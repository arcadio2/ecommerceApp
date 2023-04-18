import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoDetalladaComponent } from './info-detallada.component';

describe('InfoDetalladaComponent', () => {
  let component: InfoDetalladaComponent;
  let fixture: ComponentFixture<InfoDetalladaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoDetalladaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InfoDetalladaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
