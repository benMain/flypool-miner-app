import { TestBed } from '@angular/core/testing';

import { FlypoolClientService } from './flypool-client.service';

describe('FlypoolClientService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FlypoolClientService = TestBed.get(FlypoolClientService);
    expect(service).toBeTruthy();
  });
});
