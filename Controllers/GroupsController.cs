using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using DinDin.Core.Contracts;
using DinDin.Core.Models;
using DinDin.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DinDin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class GroupsController : ControllerBase
    {
        private readonly IGroupRepository _groupRepo;
        private readonly IMapper _mapper;

        public GroupsController(IGroupRepository groupRepo, IMapper mapper)
        {
            _groupRepo = groupRepo;
            _mapper = mapper;
        }

        [HttpGet("{groupId}", Name = "GetGroup")]
        public IActionResult GetGroup(int groupId)
        {
            var group = _groupRepo.Find(groupId);
            return Ok(_mapper.Map<GroupDto>(group));
        }

        [HttpPost]
        public async Task<IActionResult> AddGroup(GroupDto newGroup)
        {
            var mappedGroup = _mapper.Map<Group>(newGroup);
            var addedGroup = await _groupRepo.Add(mappedGroup);
            return CreatedAtRoute("GetGroup", new { groupId = addedGroup.Id }, _mapper.Map<GroupDto>(addedGroup));
        }

        [HttpDelete("{groupId}")]
        public IActionResult DeleteGroup(int groupId)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            if (!_groupRepo.UserIsOwner(groupId, userId)) return Unauthorized();
            _groupRepo.Delete(groupId);
            return NoContent();
        }
    }
}