namespace Application.Tags.Queries.GetTagsByCategory;

public class TagsCategoryVm
{
    public IList<TagCategoryDto> Tags { get; set; } = new List<TagCategoryDto>();
}
