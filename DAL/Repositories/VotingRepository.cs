using DinDin.Core.Contracts;
using DinDin.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DinDin.DAL.Repositories
{
    public class VotingRepository : IVotingRepository
    {
        private readonly DinDinContext _dbContext;

        public VotingRepository(DinDinContext dbContext)
        {
            _dbContext = dbContext;
        }

        public bool SetRecipesForVoting(int groupId, ICollection<Recipe> recipesToSet)
        {
            var newVotingSet = new VotingSet() 
            {
                GroupId = groupId,
                VotingSetItems = recipesToSet.Select(r => new VotingSetItem { RecipeId = r.Id, NumberOfVotes = 0 }).ToList()
            };

            _dbContext.VotingSets.Add(newVotingSet);
            _dbContext.SaveChanges();
            return true;
        }
    }
}
