using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DinDin.Hubs
{
    public class VotingHub : Hub
    {
        public async Task VoteOnMeal(int mealId)
        {
            await Clients.All.SendAsync("mealvote", mealId);
        }
    }
}
