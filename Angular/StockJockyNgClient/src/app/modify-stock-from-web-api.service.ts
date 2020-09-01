import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ModifyStockFromWebAPIService {

  constructor(private httpClient: HttpClient) { }

  addStock(id: string, symbol: string): void {
    this.httpClient.get(`http://52.155.33.35/api/users/${id}/add/${symbol}`);
    // add stock
  }

  removeStock(id: string, symbol: string): void {
    this.httpClient.delete(`http://52.155.33.35/api/users/${id}/remove/${symbol}`);
    // remove stock
  }

}
