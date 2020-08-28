import { TestBed } from '@angular/core/testing';

import { ValidateFromWebAPIService } from './validate-from-web-api.service';

describe('ValidateFromWebAPIService', () => {
  let service: ValidateFromWebAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidateFromWebAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
