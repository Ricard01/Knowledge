using FluentValidation;

namespace Application.Articles.Commands.CreateArticle;

// NOTE 2 Execution Order
public class CreateArticleCommandValidator : AbstractValidator<CreateArticleCommand>
{

    public CreateArticleCommandValidator()
    {

        RuleFor(a => a.Title).Title();
        RuleFor(a => a.Message).Message();
        RuleFor(a => a.CategoryId).CategoryId();

    }

}

