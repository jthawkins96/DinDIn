using System;
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
    public class VotingController : ControllerBase
    {
        private readonly IVotingRepository _votingRepo;
        private readonly IMapper _mapper;

        public VotingController(IVotingRepository votingRepo, IMapper mapper)
        {
            _votingRepo = votingRepo;
            _mapper = mapper;
        }

        [HttpPost("{groupId}")]
        public IActionResult SetRecipesForVoting(int groupId, ICollection<RecipeDto> recipesToSet)
        {
            var recipes = _mapper.Map<List<Recipe>>(recipesToSet);
            _votingRepo.SetRecipesForVoting(groupId, recipes);
            return Ok();
        }
    }
}