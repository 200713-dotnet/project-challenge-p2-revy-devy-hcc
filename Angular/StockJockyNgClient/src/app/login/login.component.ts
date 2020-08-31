import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ValidateService } from '../validate.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Stock, User } from '../models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {

  userName = new FormControl('');
  password = new FormControl('');
  user$:Observable<string>;
  user:User;
  testOut:string;
  test$ ={
    next: x => console.log('Observer got a next value: ' + x),
    error: err => console.error('Observer got an error: ' + err),
    complete: () => console.log('Observer got a complete notification'),
  };

  constructor(private validateService: ValidateService, private router: Router) {
  }

  ngOnInit(): void {

  }

  validate() {
    
    //this.validateService.validateCredentials(this.userName.value, this.password.value).subscribe(this.test$);
   //this.user$=this.validateService.validateCredentials(this.userName.value, this.password.value);
   this.validateService.validateCredentials(this.userName.value, this.password.value).subscribe((data:any) => {this.user = {
     id: data.id,
     userName: data.username,
     password: data.password,
     stockList: data.stocks,
     balance: data.balance
   }
    //if response returns OK, store user in validate service and rerout to stockview
   if(this.user.userName==this.userName.value)
   {
    this.validateService.storeUser(this.user);
    this.router.navigateByUrl('/StockView');
   }
  }
   );

   
  
    

    

  }

}
