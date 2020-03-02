using DinDin.Core.Contracts;
using DinDin.Core.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DinDin.DAL.Repositories
{
    public class RecipeRepository : IRecipeRepository
    {
        private readonly DinDinContext _dbContext;

        public RecipeRepository(DinDinContext dbContext)
        {
            _dbContext = dbContext;
        }

        public Recipe AddRecipe(Recipe newRecipe)
        {
            newRecipe.CreatedDate = DateTime.Now;
            _dbContext.Recipes.Add(newRecipe);
            _dbContext.SaveChanges();
            return newRecipe;
        }

        public Recipe GetRecipe(int recipeId, bool includeIngredients = false)
        {
            if (includeIngredients)
                return _dbContext.Recipes
                    .Include(r => r.Ingredients)
                    .FirstOrDefault(r => r.Id == recipeId);

            return _dbContext.Recipes.Find(recipeId);
        }

        public ICollection<Recipe> GetRecipes(string userId, bool includeIngredients = false)
        {
            if (includeIngredients)
                return _dbContext.Users
                    .Include(u => u.Recipes)
                    .ThenInclude(r => r.Ingredients)
                    .FirstOrDefault(u => u.Id == userId).Recipes;

            return _dbContext.Users.Include(u => u.Recipes).FirstOrDefault(u => u.Id == userId).Recipes;
        }

        public void Update(Recipe recipeToUpdate)
        {
            recipeToUpdate.LastUpdatedDate = DateTime.Now;
            _dbContext.SaveChanges();
        }
    }
}
