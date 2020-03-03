using DinDin.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DinDin.Core.Contracts
{
    public interface IVotingRepository
    {
        bool SetRecipesForVoting(int groupId, ICollection<Recipe> recipesToSet);
    }
}
