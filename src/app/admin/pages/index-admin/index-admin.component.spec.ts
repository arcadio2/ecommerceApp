import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexAdminComponent } from './index-admin.component';

describe('IndexAdminComponent', () => {
  let component: IndexAdminComponent;
  let fixture: ComponentFixture<IndexAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndexAdminComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndexAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
