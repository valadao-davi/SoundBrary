import { TestBed } from '@angular/core/testing';

import { ServicePaymentService } from './service-payment.service';

describe('ServicePaymentService', () => {
  let service: ServicePaymentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicePaymentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
