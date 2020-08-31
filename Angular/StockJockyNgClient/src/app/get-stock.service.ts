import { Injectable } from '@angular/core';
import { Stock } from './models';
import { GetStockFromWebAPIService } from './get-stock-from-web-api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetStockService {

  constructor(private getStockFromWebAPIService: GetStockFromWebAPIService) { }

  getAllStockFromUsername(username: string): Observable<any> {
    return this.getStockFromWebAPIService.getAllStockFromUsername(username);
  }

  getStockBySymbol(symbol: string): Observable<any> {
    return this.getStockFromWebAPIService.getStockBySymbol(symbol);
  }
}
