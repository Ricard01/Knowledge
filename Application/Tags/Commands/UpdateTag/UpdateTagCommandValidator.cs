using Application.Common.Interfaces;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Application.Tags.Commands.UpdateTag;


public class UpdateTagCommandValidator : AbstractValidator<UpdateTagCommand>
{
    private readonly IApplicationDbContext _context;

    public UpdateTagCommandValidator(IApplicationDbContext context)
    {
        _context = context;

        RuleFor(c => c.Name)
        .NotEmpty().WithMessage("Name is required")
        .MaximumLength(30).WithMessage("Must not exceed 30 characters.");

        RuleFor(tag => tag).MustAsync(BeUniqueTagForCategory).WithMessage("The Name already exists in the selected category.");

    }

    public async Task<bool> BeUniqueTagForCategory(UpdateTagCommand tag, CancellationToken cancellation)
    {
        bool v = await _context.Tags.AnyAsync(c => (c.Name == tag.Name) && (c.CategoryId == tag.CategoryId));

        return !v;
    }

}

