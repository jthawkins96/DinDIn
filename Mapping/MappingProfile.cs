using AutoMapper;
using DinDin.Core.Models;
using DinDin.DTO;
using Microsoft.AspNetCore.Identity;
using System.Collections.Generic;
using System.Linq;

namespace DinDin.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, RegisterUserDto>().ReverseMap();
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<RegisterUserDto, UserDto>().ReverseMap();
            CreateMap<GroupDto, Group>().ForMember(dest => dest.UserGroups, src => src.MapFrom(g => g.Members));
            CreateMap<Group, GroupDto>().ForMember(dest => dest.Members, src => src.MapFrom(g => g.UserGroups));
            CreateMap<UserGroupDto, UserGroup>().ReverseMap();
            CreateMap<UserGroup, GroupRoleDto>().ForMember(dest => dest.Name, src => src.MapFrom(g => g.Group.Name));
        }
    }
}
