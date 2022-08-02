using Application.Common.Mappings;
using AutoMapper;
using Domain.Entities;

namespace Application.Tags.Queries.GetTags;

public class TagDto : IMapFrom<Tag>
{
    
    public int Id { get; set; }

    public string Name { get; set; }

    public string Category { get; set; }

    public int CategoryId { get; set; } // Help me validates that there is no same name on category

    public void Mapping(Profile profile)
    {
        profile.CreateMap<Tag, TagDto>()
        .ForMember(c => c.Category, opt => opt.MapFrom(c => c.Category.Name))
        .ForMember(c => c.CategoryId, opt => opt.MapFrom(c => c.Category.Id));

    }


}