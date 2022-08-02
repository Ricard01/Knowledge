using Application.Common.Interfaces;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Application.Categories.Commands.DeleteCategory;

public class DeleteCategoryCommandValidator : AbstractValidator<DeleteCategoryCommand>
{

    private IApplicationDbContext _context;

    public DeleteCategoryCommandValidator(IApplicationDbContext context)
    {
        _context = context;

        RuleFor(c => c)
        .MustAsync(CheckFK).WithMessage("Cant Delete it has Tags asociated");
    }

    public async Task<bool> CheckFK(DeleteCategoryCommand category, CancellationToken cancellation)
    {
        return await _context.Tags.AllAsync(t => t.CategoryId != category.Id);
        
    }


}

