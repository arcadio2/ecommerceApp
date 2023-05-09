import { TestBed } from '@angular/core/testing';

import { CategoriaControllersService } from './categoria-controllers.service';

describe('CategoriaControllersService', () => {
  let service: CategoriaControllersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriaControllersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
