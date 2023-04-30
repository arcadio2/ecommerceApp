import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfiguracionBarComponent } from './configuracion-bar.component';

describe('ConfiguracionBarComponent', () => {
  let component: ConfiguracionBarComponent;
  let fixture: ComponentFixture<ConfiguracionBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfiguracionBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfiguracionBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
