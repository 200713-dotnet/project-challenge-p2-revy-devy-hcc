import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ModifyStockFromWebAPIService {

  constructor(private httpClient:HttpClient) { }

  addStock(username: string, symbol: string) {
    this.httpClient.get(`https://localhost:5001/api/users/${username}/add/${symbol}...`);
    // add stock
  }

  removeStock(username: string, symbol: string) {
    this.httpClient.get(`https://localhost:5001/api/users/${username}/remove/${symbol}...`);
    // remove stock
  }

}
