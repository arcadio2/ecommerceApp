import { TestBed } from '@angular/core/testing';

import { DireccionesService } from './direcciones.service';

describe('DireccionesService', () => {
  let service: DireccionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DireccionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
