using DinDin.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DinDin.Core.Contracts
{
    public interface IRecipeRepository
    {
        Recipe AddRecipe(Recipe newRecipe);
        Recipe GetRecipe(int recipeId, bool includeIngredients = false);
        void Update(Recipe recipeToUpdate);
    }
}
