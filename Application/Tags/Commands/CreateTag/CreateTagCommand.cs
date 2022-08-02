using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;

namespace Application.Tags.Commands.CreateTag;


public record CreateTagCommand(string Name, int CategoryId) : IRequest<int>;


public class CreateTagCommandHandler : IRequestHandler<CreateTagCommand, int>
{
    private readonly IApplicationDbContext _context;

    public CreateTagCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<int> Handle(CreateTagCommand request, CancellationToken cancellationToken)
    {

        var entity = new Tag
        {
            Name = request.Name,
            CategoryId = request.CategoryId
        };


        _context.Tags.Add(entity);

        await _context.SaveChangesAsync(cancellationToken);

        return entity.Id;

    }

}

