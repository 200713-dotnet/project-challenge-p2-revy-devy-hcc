import { Injectable } from '@angular/core';
import { ModifyStockFromWebAPIService } from './modify-stock-from-web-api.service';

@Injectable({
  providedIn: 'root'
})
export class ModifyStockService {

  constructor(private modifyStockFromWebAPIService: ModifyStockFromWebAPIService) { }

  addStock(username: string, symbol: string) {
    this.modifyStockFromWebAPIService.addStock(username, symbol);
  }

  removeStock(username: string, symbol: string) {
    this.modifyStockFromWebAPIService.removeStock(username, symbol);
  }

}
