﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using DinDin.Core.Contracts;
using DinDin.Core.Models;
using DinDin.DTO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DinDin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
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
        public async Task<IActionResult> GetGroup(int groupId)
        {
            return Ok(await _groupRepo.Find(groupId));
        }

        [HttpPost]
        public async Task<IActionResult> AddGroup(GroupDto newGroup)
        {
            var mappedGroup = _mapper.Map<Group>(newGroup);
            var addedGroup = await _groupRepo.Add(mappedGroup);
            return CreatedAtRoute("GetGroup", new { groupId = addedGroup.Id }, _mapper.Map<GroupDto>(addedGroup));
        }
    }
}