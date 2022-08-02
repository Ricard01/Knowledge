using Application.Common.Exceptions;
using Application.Common.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Application.Articles.Commands.DeleteArticle;

public record DeleteArticleCommand(int Id) : IRequest;

public class DeleteArticleCommandHandler : IRequestHandler<DeleteArticleCommand>
{
    private readonly IApplicationDbContext _context;

    public DeleteArticleCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<Unit> Handle(DeleteArticleCommand request, CancellationToken cancellationToken)
    {
        var entity = await _context.Articles
                    .Where(a => a.Id == request.Id)
                    .SingleOrDefaultAsync(cancellationToken);

        if (entity == null)
        {
            throw new NotFoundException(nameof(Articles), request.Id);
        }

        _context.Articles.Remove(entity);

        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;

    }
}

