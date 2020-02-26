using AutoMapper;
using DinDin.Core.Models;
using DinDin.DTO;

namespace DinDin.Mapping
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, RegisterUserDto>().ReverseMap();
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<RegisterUserDto, UserDto>().ReverseMap();
        }
    }
}
