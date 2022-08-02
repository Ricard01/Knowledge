using Application.Common.Mappings;
using Domain.Entities;

namespace Application.Articles.Dto
{

    public class ArticleTitleDto : IMapFrom<Article>
    {

        public string Title { get; set; }

        public int CategoryId { get; set; }

    }


}

