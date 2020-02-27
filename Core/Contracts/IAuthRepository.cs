using DinDin.Core.Models;
using Microsoft.AspNetCore.Identity;
using System.IdentityModel.Tokens.Jwt;
using System.Threading.Tasks;

namespace DinDin.Core.Contracts
{
    public interface IAuthRepository
    {
        Task<User> Login(string username, string password);
        Task<IdentityResult> Register(User user, string password);
        string GenerateToken(User user);
        JwtSecurityToken ReadToken(string token);
    }
}
