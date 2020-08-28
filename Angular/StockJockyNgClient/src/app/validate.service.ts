import { Injectable } from '@angular/core';
import { ValidateFromWebAPIService } from './validate-from-web-api.service'

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  usernmae:string;

  constructor(private validateFromWebAPIService:ValidateFromWebAPIService) { }

  validateCredentials(userName:string,password:string):boolean{
    //pass userName and password to ValidateWithWebAPI to get return value
    let success:boolean=this.validateFromWebAPIService.validateCredentials(userName,password);
    if(success)
    {
      this.usernmae=userName;
    }
    return success; 
  }
}
