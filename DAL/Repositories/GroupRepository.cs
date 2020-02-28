using DinDin.Core.Contracts;
using DinDin.Core.Models;
using Microsoft.EntityFrameworkCore;
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

        public void Delete(int groupId)
        {
            var group = _dbContext.Groups.Find(groupId);
            _dbContext.Groups.Remove(group);
            _dbContext.SaveChanges();
        }

        public Group Find(int groupId)
        {
            return _dbContext.Groups
                .Include(g => g.UserGroups)
                .ThenInclude(ug => ug.User)
                .Single(g => g.Id == groupId);
        }

        public bool UserIsOwner(int groupId, string userId)
        {
            var userGroups = _dbContext.UserGroup.Where(ug => ug.UserId == userId && ug.GroupId == groupId && ug.RoleId == 1);
            return userGroups.ToList().Count > 0;
        }

        public bool UpdateGroup(Group groupToUpdate)
        {
            var group = _dbContext.Groups.Find(groupToUpdate.Id);
            if (group != null)
            {
                group.Name = groupToUpdate.Name;
                _dbContext.SaveChanges();
                return true;
            }

            return false;
        }

        public UserGroup AddUser(UserGroup newUser)
        {
            _dbContext.UserGroup.Add(newUser);
            _dbContext.SaveChanges();
            return newUser;
        }

        public bool DeleteUserFromGroup(int groupId, string userId)
        {
            var userGroup = _dbContext.UserGroup.FirstOrDefault(ug => ug.GroupId == groupId && ug.UserId == userId);
            if (userGroup != null)
            {
                _dbContext.Remove(userGroup);
                _dbContext.SaveChanges();
                return true;
            }

            return false;
        }
    }
}
