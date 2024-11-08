import { TestBed } from '@angular/core/testing';

import { ServiceInstrumentsImageService } from './service-instruments-image.service';

describe('ServiceInstrumentsImageService', () => {
  let service: ServiceInstrumentsImageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceInstrumentsImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
