using Application.Common.Exceptions;
using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;

namespace Application.Tags.Commands.DeleteTag;

public record DeleteTagCommand(int Id) : IRequest;


public class DeleteTagCommandHandler : IRequestHandler<DeleteTagCommand>
{
    private readonly IApplicationDbContext _context;

    public DeleteTagCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }
    public async Task<Unit> Handle(DeleteTagCommand request, CancellationToken cancellationToken)
    {
        var entity = await _context.Tags.FindAsync(request.Id);

        if (entity == null)
        {
            throw new NotFoundException(nameof(Tag), request.Id);

        }

        _context.Tags.Remove(entity);

        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;

    }
}
