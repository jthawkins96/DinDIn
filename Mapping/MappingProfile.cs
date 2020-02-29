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

            CreateMap<GroupDto, Group>()
                .ForMember(dest => dest.UserGroups, src => src.MapFrom(g => g.Members));

            CreateMap<Group, GroupDto>()
                .ForMember(dest => dest.Members, src => src.MapFrom(g => g.UserGroups));

            CreateMap<UserGroupDto, UserGroup>();

            CreateMap<UserGroup, UserGroupDto>()
                .ForMember(dest => dest.Username, src => src.MapFrom(g => g.User.UserName));

            CreateMap<UserGroup, GroupRoleDto>()
                .ForMember(dest => dest.Name, src => src.MapFrom(g => g.Group.Name));

            CreateMap<Recipe, RecipeDto>().ReverseMap();

            CreateMap<Ingredient, IngredientDto>().ReverseMap();

            CreateMap<UpdateRecipeDto, Recipe>()
                .ForMember(dest => dest.Id, src => src.Ignore())
                .ForMember(dest => dest.Ingredients, src => src.Ignore())
                .AfterMap((ur, r) =>
                {
                    var removedIngredients = r.Ingredients
                                                .Where(ingredient => !ur.Ingredients.Select(i => i.Id).Contains(ingredient.Id)).ToList();

                    var addedIngredients = ur.Ingredients
                                            .Where(ingredient => !r.Ingredients.Select(i => i.Id).Contains(ingredient.Id))
                                            .Select(ingDto => new Ingredient { Name = ingDto.Name, Amount = ingDto.Amount }).ToList();

                    var currentIngredients = r.Ingredients.Where(ingredient => ur.Ingredients.Select(i => i.Id).Contains(ingredient.Id));

                    foreach(var i in currentIngredients)
                    {
                        var updatedIngredient = ur.Ingredients.Single(ingredient => ingredient.Id == i.Id);
                        i.Name = updatedIngredient.Name;
                        i.Amount = updatedIngredient.Amount;
                    }

                    foreach(var i in removedIngredients)
                        r.Ingredients.Remove(i);

                    foreach (var i in addedIngredients)
                        r.Ingredients.Add(i);
                    
                });
        }
    }
}
