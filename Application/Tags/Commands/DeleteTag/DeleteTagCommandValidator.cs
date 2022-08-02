using FluentValidation;
using Application.Common.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Application.Tags.Commands.DeleteTag;


public class DeleteTagCommandValidator : AbstractValidator<DeleteTagCommand>
{

    private IApplicationDbContext _context;

    public DeleteTagCommandValidator(IApplicationDbContext context)
    {
        _context = context;

        RuleFor(c => c)
        .MustAsync(CheckFK).WithMessage("Cant Delete is being used in Articles");
    }

    public async Task<bool> CheckFK(DeleteTagCommand tag, CancellationToken cancellation)
    {
        return await _context.ArticleTags.AllAsync(t => t.TagId != tag.Id);
       
    }


}

