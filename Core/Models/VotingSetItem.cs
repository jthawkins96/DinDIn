using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DinDin.Core.Models
{
    public class VotingSetItem
    {
        public int Id { get; set; }
        public int VotingSetId { get; set; }
        public VotingSet VotingSet { get; set; }
        public int NumberOfVotes { get; set; }
        public int RecipeId { get; set; }
        public Recipe Recipe { get; set; }
    }
}
