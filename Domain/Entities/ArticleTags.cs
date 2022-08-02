namespace Domain.Entities;

// https://docs.microsoft.com/en-us/ef/core/modeling/relationships?tabs=fluent-api%2Cfluent-api-simple-key%2Csimple-key#other-relationship-patterns
public class ArticleTags
{

    public int ArticleId { get; set; }

    public Article Article { get; }

    public int TagId { get; set; }

    public Tag Tag { get; private set; }
}
