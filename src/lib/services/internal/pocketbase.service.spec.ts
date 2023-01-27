import { TestBed } from '@angular/core/testing';

import { PocketbaseService } from './pocketbase.service';

describe('PocketbaseService', () => {
  let service: PocketbaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PocketbaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
