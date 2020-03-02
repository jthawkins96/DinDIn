using System;
using System.Collections.Generic;
using System.Security.Claims;
using AutoMapper;
using DinDin.Core.Contracts;
using DinDin.Core.Models;
using DinDin.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DinDin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class RecipesController : ControllerBase
    {
        private IRecipeRepository _recipeRepo;
        private IMapper _mapper;
        private readonly IUserActivityLoggerGateway _userActivityLoggerGateway;

        public RecipesController(IRecipeRepository recipeRepo, IMapper mapper, IUserActivityLoggerGateway userActivityLoggerGateway)
        {
            _recipeRepo = recipeRepo;
            _mapper = mapper;
            _userActivityLoggerGateway = userActivityLoggerGateway;
        }

        [HttpGet("{recipeId}")]
        public IActionResult GetRecipe(int recipeId)
        {
            var recipe = _recipeRepo.GetRecipe(recipeId, includeIngredients: true);
            if (recipe != null) return Ok(_mapper.Map<RecipeDto>(recipe));
            return NotFound();
        }

        [HttpGet("GetRecipes")]
        public IActionResult GetRecipes()
        {
            var recipe = _recipeRepo.GetRecipes(User.FindFirstValue(ClaimTypes.NameIdentifier), includeIngredients: true);
            if (recipe != null) return Ok(_mapper.Map<List<RecipeDto>>(recipe));
            return NotFound();
        }

        [HttpPost]
        public IActionResult AddRecipe(RecipeDto newRecipe)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var recipe = _mapper.Map<Recipe>(newRecipe);
            recipe.UserId = userId;
            var addedRecipe = _recipeRepo.AddRecipe(recipe);
            _userActivityLoggerGateway.PostUserActivity(new UserActivity { Activity = "Add recipe", UserId = userId, Timestamp = DateTime.Now });
            return Ok();
        }

        [HttpPut]
        public IActionResult UpdateRecipe(UpdateRecipeDto updatedRecipe)
        {
            var recipe = _recipeRepo.GetRecipe(updatedRecipe.Id, includeIngredients: true);
            if (recipe == null) return NotFound();
            _mapper.Map(updatedRecipe, recipe);
            _recipeRepo.Update(recipe);
            return NoContent();
        }

        [HttpGet("CanEditRecipe/{recipeId}")]
        public IActionResult CanEditRecipe(int recipeId)
        {
            return Ok(_recipeRepo.CanEditRecipe(User.FindFirstValue(ClaimTypes.NameIdentifier), recipeId));
        }
    }
}