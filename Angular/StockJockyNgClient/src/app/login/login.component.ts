import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidateService } from '../validate.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  userName=new FormControl('');
  password=new FormControl('');

  constructor(private validateService:ValidateService) {

   }

  ngOnInit(): void {
    
  }

  validate(){
    //send this.userName to a "validate" service, which will send it to a "validateFromWebAPI" service, which will send it to the webAPI service and wait for a response
    let success:boolean=this.validateService.validateCredentials(this.userName.value,this.password.value);
    this.userName.setValue("awaiting validation: "+success);
  }

}
