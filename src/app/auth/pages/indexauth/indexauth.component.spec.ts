import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexauthComponent } from './indexauth.component';

describe('IndexauthComponent', () => {
  let component: IndexauthComponent;
  let fixture: ComponentFixture<IndexauthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexauthComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexauthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
