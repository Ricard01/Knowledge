using FluentValidation;

namespace Application.Articles.Querys.GetArticlesSearchWithPagination;

public class GetArticlesSearchWithPaginationValidator : AbstractValidator<GetArticlesSearchWithPaginationQuery>
{

    public GetArticlesSearchWithPaginationValidator()
    {

        RuleFor(art => art.Title).Title();
        RuleFor(art => art.PageNumber).PageNumber();
        RuleFor(art => art.PageSize).PageSize();

    }

}

