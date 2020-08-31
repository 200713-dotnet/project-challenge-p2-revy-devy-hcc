import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GetStockService } from '../get-stock.service';
import { Stock, User } from '../models';
import { ModifyStockService } from '../modify-stock.service';
import { ValidateService } from '../validate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stock-view',
  templateUrl: './stock-view.component.html',
  styleUrls: ['./stock-view.component.css']
})
export class StockViewComponent implements OnInit {

  userName: string;
  password: string;
  id: string;
  stockList: Stock[];
  symbolAdd = new FormControl('');
  user: User;

  // tslint:disable-next-line:max-line-length
  constructor(private getStockService: GetStockService, private modifyStockService: ModifyStockService, private validateService: ValidateService, private router: Router) {}

  ngOnInit(): void {
    this.userName = this.validateService.user.userName;
    this.stockList = this.validateService.user.stockList;
    this.id = this.validateService.user.id.toString();
    this.password = this.validateService.user.password;
    // user already has all it's stock information, so we don't need to reget it here
    // this.getStock();
  }

  removeStock(stockSymbol: string): void {
    this.modifyStockService.removeStock(this.id, stockSymbol);
    this.getStock();
  }

  addStock(): void {
    this.modifyStockService.addStock(this.id, this.symbolAdd.value);
    this.getStock();
  }

  getStock(): void {

    this.validateService.validateCredentials(this.userName, this.password).subscribe((data: any) => {
      this.user = {
        id: data.id,
        userName: data.username,
        password: data.password,
        stockList: data.stocks,
        balance: data.balance
      };
      this.stockList = this.user.stockList;
      console.log(this.stockList);
    });

  }


  logout(): void {
    this.router.navigateByUrl('');
  }



}
