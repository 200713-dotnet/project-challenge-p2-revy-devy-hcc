import { TestBed } from '@angular/core/testing';

import { ModifyStockService } from './modify-stock.service';

describe('ModifyStockService', () => {
  let service: ModifyStockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModifyStockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
