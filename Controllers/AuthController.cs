using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DinDin.Core.Contracts;
using DinDin.Core.Models;
using DinDin.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace DinDin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository _authRepo;
        private readonly IMapper _mapper;

        public AuthController(IAuthRepository authRepo, IMapper mapper)
        {
            _authRepo = authRepo;
            _mapper = mapper;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserLoginDto userToLogin)
        {
            var user = await _authRepo.Login(userToLogin.Username.ToLower(), userToLogin.Password);

            if(user != null)
            {
                var token = _authRepo.GenerateToken(user);
                return Ok(new { token, user = _mapper.Map<UserDto>(user) });
            }

            return Unauthorized();
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterUserDto newUser)
        {
            var mappedUser = _mapper.Map<User>(newUser);
            var result = await _authRepo.Register(mappedUser, newUser.Password);

            if(result.Succeeded)
                return Ok(_mapper.Map<UserDto>(newUser));

            return BadRequest(result.Errors.ToList()[0].Description);
        }
    }
}