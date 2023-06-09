import { TestBed } from '@angular/core/testing';

import { NoactiveGuard } from './noactive.guard';

describe('NoactiveGuard', () => {
  let guard: NoactiveGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NoactiveGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
