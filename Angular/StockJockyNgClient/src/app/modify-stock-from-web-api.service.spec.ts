import { TestBed } from '@angular/core/testing';

import { ModifyStockFromWebAPIService } from './modify-stock-from-web-api.service';

describe('ModifyStockFromWebAPIService', () => {
  let service: ModifyStockFromWebAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModifyStockFromWebAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
