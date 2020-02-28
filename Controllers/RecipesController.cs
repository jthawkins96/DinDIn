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

        [HttpPost]
        public IActionResult AddRecipe(RecipeDto newRecipe)
        {
            var userId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            var recipe = _mapper.Map<Recipe>(newRecipe);
            recipe.UserId = userId;
            var addedRecipe = _recipeRepo.AddRecipe(recipe);
            return Ok();
        }
    }
}