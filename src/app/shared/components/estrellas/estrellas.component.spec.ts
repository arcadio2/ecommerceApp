import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstrellasComponent } from './estrellas.component';

describe('EstrellasComponent', () => {
  let component: EstrellasComponent;
  let fixture: ComponentFixture<EstrellasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstrellasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstrellasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
