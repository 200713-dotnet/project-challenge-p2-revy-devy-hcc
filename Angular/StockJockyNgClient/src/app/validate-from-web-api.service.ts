import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateFromWebAPIService {

  constructor() { }

  validateCredentials(userName: string, password: string): boolean {
    // pass userName and password to WebAPI and await a response
    return true;
  }
}
