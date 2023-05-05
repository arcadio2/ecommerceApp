import { TestBed } from '@angular/core/testing';

import { NoAdminGuard } from './no-admin.guard';

describe('NoAdminGuard', () => {
  let guard: NoAdminGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NoAdminGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
