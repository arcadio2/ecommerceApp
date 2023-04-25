import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogComponentComponent } from './dialog-component.component';

describe('DialogComponentComponent', () => {
  let component: DialogComponentComponent;
  let fixture: ComponentFixture<DialogComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
