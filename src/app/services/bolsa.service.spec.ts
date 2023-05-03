import { TestBed } from '@angular/core/testing';

import { BolsaService } from './bolsa.service';

describe('BolsaService', () => {
  let service: BolsaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BolsaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
