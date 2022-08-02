using FluentValidation;

namespace Application.Articles.Querys.GetArticlesCategoryWithPagination;

public class GetArticlesCategoryWithPaginationValidator : AbstractValidator<GetArticlesCategoryWithPaginationQuery>
{
    public GetArticlesCategoryWithPaginationValidator()
    {
        RuleFor(art => art.PageNumber).PageNumber();
        RuleFor(art => art.PageSize).PageSize();

    }
}

