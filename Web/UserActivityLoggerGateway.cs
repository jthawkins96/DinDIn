using DinDin.Core.Contracts;
using DinDin.Core.Models;
using Newtonsoft.Json;
using System;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace DinDin.Web
{
    public class UserActivityLoggerGateway : IUserActivityLoggerGateway
    {
        private readonly HttpClient _client;

        public UserActivityLoggerGateway()
        {
            _client = new HttpClient()
            {
                BaseAddress = new Uri("http://localhost:7071")
            };
            _client.DefaultRequestHeaders.Accept.Clear();
            _client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        }
        public async Task<bool> PostUserActivity(UserActivity userActivity)
        {
            var content = new StringContent(JsonConvert.SerializeObject(userActivity));
            content.Headers.ContentType = new MediaTypeHeaderValue("application/json");
            HttpResponseMessage response = await _client.PostAsync("/api/UserActivityLogger", content);
            return response.IsSuccessStatusCode;
        }
    }
}
