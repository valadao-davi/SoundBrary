import { TestBed } from '@angular/core/testing';

import { ServiceAvaliateService } from './service-avaliate.service';

describe('ServiceAvaliateService', () => {
  let service: ServiceAvaliateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceAvaliateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
