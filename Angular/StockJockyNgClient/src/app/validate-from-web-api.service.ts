import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry,map } from 'rxjs/operators';
import { User } from './models';

@Injectable({
  providedIn: 'root'
})
export class ValidateFromWebAPIService {

  constructor(private httpClient:HttpClient) { }

  validateCredentials(userName: string, password: string): Observable<any> {

    return this.httpClient.get<any>(`https://localhost:5001/api/users/${userName}/${password}`);
  }
}
