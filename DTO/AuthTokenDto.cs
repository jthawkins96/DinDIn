using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DinDin.DTO
{
    public class AuthTokenDto
    {
        public string Token { get; set; }
        public UserDto User { get; set; }
    }
}
