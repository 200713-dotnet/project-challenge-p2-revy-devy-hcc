export class Stock {
    companyName: string;
    symbol: string;
    latestPrice: number;
    change: number;
    changePercent: number;
}

export class User{
    id:number;
    userName: string;
    password: string;
    stockList: Stock[];
    balance: number;
}