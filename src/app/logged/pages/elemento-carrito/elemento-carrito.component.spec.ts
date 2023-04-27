import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementoCarritoComponent } from './elemento-carrito.component';

describe('ElementoCarritoComponent', () => {
  let component: ElementoCarritoComponent;
  let fixture: ComponentFixture<ElementoCarritoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ElementoCarritoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElementoCarritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
