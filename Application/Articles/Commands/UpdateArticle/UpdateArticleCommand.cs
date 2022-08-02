using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Articles.Commands.UpdateArticle;

public record UpdateArticleCommand : IRequest
{

    public UpdateArticleCommand()
    {
        ArticleTags = new List<ArticleTagData>();
    }

    public int Id { get; init; }

    public string Title { get; init; }

    public string Message { get; init; }

    public int CategoryId { get; init; }

    public List<ArticleTagData> ArticleTags { get; init; }

    public record ArticleTagData
    {
        public int Id { get; init; }

    }

}

public class UpdateArticleCommandHandler : IRequestHandler<UpdateArticleCommand>
{
    private readonly IApplicationDbContext _context;

    public UpdateArticleCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(UpdateArticleCommand request, CancellationToken cancellationToken)
    {
        var entity = await _context.Articles.Include(a => a.ArticleTags).FirstOrDefaultAsync(a => a.Id == request.Id);

        if (entity == null)
        {
            throw new NotFoundException(nameof(Articles), request.Id);
        }

        entity.Title = request.Title;

        entity.Message = request.Message;

        entity.CategoryId = request.CategoryId;

        // ct currentTags            
        var tagsToAdd = request.ArticleTags.Where(t => entity.ArticleTags.All(ct => ct.TagId != t.Id)).ToList();
        var tagsToDelete = entity.ArticleTags.Where(ct => request.ArticleTags.All(t => t.Id != ct.TagId)).ToList();

        foreach (var tag in tagsToAdd)
        {
            var articleTag = new ArticleTags();
            articleTag.TagId = tag.Id;
            entity.ArticleTags.Add(articleTag);
        }

        foreach (var tag in tagsToDelete)
        {

            entity.ArticleTags.Remove(tag);
        }

        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }

}

