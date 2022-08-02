namespace Domain.Entities;

public class Tag
{

    public int Id { get; set; }

    public string Name { get; set; }

    public int CategoryId { get; set; }

    public Category Category { get; set; }

    public IList<ArticleTags> ArticleTags { get; private set; } = new List<ArticleTags>();

}

