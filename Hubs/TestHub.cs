using Microsoft.AspNetCore.SignalR;
using System.Threading.Tasks;

namespace DinDin.Hubs
{
    public class TestHub : Hub
    {
        public async Task BroadcastTestData(string data)
        {
            await Clients.All.SendAsync("testevent", data);
        }
    }
}
