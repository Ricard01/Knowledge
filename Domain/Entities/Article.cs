namespace Domain.Entities;

public class Article : AuditableEntity
{

    public int Id { get; set; }

    public string Title { get; set; }

    public string Message { get; set; }

    public int CategoryId { get; set; }

    public Category Category { get; set; }

    public IList<ArticleTags> ArticleTags { get; private set; } = new List<ArticleTags>();

}

