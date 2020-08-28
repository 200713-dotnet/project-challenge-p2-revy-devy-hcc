import { Injectable } from '@angular/core';
import { Stock } from './models';
import { GetStockFromWebAPIService } from './get-stock-from-web-api.service'

@Injectable({
  providedIn: 'root'
})
export class GetStockService {

  constructor(private getStockFromWebAPIService:GetStockFromWebAPIService) { }

  getAllStockFromUsername(username:string):Stock[] {
    return this.getStockFromWebAPIService.getAllStockFromUsername(username);
  }

  getStockBySymbol(symbol:string):Stock{
    return this.getStockFromWebAPIService.getStockBySymbol(symbol);
  }
}
