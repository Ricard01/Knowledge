using System;
using System.Collections.Generic;
using Application.Common.Mappings;
using AutoMapper;
using Domain.Entities;

namespace Application.Articles.Dto
{
    public class ArticleDto : IMapFrom<Article>
    {


        public ArticleDto()
        {
            ArticleTags = new List<ArticleTagsDto>();

        }
        public int Id { get; set; }

        public string Title { get; set; }

        public string Message { get; set; }

        // need it for query by category
        public int CategoryId { get; set; }

        public string Category { get; set; }
        public DateTime Created { get; set; }

        public string CreatedBy { get; set; }

        public DateTime? LastModified { get; set; }

        // QN Why the Dto list is handled diferent that the entity list
        public IList<ArticleTagsDto> ArticleTags { get; set; }


        public void Mapping(Profile profile)
        {
            profile.CreateMap<Article, ArticleDto>()
            .ForMember(a => a.Category, opt => opt.MapFrom(c => c.Category.Name));

        }


    }
}