using Application.Common.Interfaces;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Application.Categories.Commands.UpdateCategory;

public class UpdateCategoryCommandValidator : AbstractValidator<UpdateCategoryCommand>
{
    private readonly IApplicationDbContext _context;

    public UpdateCategoryCommandValidator(IApplicationDbContext context)
    {
        _context = context;

        RuleFor(c => c.Name)
        .NotEmpty().WithMessage("Name is required")
        .MaximumLength(60).WithMessage("Name must not exceed 60 characteres.")
        .MustAsync(BeUniqueName).WithMessage("The specifed Name already exists");

    }

    public async Task<bool> BeUniqueName(UpdateCategoryCommand model, string Name, CancellationToken cancellationToken)
    {
        return await _context.Categories.Where(c => c.Id != model.Id).AllAsync(c => c.Name != Name);
    }

}

