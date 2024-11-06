import { TestBed } from '@angular/core/testing';

import { ServiceCommentService } from './service-comment.service';

describe('ServiceCommentService', () => {
  let service: ServiceCommentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceCommentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
