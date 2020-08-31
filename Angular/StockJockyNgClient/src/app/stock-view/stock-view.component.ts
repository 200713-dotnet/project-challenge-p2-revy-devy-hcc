import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { GetStockService } from '../get-stock.service';
import { Stock } from '../models';
import { ModifyStockService } from '../modify-stock.service'
import { ValidateService } from '../validate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stock-view',
  templateUrl: './stock-view.component.html',
  styleUrls: ['./stock-view.component.css']
})
export class StockViewComponent implements OnInit {

  userName: string;
  stockList: Stock[];
  symbolAdd = new FormControl('');

  constructor(private getStockService: GetStockService, private modifyStockService: ModifyStockService, private validateService: ValidateService, private router: Router) { }

  ngOnInit(): void {
    this.userName = this.validateService.usernmae;
    this.getStock();
  }

  removeStock(stockSymbol: string) {
    this.modifyStockService.removeStock(this.userName, stockSymbol);
    this.getStock();
  }

  addStock() {
    this.modifyStockService.addStock(this.userName, this.symbolAdd.value);
    this.getStock();
  }

  getStock() {
    //pass username to getStockService, which will pass it to getStockFromWebAPI service.
    this.stockList = this.getStockService.getAllStockFromUsername(this.userName);
  }

  logout() {
    this.router.navigateByUrl('');
  }



}
