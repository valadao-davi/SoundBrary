import { TestBed } from '@angular/core/testing';

import { RedirectStorageService } from './redirect-storage.service';

describe('RedirectStorageService', () => {
  let service: RedirectStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RedirectStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
