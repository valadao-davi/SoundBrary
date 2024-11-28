import { TestBed } from '@angular/core/testing';

import { ErrorHandleServiceService } from './error-handle-service.service';

describe('ErrorHandleServiceService', () => {
  let service: ErrorHandleServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorHandleServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
