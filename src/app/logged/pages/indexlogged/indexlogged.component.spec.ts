import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexloggedComponent } from './indexlogged.component';

describe('IndexloggedComponent', () => {
  let component: IndexloggedComponent;
  let fixture: ComponentFixture<IndexloggedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexloggedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexloggedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
