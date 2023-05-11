import { TestBed } from '@angular/core/testing';

import { ProductosAdminService } from './productos-admin.service';

describe('ProductosAdminService', () => {
  let service: ProductosAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductosAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
