using Application.Common.Mappings;
using AutoMapper;
using Domain.Entities;

namespace Application.Articles.Dto
{
    public class ArticleTagsDto : IMapFrom<ArticleTags>
    {


        public int Id { get; set; }

        public string Name { get; set; }

        public void Mapping(Profile profile)
        {
            profile.CreateMap<ArticleTags, ArticleTagsDto>()
          .ForMember(a => a.Id, opt => opt.MapFrom(t => t.Tag.Id))
           .ForMember(a => a.Name, opt => opt.MapFrom(t => t.Tag.Name));

        }

    }
}