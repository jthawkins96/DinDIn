using DinDin.Core.Contracts;
using DinDin.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DinDin.DAL.Repositories
{
    public class GroupRepository : IGroupRepository
    {
        private readonly DinDinContext _dbContext;

        public GroupRepository(DinDinContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<Group> Add(Group newGroup)
        {
            await _dbContext.AddAsync(newGroup);
            await _dbContext.SaveChangesAsync();

            return newGroup;
        }

        public async Task<Group> Find(int groupId)
        {
            return await _dbContext.Groups.FindAsync(groupId);
        }
    }
}
