using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DinDin.Core.Models
{
    public class VotingSet
    {
        public int Id { get; set; }
        public int GroupId { get; set; }
        public Group Group { get; set; }
        public ICollection<VotingSetItem> VotingSetItems { get; set; }

        public VotingSet()
        {
            VotingSetItems = new List<VotingSetItem>();
        }
    }
}
