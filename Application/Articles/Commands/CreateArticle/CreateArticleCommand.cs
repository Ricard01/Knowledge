using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;

namespace Application.Articles.Commands.CreateArticle;

// NOTE 1 Execution Order
// CreateArticleCommand .- inherits from MediatR.IRequest and it’s response will be an Article (Map request to Article)
// Personal note: if something when wrong here stops (List null for example)
public record CreateArticleCommand : IRequest<int>
{
    // The init accessor makes immutable objects more flexible by allowing the caller to mutate the members during the act of construction.
    // https://docs.microsoft.com/en-us/dotnet/csharp/language-reference/proposals/csharp-9.0/init

    public CreateArticleCommand()
    {
        ArticleTags = new List<ArticleTagData>();
    }
    public string Title { get; init; }

    public string Message { get; init; }

    public int CategoryId { get; init; }

    // https://github.com/jbogard/ContosoUniversityDotNetCore-Pages/blob/master/ContosoUniversity/Pages/Instructors/CreateEdit.cshtml.cs
    public List<ArticleTagData> ArticleTags { get; init; }

    public record ArticleTagData
    {
        public int Id { get; init; }
    }

}

public class CreateArticleCommandHandler : IRequestHandler<CreateArticleCommand, int>
{
    private readonly IApplicationDbContext _context;

    public CreateArticleCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    // NOTE 9 Execution Order
    public async Task<int> Handle(CreateArticleCommand request, CancellationToken cancellationToken)
    {
        var entity = new Article()
        {
            Title = request.Title,
            Message = request.Message,
            CategoryId = request.CategoryId

        };

        foreach (var item in request.ArticleTags)
        {
            var articleTag = new ArticleTags();
            {
                articleTag.TagId = item.Id;
            }
            entity.ArticleTags.Add(articleTag);

        }

        _context.Articles.Add(entity);

        await _context.SaveChangesAsync(cancellationToken);

        // NOTE 11 Execution Order 
        return entity.Id;

    }

}

