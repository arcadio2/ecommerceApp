import { TestBed } from '@angular/core/testing';

import { DetalleService } from './detalle.service';

describe('DetalleService', () => {
  let service: DetalleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetalleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
