using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace DinDin.Core.Models
{
    public class Ingredient
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Amount { get; set; }
        [Required]
        public int RecipeId { get; set; }
        public Recipe Recipe { get; set; }
    }
}
