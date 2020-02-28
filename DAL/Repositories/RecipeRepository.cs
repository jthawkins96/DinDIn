using DinDin.Core.Contracts;
using DinDin.Core.Models;
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
            _dbContext.Recipes.Add(newRecipe);
            _dbContext.SaveChanges();
            return newRecipe;
        }
    }
}
