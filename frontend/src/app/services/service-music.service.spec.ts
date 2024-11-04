import { TestBed } from '@angular/core/testing';

import { ServiceMusicService } from './service-music.service';

describe('ServiceMusicService', () => {
  let service: ServiceMusicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServiceMusicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
