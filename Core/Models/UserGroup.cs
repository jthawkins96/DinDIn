using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DinDin.Core.Models
{
    public class UserGroup
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public User User { get; set; }
        public int GroupId { get; set; }
        public Group Group { get; set; }
        public int RoleId { get; set; }
        public GroupRole Role { get; set; }
    }
}
