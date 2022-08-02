using Application.Common.Exceptions;
using Application.Common.Interfaces;
using MediatR;

namespace Application.Tags.Commands.UpdateTag;

public record UpdateTagCommand : IRequest
{

    public int Id { get; init; }

    public string Name { get; init; }

    public int CategoryId { get; set; }


}


public class UpdateTagCommandHandler : IRequestHandler<UpdateTagCommand>
{
    private readonly IApplicationDbContext _context;

    public UpdateTagCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }
    public async Task<Unit> Handle(UpdateTagCommand request, CancellationToken cancellationToken)
    {
        var entity = await _context.Tags.FindAsync(request.Id);

        if (entity == null)
        {
            throw new NotFoundException(nameof(Tags), request.Id);
        }

        entity.Name = request.Name;

        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}

