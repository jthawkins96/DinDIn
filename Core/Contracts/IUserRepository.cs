using DinDin.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DinDin.Core.Contracts
{
    public interface IUserRepository
    {
        Task<User> Find(string username);
        ICollection<User> FindUsers(string searchTerm);
        ICollection<User> GetUsers();
        ICollection<UserGroup> GetGroups(string userId);
    }
}
