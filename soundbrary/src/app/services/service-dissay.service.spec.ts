import { TestBed } from '@angular/core/testing';

import { ServiceDissayService } from './service-dissay.service';

describe('ServiceDissayService', () => {
  let service: ServiceDissayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceDissayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
