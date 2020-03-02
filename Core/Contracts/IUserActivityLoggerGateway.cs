using DinDin.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DinDin.Core.Contracts
{
    public interface IUserActivityLoggerGateway
    {
        Task<bool> PostUserActivity(UserActivity userActivity);
    }
}
