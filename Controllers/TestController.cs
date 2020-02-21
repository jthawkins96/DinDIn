using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DinDin.Hubs;
using DinDin.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SignalR;

namespace DinDin.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TestController : ControllerBase
    {
        private IHubContext<TestHub> _hub;

        public TestController(IHubContext<TestHub> hub)
        {
            _hub = hub;
        }

        public IActionResult Get()
        {
            var timerManager = new TimerManager(() => _hub.Clients.All.SendAsync("testevent", DataManager.GetData()));

            return Ok(new { Message = "Request Completed" });
        }
    }
}