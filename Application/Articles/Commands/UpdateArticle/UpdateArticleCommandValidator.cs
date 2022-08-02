using FluentValidation;

namespace Application.Articles.Commands.UpdateArticle;

public class UpdateArticleCommandValidator : AbstractValidator<UpdateArticleCommand>
{

    public UpdateArticleCommandValidator()
    {

        RuleFor(a => a.Title).Title();
        RuleFor(a => a.Message).Message();
        RuleFor(a => a.CategoryId).CategoryId();

    }

}

