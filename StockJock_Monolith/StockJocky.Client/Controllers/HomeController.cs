﻿using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using StockJocky.Client.Models;
using StockJocky.Domain.Factory;
using StockJocky.Domain.Models;
using StockJocky.Storing;
using StockJocky.Storing.Repositories;

namespace StockJocky.Client.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private readonly StockDbContext _db;

        private readonly UserRepository _userRepo;

        private readonly StockRepository _stockRepository;

        private readonly StockFactory _stockFactory;

        public HomeController(ILogger<HomeController> logger, StockDbContext db)
        {
            _logger = logger;
            _db = db;
            _userRepo= new UserRepository(_db);
            _stockRepository = new StockRepository(_db);
            _stockFactory = new StockFactory();

        }

        public IActionResult Index(UserViewModel userViewModel)
        {
            userViewModel.UserName="";
            userViewModel.Password="";
            return View(userViewModel);
        }



        public IActionResult AuthenticateUser(UserViewModel userViewModel)
        {
            if (ModelState.IsValid)
            {
                    //get user if exists, otherwise add a new user
                var user = _userRepo.LoginUser(userViewModel.UserName,userViewModel.Password);

                            //check to make sure a user was returned from _userRepo.LoginUser
                    if(user != null)
                    {

                            //create a tempstocklist to hold information while the original stocklist is iterated over
                        var tempStockList= new List<Stock>();

                                //iterate over the stocklist to get the most recent stock info, putting the new info in tempStockList
                        ApiHelper.InitializeClient();
                        foreach (var stock in user.Stocks)
                        {
                            var s = _stockFactory.LoadStock(stock.Symbol).GetAwaiter().GetResult();
                            tempStockList.Add(s);
                        } 
                        user.Stocks = tempStockList;
                        userViewModel.User = user;
                        

                    }else{
                        return View("Index",userViewModel);
                    }
                    
                //get user stocklist stocks, then...
                return View("StockList", userViewModel);



            }
            else
            {
                return View("Index");
            }
        }


        public async Task<IActionResult> AddStock(UserViewModel userViewModel)
        {
                var user = _userRepo.LoginUser(userViewModel.UserName,userViewModel.Password);

                   //check to make sure a user was returned from _userRepo.LoginUser
                    if(User!=null)
                    {

                        ApiHelper.InitializeClient();

                        try
                        {//catches a "stock symbol not found" error. ideally this will be handled in loadstock itself and just return null
                        var s = await  _stockFactory.LoadStock(userViewModel.SymbolAdd);

                        _stockRepository.AddStock(user,s);
                        }catch{

                        }

                        
                       return AuthenticateUser(userViewModel);
                    }

            return View("Index");
        }

        public async Task<IActionResult> RemoveStock(UserViewModel userViewModel)
        {

            var user = _userRepo.LoginUser(userViewModel.UserName,userViewModel.Password);

                   //check to make sure a user was returned from _userRepo.LoginUser
                    if(User!=null)
                    {
                        ApiHelper.InitializeClient();
                        var s = await _stockFactory.LoadStock(userViewModel.SymbolRemove);
                         _stockRepository.RemoveStock(user,s);

                       return AuthenticateUser(userViewModel);
                    }

            return View("StockList", userViewModel);
        }

        public async Task<IActionResult> UpdateStocks(UserViewModel userViewModel)
        {
            var user = _userRepo.LoginUser(userViewModel.UserName,userViewModel.Password);
            var updateduser = await _stockFactory.UpdateAllStock(user);
            userViewModel.User = updateduser;
            return View("StockList", userViewModel);
        }

        public IActionResult Privacy()
        {
            return View();
        }

        public IActionResult Register()
        {
            return View();
        }

        public IActionResult StockList()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }






    
    }
}
