using Application.Common.Interfaces;
using Domain.Entities;
using MediatR;

namespace Application.Categories.Commands.CreateCategory;

// Command
// All the data we need to execute

//https://github.com/jonathanjameswilliams26/CQRSInDotnetCore/blob/master/CQRSTest/Commands/AddTodo.cs
public record CreateCategoryCommand(string Name) : IRequest<int>;


// All the business logic to execute. Returns a response.
public class CreateCategoryCommandHandler : IRequestHandler<CreateCategoryCommand, int>
{
    private readonly IApplicationDbContext _context;

    public CreateCategoryCommandHandler(IApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<int> Handle(CreateCategoryCommand request, CancellationToken cancellationToken)
    {

        var entity = new Category();

        entity.Name = request.Name;

        _context.Categories.Add(entity);

        await _context.SaveChangesAsync(cancellationToken);

        return entity.Id;

    }

}

