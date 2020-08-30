using System.Threading.Tasks;
using StockJockAPI.Domain.Factories;
using StockJockAPI.Domain.Models;
using StockJockAPI.Storing;
using StockJockAPI.Storing.Repositories;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace StockJockAPI.Testing
{
	public class RepoTest
	{
		 StockFactory sf = new StockFactory();

		public DataBaseContext InitDbContext()
		{
			DbContextOptionsBuilder OptionsBuilder = new DbContextOptionsBuilder<DataBaseContext>();
			OptionsBuilder.UseSqlServer("server=stockjock.database.windows.net;database=stockjock;user id=sqladmin;password=hop88SeZ");
			return new DataBaseContext(OptionsBuilder.Options);
		}

		[Fact]
        public void StockRepoTest()
        {
            var init =  InitDbContext();
			var sut = new StockRepo(init);
            Assert.NotNull(sut);
        }

		[Fact]
        public void UserRepoTest()
        {
            var init =  InitDbContext();
			var sut = new UserRepo(init);
            Assert.NotNull(sut);
        }

		[Fact]
        public void LoginUserTest()
        {
            var init =  InitDbContext();
			var sut = new UserRepo(init);
			var actual = sut.LoginUser("testuser", "p123");
            Assert.Equal("testuser", actual.Username);
        }
		
		[Fact]
		public void AddUserTest()
        {
            var init =  InitDbContext();
			var sut = new UserRepo(init);

			// var UserToRemove = sut.LoginUser("testuser", "p123");

			// init.User.Remove(UserToRemove);
			// init.SaveChanges(); //Delete current test user.

			var actual = sut.LoginUser("testuser", "p123"); //Since testuser does not exist, it will be created.
            Assert.Equal("testuser", actual.Username); //Test to see if user is created.
        }

		[Fact]
		public async Task AddStockTest()
		{
			ApiHelper.InitializeClient();

			var init =  InitDbContext();
			var ur = new UserRepo(init);
			var sr = new StockRepo(init);

			var user = ur.LoginUser("testuser", "p123");
			Stock stock = await sf.LoadStock("amzn");
			sr.AddStock(user, stock); //sut, Add Stock

			var newuser = ur.LoginUser("testuser", "p123");
			var newstock = newuser.Stocks.Find(s => s.Symbol == "AMZN");
			

			Assert.Equal("AMZN", newstock.Symbol);
		}

		[Fact]
		public async Task RemoveStockTest()
		{
			ApiHelper.InitializeClient();

			var init =  InitDbContext();
			var ur = new UserRepo(init);
			var sr = new StockRepo(init);

			var user = ur.LoginUser("testuser", "p123");
			Stock stock = await sf.LoadStock("amzn");
			sr.AddStock(user, stock); 

			var newuser = ur.LoginUser("testuser", "p123");
			sr.RemoveStock(newuser, stock);

			newuser = ur.LoginUser("testuser", "p123");
			var newstock = newuser.Stocks.Find(s => s.Symbol == "AMZN");
			Assert.Null(newstock);
		}
	}	
}