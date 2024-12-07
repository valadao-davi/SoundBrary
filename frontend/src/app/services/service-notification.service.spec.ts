import { TestBed } from '@angular/core/testing';

import { ServiceNotificationService } from './service-notification.service';

describe('ServiceNotificationService', () => {
  let service: ServiceNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
