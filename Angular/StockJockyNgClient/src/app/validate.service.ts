import { Injectable } from '@angular/core';
import { ValidateFromWebAPIService } from './validate-from-web-api.service'

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor(private validateFromWebAPIService:ValidateFromWebAPIService) { }

  validateCredentials(userName:string,password:string):boolean{
    //pass userName and password to ValidateWithWebAPI to get return value
    return this.validateFromWebAPIService.validateCredentials(userName,password);
  }
}
