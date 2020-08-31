import { Injectable } from '@angular/core';
import { Stock } from './models';


@Injectable({
  providedIn: 'root'
})
export class GetStockFromWebAPIService {

  constructor() { }

  getAllStockFromUsername(username: string): Stock[] {
    const list: Stock[] = [new Stock(), new Stock(), new Stock()]; // get list of symbols from username
    for (let index = 0; index < list.length; index++) {
      const element = list[index];
      element.companyName = 'comp' + index;
      element.symbol = 'symb' + index;
      element.change = index;
      element.changePercent = (index + 1) / 10;
      element.latestPrice = index * 10;
      list[index] = element;
    }
    return list;
  }

  getStockBySymbol(symbol: string): Stock {
    return new Stock();
  }
}
