using Application.Common.Interfaces;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Application.Categories.Commands.CreateCategory;

public class CreateCategoryCommandValidator : AbstractValidator<CreateCategoryCommand>
{

    private IApplicationDbContext _context;

    public CreateCategoryCommandValidator(IApplicationDbContext context)
    {
        _context = context;

        RuleFor(c => c.Name)
        .NotEmpty().WithMessage("Name is requeried")
        .MaximumLength(60).WithMessage("Must not exceed 200 characters.")
        .MustAsync(BeUniqueName).WithMessage("The specified title already exists.");

    }

    public async Task<bool> BeUniqueName(string name, CancellationToken cancellation)
    {
        bool v = await _context.Categories.AllAsync(c => c.Name != name);
        return v;
    }

}

