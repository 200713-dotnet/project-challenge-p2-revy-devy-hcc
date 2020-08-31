import { Injectable } from '@angular/core';
import { ValidateFromWebAPIService } from './validate-from-web-api.service';
import { Observable } from 'rxjs';
import { User } from './models';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  user: User;

  constructor(private validateFromWebAPIService: ValidateFromWebAPIService) { }

  validateCredentials(userName: string, password: string): Observable<any> {
    // pass userName and password to ValidateWithWebAPI to get return value
    return this.validateFromWebAPIService.validateCredentials(userName, password);

  }

  storeUser(user: User): void {
    this.user = user;
  }
}
