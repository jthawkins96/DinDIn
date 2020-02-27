using DinDin.Core.Contracts;
using DinDin.Core.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DinDin.DAL.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly DinDinContext _dbContext;

        public UserRepository(DinDinContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<User> Find(string username)
        {
            return await _dbContext.Users.SingleOrDefaultAsync(user => user.UserName == username);
        }

        public ICollection<User> FindUsers(string searchTerm)
        {
            return _dbContext.Users.Where(user => user.UserName.StartsWith(searchTerm)).ToList();
        }

        public ICollection<User> GetUsers()
        {
            return _dbContext.Users.ToList();
        }
    }
}
