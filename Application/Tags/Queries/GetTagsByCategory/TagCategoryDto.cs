using Application.Common.Mappings;
using Domain.Entities;

namespace Application.Tags.Queries.GetTagsByCategory;


public class TagCategoryDto : IMapFrom<Tag>
{

    public int Id { get; set; }

    public string Name { get; set; }


}

