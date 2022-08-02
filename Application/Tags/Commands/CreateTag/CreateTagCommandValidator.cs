using Application.Common.Interfaces;
using FluentValidation;
using Microsoft.EntityFrameworkCore;

namespace Application.Tags.Commands.CreateTag;

public class CreateTagCommandValidator : AbstractValidator<CreateTagCommand>
{

    private IApplicationDbContext _context;

    public CreateTagCommandValidator(IApplicationDbContext context)
    {
        _context = context;

        RuleFor(c => c.Name)
        .NotEmpty().WithMessage("Name is required.")
        .MaximumLength(30).WithMessage("Must not exceed 30 characters.");

        RuleFor(tag => tag).MustAsync(BeUniqueTagForCategory).WithMessage("The Name already exists in the selected category.");
    }

    public async Task<bool> BeUniqueTagForCategory(CreateTagCommand tag, CancellationToken cancellation)
    {
        bool v = await _context.Tags.AnyAsync(c => (c.Name == tag.Name) && (c.CategoryId == tag.CategoryId));

        return !v;
    }


}































