import { TestBed } from '@angular/core/testing';

import { GetStockFromWebAPIService } from './get-stock-from-web-api.service';

describe('GetStockFromWebAPIService', () => {
  let service: GetStockFromWebAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetStockFromWebAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
