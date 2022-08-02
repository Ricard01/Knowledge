using Application.Common.Exceptions;
using Application.Common.Interfaces;
using MediatR;

namespace Application.Categories.Commands.UpdateCategory;

public record UpdateCategoryCommand : IRequest
{
    public int Id { get; init; }

    public string Name { get; init; }

}

public class UpdateCategoryCommandHandler : IRequestHandler<UpdateCategoryCommand>
{
    private readonly IApplicationDbContext _context;

    public UpdateCategoryCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }
    public async Task<Unit> Handle(UpdateCategoryCommand request, CancellationToken cancellationToken)
    {
        var entity = await _context.Categories.FindAsync(request.Id);

        if (entity == null)
        {
            throw new NotFoundException(nameof(Categories), request.Id);
        }

        entity.Name = request.Name;

        await _context.SaveChangesAsync(cancellationToken);

        return Unit.Value;
    }
}

