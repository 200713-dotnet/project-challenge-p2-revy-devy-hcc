using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using StockJockAPI.Domain.Factories;
using StockJockAPI.Domain.Models;
using StockJockAPI.Storing;
using StockJockAPI.Storing.Repositories;
using Microsoft.AspNetCore.Cors;

namespace StockJockAPI.Controllers
{
    [Route("api/users")]
    [ApiController]
    public class UsersController: ControllerBase
    {
        public UsersController(DataBaseContext db)
        {
            _db = db;
            _stockFactory = new StockFactory();
            _userFactory = new UserFactory();
            _userRepo = new UserRepo(db);
            _stockRepo = new StockRepo(db);

        }

        private readonly DataBaseContext _db;
        private readonly StockFactory _stockFactory;
        private readonly UserFactory _userFactory;
        private readonly UserRepo _userRepo;
        private readonly StockRepo _stockRepo;

        [HttpGet]
        public ActionResult <List<User>> GetAllUsers()
        {

            return _userRepo.GetAllUsers();
        }

        [Route("{id}", Name="GetUserById")]
        [HttpGet]
        public ActionResult GetUserById(int id)
        {
            var user = _userRepo.GetUserById(id);

            if(user != null)
            {
                return Ok(user);
            }

            return NotFound();
        }

        [Route("{username}/{password}")]
        //[HttpPost]
        public ActionResult AuthenticateUser(string username, string password)
        {
            var userFound = _userRepo.LoginUser(username, password);

            if(userFound != null)
            {
                //create a tempstocklist to hold information while the original stocklist is iterated over
                var tempStockList= new List<Stock>();

                //iterate over the stocklist to get the most recent stock info, putting the new info in tempStockList
                ApiHelper.InitializeClient();

                foreach (var stock in userFound.Stocks)
                {
                    var s= _stockFactory.LoadStock(stock.Symbol).GetAwaiter().GetResult();
                    tempStockList.Add(s);
                } 

                userFound.Stocks = tempStockList;

            }

            return Ok(userFound);
        }

        [Route("{id}/add/{symbol}")]
        //[HttpPost]
        public ActionResult AddStock(int id, string symbol)
        {
            var user = _userRepo.GetUserById(id); // var r = request.HttpParameters

            //check to make sure a user was returned from _userRepo.LoginUser
            if(user != null)
            {
                ApiHelper.InitializeClient();

                var s = _stockFactory.LoadStock(symbol).GetAwaiter().GetResult();

                _stockRepo.AddStock(user, s);

                return Ok(StatusCode(201));
                // return AuthenticateUser(userViewModel);
            }

            return NotFound();
        }

        [Route("{id}/remove/{symbol}")]
        [HttpDelete]
        public ActionResult RemoveStock(int id, string symbol)
        {
            var userFound = _userRepo.GetUserById(id);

            //check to make sure a user was returned from _userRepo.LoginUser
            if(userFound != null)
            {
                ApiHelper.InitializeClient();

                var s = _stockFactory.LoadStock(symbol).GetAwaiter().GetResult();

                _stockRepo.RemoveStock(userFound, s);

                return Ok(StatusCode(204));
            }
            else 
            {
                return NotFound();
            }
        }
    }
}