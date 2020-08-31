import { Injectable } from '@angular/core';
import { ModifyStockFromWebAPIService } from './modify-stock-from-web-api.service';

@Injectable({
  providedIn: 'root'
})
export class ModifyStockService {

  constructor(private modifyStockFromWebAPIService: ModifyStockFromWebAPIService) { }

  addStock(id: string, symbol: string): void {
    this.modifyStockFromWebAPIService.addStock(id, symbol);
  }

  removeStock(id: string, symbol: string): void {
    this.modifyStockFromWebAPIService.removeStock(id, symbol);
  }

}
