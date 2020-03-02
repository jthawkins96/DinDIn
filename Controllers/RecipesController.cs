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

        public RecipesController(IRecipeRepository recipeRepo, IMapper mapper)
        {
            _recipeRepo = recipeRepo;
            _mapper = mapper;
        }

        [HttpGet("{recipeId}")]
        public IActionResult GetRecipe(int recipeId)
        {
            var recipe = _recipeRepo.GetRecipe(recipeId, includeIngredients: true);
            if (recipe != null) return Ok(_mapper.Map<RecipeDto>(recipe));
            return NotFound();
        }

        [HttpGet("GetRecipes/{userId}")]
        public IActionResult GetRecipes(string userId)
        {
            var recipe = _recipeRepo.GetRecipes(userId, includeIngredients: true);
            if (recipe != null) return Ok(_mapper.Map<List<RecipeDto>>(recipe));
            return NotFound();
        }

        [HttpPost]
        public IActionResult AddRecipe(RecipeDto newRecipe)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var recipe = _mapper.Map<Recipe>(newRecipe);
            recipe.UserId = userId;
            var addedRecipe = _recipeRepo.AddRecipe(recipe);
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
    }
}