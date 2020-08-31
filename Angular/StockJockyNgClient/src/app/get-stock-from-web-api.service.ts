import { Injectable } from '@angular/core';
import { Stock } from './models';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class GetStockFromWebAPIService {

  constructor(private httpClient:HttpClient) { }

  getAllStockFromUsername(username: string): Observable<any> {


    //get the list of stock symbols associated with the user, then getStockBySymbol for each and add the response to the list. return the list when it's finished iterating
    let list: Stock[];
   return this.httpClient.get(`https://localhost:5001/api/user/...`);

   // for (let index = 0; index < array.length; index++) {
   //   const element = array[index];
      
    //  list.push(arry[index]);
   // }

    /*
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
    */
   // return list;
  }

  getStockBySymbol(symbol: string): Observable<any> {
    return this.httpClient.get(`https://localhost:5001/api/iex/${symbol}`);
    //return new Stock();
  }
}
