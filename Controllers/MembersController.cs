using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DinDin.Core.Contracts;
using DinDin.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DinDin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class MembersController : ControllerBase
    {
        private readonly IUserRepository _userRepo;
        private readonly IMapper _mapper;

        public MembersController(IUserRepository userRepo, IMapper mapper)
        {
            _userRepo = userRepo;
            _mapper = mapper;
        }

        [HttpGet("FindUsers/{searchTerm}")]
        public IActionResult FindUsers(string searchTerm)
        {
            var users = _userRepo.FindUsers(searchTerm);
            return Ok(_mapper.Map<List<UserDto>>(users));
        }

        [HttpGet]
        public IActionResult GetUsers()
        {
            var users = _userRepo.GetUsers();
            return Ok(_mapper.Map<List<UserDto>>(users));
        }

        [HttpGet("GetGroups/{userId}")]
        public IActionResult GetGroups(string userId)
        {
            var userGroups = _userRepo.GetGroups(userId);
            return Ok(_mapper.Map<List<GroupRoleDto>>(userGroups));
        }
    }
}