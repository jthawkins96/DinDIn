using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DinDin.DTO
{
    public class UpdateRecipeDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public ICollection<IngredientDto> Ingredients { get; set; }
    }
}
